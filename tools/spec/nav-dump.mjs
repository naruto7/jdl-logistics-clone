#!/usr/bin/env node
/**
 * 导航下拉面板结构转储：把 raw-nav.json 里的 boxHtml 还原成「一级/二级/三级」
 * 文本树，便于把 mega menu 的数据结构写准（官网面板里有三级链接）。
 *
 * 用法：node tools/spec/nav-dump.mjs [menuIndex]
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '../..');
const nav = JSON.parse(readFileSync(resolve(ROOT, 'recon/logs/raw-nav.json'), 'utf8'));
const only = process.argv[2] ? Number(process.argv[2]) : null;

for (const [index, entry] of Object.entries(nav)) {
  if (only !== null && Number(index) !== only) continue;
  console.log(`\n========== MENU ${index}: ${entry.label} ==========`);
  const html = String(entry.boxHtml ?? '');
  // 用块级标签换行，再剥离标签，保留文本与层级线索
  const text = html
    .replace(/<\/(p|div|li|a|span|h\d)>/g, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
  text.forEach((line) => console.log(line));
}
