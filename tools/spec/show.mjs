#!/usr/bin/env node
/**
 * 预览已测量的参考数据（紧凑打印，避免把几十 KB JSON 塞进终端）。
 *
 * 用法：
 *   node tools/spec/show.mjs header|banner|search|service|industry|network|news|contact|footer
 *   node tools/spec/show.mjs <group> <selector>   # 只看某个选择器
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '../..');
const data = JSON.parse(readFileSync(resolve(ROOT, 'spec/key-rects.json'), 'utf8'));

const [group, selector] = process.argv.slice(2);
const fmt = (el, index) => {
  const s = el.style ?? {};
  const r = el.rect ?? {};
  const bits = [
    `#${index}`,
    `rect=(${r.x},${r.y},${r.w},${r.h})`,
    s.fontSize ? `fs=${s.fontSize}` : '',
    s.fontWeight && s.fontWeight !== '400' ? `fw=${s.fontWeight}` : '',
    s.lineHeight ? `lh=${s.lineHeight}` : '',
    s.color ? `c=${s.color}` : '',
    s.backgroundColor && s.backgroundColor !== 'rgba(0, 0, 0, 0)' ? `bg=${s.backgroundColor}` : '',
    s.borderRadius && s.borderRadius !== '0px' ? `br=${s.borderRadius}` : '',
    s.boxShadow && s.boxShadow !== 'none' ? `sh=${s.boxShadow.slice(0, 40)}` : '',
    s.padding && s.padding !== '0px' ? `pad=${s.padding}` : '',
    s.gap && s.gap !== 'normal' ? `gap=${s.gap}` : '',
    s.fontFamily ? `ff=${String(s.fontFamily).split(',')[0]}` : '',
    s.backgroundImage && s.backgroundImage !== 'none' ? `bgImg=${s.backgroundImage.slice(0, 70)}` : '',
  ].filter(Boolean);
  return `${bits.join(' ')}${el.text ? `  「${el.text}」` : ''}`;
};

if (!group) {
  for (const [name, map] of Object.entries(data)) {
    console.log(`\n## ${name}`);
    for (const [sel, els] of Object.entries(map)) {
      if (!els.length) continue;
      console.log(` ${sel}  (${els.length})`);
      els.slice(0, selector ? 99 : 3).forEach((el, i) => console.log('   ' + fmt(el, i)));
    }
  }
} else if (!data[group]) {
  console.error(`未知分组 ${group}；可选：${Object.keys(data).join(', ')}`);
  process.exit(1);
} else if (selector) {
  const els = data[group][selector];
  if (!els) {
    console.error(`未知选择器 ${selector}；可选：${Object.keys(data[group]).join(', ')}`);
    process.exit(1);
  }
  console.log(`${group} ${selector} (${els.length})`);
  els.forEach((el, i) => console.log(' ' + fmt(el, i)));
} else {
  console.log(`## ${group}`);
  for (const [sel, els] of Object.entries(data[group])) {
    console.log(` ${sel}  (${els.length})`);
    els.forEach((el, i) => console.log('   ' + fmt(el, i)));
  }
}
