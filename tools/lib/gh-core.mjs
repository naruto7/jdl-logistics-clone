/**
 * GitHub REST 能力封装（走 api.github.com，不依赖 git 传输协议）。
 *
 * 存在理由：本机网络 `github.com:443` 不可达，`git push` 不可用；但
 * `api.github.com` 可达，因此用 Git Data API 完成「写文件 → 建提交 → 移动分支」
 * 的等价操作，供站点发布与源码发布两个脚本复用。
 */

const API = 'https://api.github.com';

export function createClient(token) {
  if (!token) throw new Error('缺少 GitHub Token（GH_TOKEN / GITHUB_TOKEN）');

  async function request(method, path, body, { allow404 = false, retries = 3 } = {}) {
    const url = path.startsWith('http') ? path : `${API}${path}`;
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    for (let attempt = 1; ; attempt++) {
      try {
        const res = await fetch(url, {
          method,
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
            'User-Agent': 'jdl-clone-publisher',
            ...(body ? { 'Content-Type': 'application/json' } : {}),
          },
          body: body ? JSON.stringify(body) : undefined,
        });
        const text = await res.text();
        let json = null;
        try {
          json = text ? JSON.parse(text) : null;
        } catch {
          /* 非 JSON 响应 */
        }
        if (res.ok) return json;
        if (res.status === 404 && allow404) return null;
        if ((res.status >= 500 || res.status === 429) && attempt < retries) {
          await sleep(900 * attempt);
          continue;
        }
        throw new Error(`${method} ${path} -> HTTP ${res.status}: ${json ? JSON.stringify(json) : text.slice(0, 400)}`);
      } catch (err) {
        if (String(err.message).includes('HTTP ')) throw err;
        if (attempt < retries) {
          await sleep(900 * attempt);
          continue;
        }
        throw err;
      }
    }
  }

  return { request };
}

/** 并发受限的 map */
export async function mapLimit(items, limit, fn) {
  const results = new Array(items.length);
  let cursor = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    for (;;) {
      const index = cursor++;
      if (index >= items.length) return;
      results[index] = await fn(items[index], index);
    }
  });
  await Promise.all(workers);
  return results;
}

/**
 * 把一组文件整体作为一次提交推到指定分支（整树替换，不含 base_tree，
 * 因此分支上多余的历史文件不会残留）。
 *
 * @param {object} client createClient 返回值
 * @param {{owner:string, repo:string, branch:string, files:Array<{path:string, content:Buffer}>, message:string, log?:Function}} opts
 */
export async function pushFilesAsCommit(client, { owner, repo, branch, files, message, log = () => {} }) {
  const full = `${owner}/${repo}`;
  const { request } = client;

  log(`[push] ${full}#${branch}：${files.length} 个文件`);

  const treeEntries = await mapLimit(files, 8, async (file) => {
    const blob = await request('POST', `/repos/${full}/git/blobs`, {
      content: file.content.toString('base64'),
      encoding: 'base64',
    });
    return { path: file.path, mode: '100644', type: 'blob', sha: blob.sha };
  });

  const tree = await request('POST', `/repos/${full}/git/trees`, { tree: treeEntries });

  const ref = await request('GET', `/repos/${full}/git/ref/heads/${branch}`, null, { allow404: true });
  const parents = ref ? [ref.object.sha] : [];

  const commit = await request('POST', `/repos/${full}/git/commits`, {
    message,
    tree: tree.sha,
    parents,
  });

  if (ref) {
    await request('PATCH', `/repos/${full}/git/refs/heads/${branch}`, { sha: commit.sha, force: true });
  } else {
    await request('POST', `/repos/${full}/git/refs`, { ref: `refs/heads/${branch}`, sha: commit.sha });
  }

  log(`[push] commit ${commit.sha.slice(0, 10)}（${parents.length ? '增量' : '首次'}）`);
  return commit.sha;
}

/** 确保 Pages 指向 branch:/ 并等待构建完成 */
export async function ensurePages(client, { owner, repo, branch, timeoutSec = 180, log = () => {} }) {
  const full = `${owner}/${repo}`;
  const { request } = client;

  let pages = await request('GET', `/repos/${full}/pages`, null, { allow404: true });
  if (!pages) {
    pages = await request('POST', `/repos/${full}/pages`, { source: { branch, path: '/' } });
    log(`[pages] 已启用：${pages.html_url ?? ''}`);
  } else if (pages.source?.branch !== branch) {
    pages = await request('PUT', `/repos/${full}/pages`, { source: { branch, path: '/' } });
    log(`[pages] 发布源切换为 ${branch}`);
  } else {
    log('[pages] 已启用，更新内容');
  }

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const deadline = Date.now() + timeoutSec * 1000;
  let last = '';
  for (;;) {
    const build = await request('GET', `/repos/${full}/pages/builds/latest`, null, { allow404: true });
    if (build) {
      if (build.status !== last) {
        last = build.status;
        log(`[pages] 构建状态：${build.status}`);
      }
      if (build.status === 'built') break;
      if (build.status === 'errored') {
        throw new Error(`Pages 构建失败：${build.error?.message ?? JSON.stringify(build.error)}`);
      }
    }
    if (Date.now() > deadline) {
      log('[pages] 等待构建超时，继续后续验证');
      break;
    }
    await sleep(3000);
  }

  return pages.html_url ?? `https://${owner}.github.io/${repo}/`;
}
