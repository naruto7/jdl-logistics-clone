#!/usr/bin/env node
/**
 * 离线扫描参考站 DOM：导出每个区段的子元素结构（标签 + class + 文本），
 * 用于确定复刻选择器与层级，不联网。
 *
 * 用法：node tools/spec/scan-dom.mjs [section]
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '../..');
const html = readFileSync(resolve(ROOT, 'recon/dom/home.html'), 'utf8');

const SECTIONS = {
  header: 'header-common',
  banner: 'banner-container',
  search: 'search-wrap',
  service: 'logistics-service',
  industry: 'industry-solutions',
  network: 'logistics-network',
  news: 'news-updates',
  contact: 'contact-footer',
  footer: 'footer-common',
};

const only = process.argv[2];

/** 粗略扫描：从区段起点开始，截取一段 HTML，提取 class 序列（保序去重） */
for (const [key, cls] of Object.entries(SECTIONS)) {
  if (only && only !== key) continue;
  const idx = html.indexOf(cls);
  if (idx < 0) {
    console.log(`\n== ${key} == 未找到 ${cls}`);
    continue;
  }
  const segment = html.slice(idx, idx + 40000);
  const classes = [];
  for (const match of segment.matchAll(/class="([^"]{2,120})"/g)) {
    for (const raw of match[1].split(/\s+/)) {
      if (raw && raw.length > 1 && !classes.includes(raw) && classes.length < 60) classes.push(raw);
    }
  }
  console.log(`\n== ${key} (${cls}) ==`);
  console.log(classes.join(' | '));
}
