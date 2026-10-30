#!/usr/bin/env node
/**
 * 站点发布器：把构建产物 dist/ 发布到 GitHub Pages（gh-pages 分支根目录）。
 *
 * 用法：
 *   GH_TOKEN=$(gh auth token) node tools/deploy-gh.mjs owner=naruto7 repo=jdl-logistics-clone dir=dist
 * 可选：branch=gh-pages message="deploy: xxx" timeout=180
 */
import { readdir, readFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { createClient, ensurePages, pushFilesAsCommit } from './lib/gh-core.mjs';

const args = Object.fromEntries(
  process.argv.slice(2).map((s) => {
    const i = s.indexOf('=');
    return i > 0 ? [s.slice(0, i), s.slice(i + 1)] : [s, true];
  }),
);
const { owner, repo } = args;
const dir = args.dir || 'dist';
const branch = args.branch || 'gh-pages';
const message = args.message || `deploy: ${new Date().toISOString()}`;
if (!owner || !repo) {
  console.error('[deploy] 需要 owner= 与 repo=');
  process.exit(1);
}

const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN;
const client = createClient(token);
const log = (m) => console.log(m);

async function walk(root, current = root) {
  const out = [];
  for (const entry of await readdir(current, { withFileTypes: true })) {
    const full = join(current, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(root, full)));
    else if (entry.isFile()) out.push(relative(root, full).split(sep).join('/'));
  }
  return out;
}

const paths = (await walk(dir)).filter(
  (p) => !p.split('/').some((seg) => seg === '.git' || seg === 'node_modules'),
);
const files = await Promise.all(
  paths.map(async (path) => ({ path, content: await readFile(join(dir, path)) })),
);

const started = Date.now();
const sha = await pushFilesAsCommit(client, { owner, repo, branch, files, message, log });
const siteUrl = await ensurePages(client, {
  owner,
  repo,
  branch,
  timeoutSec: Number(args.timeout || 180),
  log,
});
log(`[deploy] ✅ ${siteUrl}（commit ${sha.slice(0, 8)}，耗时 ${((Date.now() - started) / 1000).toFixed(1)}s）`);
