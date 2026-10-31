#!/usr/bin/env node
/**
 * 素材下载器：按 spec/asset-plan.json 把官网真实素材抓到 src/assets/。
 *
 * - 并发 6 路下载，失败重试 3 次，已存在文件跳过（可重复执行）
 * - 输出 src/assets/manifest.json：记录「本地路径 → 原始 URL → 用途」，
 *   同时作为 README 中「素材出处清单」的数据来源（版权声明要求）。
 *
 * 用法：node tools/fetch-assets.mjs [--force]
 */
import { mkdir, readFile, writeFile, stat } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { existsSync } from 'node:fs';

const ROOT = resolve(import.meta.dirname, '..');
const PLAN = resolve(ROOT, 'spec/asset-plan.json');
const OUT_DIR = resolve(ROOT, 'src/assets');
const force = process.argv.includes('--force');

const plan = JSON.parse(await readFile(PLAN, 'utf8'));
const manifestPath = resolve(OUT_DIR, 'manifest.json');
const manifest = existsSync(manifestPath) ? JSON.parse(await readFile(manifestPath, 'utf8')) : [];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function download(item) {
  const target = resolve(OUT_DIR, item.target);
  if (!force && existsSync(target)) {
    const info = await stat(target);
    if (info.size > 0) return { ...item, status: 'skip', bytes: info.size };
  }
  await mkdir(dirname(target), { recursive: true });
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(item.url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/140 Safari/537.36' },
        signal: AbortSignal.timeout(45000),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buffer = Buffer.from(await res.arrayBuffer());
      if (buffer.length === 0) throw new Error('空响应');
      await writeFile(target, buffer);
      return { ...item, status: 'ok', bytes: buffer.length };
    } catch (err) {
      if (attempt === 3) return { ...item, status: 'fail', error: String(err.message) };
      await sleep(600 * attempt);
    }
  }
}

const results = [];
let cursor = 0;
await Promise.all(
  Array.from({ length: 6 }, async () => {
    for (;;) {
      const index = cursor++;
      if (index >= plan.length) return;
      results[index] = await download(plan[index]);
    }
  }),
);

const merged = [...manifest.filter((m) => !results.some((r) => r.target === m.target)), ...results.filter((r) => r.status !== 'fail')];
await writeFile(manifestPath, JSON.stringify(merged, null, 2));

const ok = results.filter((r) => r.status === 'ok');
const skip = results.filter((r) => r.status === 'skip');
const fail = results.filter((r) => r.status === 'fail');
const totalBytes = results.reduce((sum, r) => sum + (r.bytes ?? 0), 0);

console.log(`[assets] 新增 ${ok.length} / 跳过 ${skip.length} / 失败 ${fail.length}，合计 ${(totalBytes / 1024 / 1024).toFixed(2)} MB`);
if (fail.length) {
  for (const f of fail) console.log(`[assets] FAIL ${f.target} <- ${f.url} (${f.error})`);
}
