#!/usr/bin/env node
/**
 * 源码发布器：把 git 已跟踪的文件（即整个工程源码，自动排除 node_modules/dist/recon）
 * 作为一次提交发布到 main 分支，便于仓库可审阅、可追溯。
 *
 * 为什么要它：本机 github.com:443 被阻断，`git push` 不可用；本地仍用 git 做版本管理，
 * 发布时读取 `git ls-files` 的文件清单，走 GitHub Git Data API 提交。
 *
 * 用法：
 *   GH_TOKEN=$(gh auth token) node tools/publish-source.mjs owner=naruto7 repo=jdl-logistics-clone
 */
import { execFileSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { createClient, pushFilesAsCommit } from './lib/gh-core.mjs';

const args = Object.fromEntries(
  process.argv.slice(2).map((s) => {
    const i = s.indexOf('=');
    return i > 0 ? [s.slice(0, i), s.slice(i + 1)] : [s, true];
  }),
);
const { owner, repo } = args;
const branch = args.branch || 'main';
if (!owner || !repo) {
  console.error('[publish] 需要 owner= 与 repo=');
  process.exit(1);
}

const tracked = execFileSync('git', ['ls-files', '-z'], { encoding: 'buffer' })
  .toString('utf8')
  .split('\0')
  .filter(Boolean);

const files = await Promise.all(
  tracked.map(async (path) => ({ path, content: await readFile(path) })),
);

const client = createClient(process.env.GH_TOKEN || process.env.GITHUB_TOKEN);
const message = args.message || `chore(source): 同步源码 ${new Date().toISOString()}`;
const sha = await pushFilesAsCommit(client, {
  owner,
  repo,
  branch,
  files,
  message,
  log: (m) => console.log(m),
});
console.log(`[publish] ✅ main 更新完成 commit ${sha.slice(0, 8)}（${files.length} 个文件）`);
