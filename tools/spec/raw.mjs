#!/usr/bin/env node
/**
 * 原始侦察数据查看器：打印 raw-measure.json 顶层某键的紧凑内容。
 * 用法：node tools/spec/raw.mjs utility|header|nav|sections|buttonStyles|cardStyles|container|logo
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '../..');
const data = JSON.parse(readFileSync(resolve(ROOT, 'recon/logs/raw-measure.json'), 'utf8'));
const key = process.argv[2];
if (!key || !(key in data)) {
  console.log(`可用键：${Object.keys(data).join(', ')}`);
  process.exit(key ? 1 : 0);
}

const item = data[key];
const print = (el, depth = 0) => {
  const pad = '  '.repeat(depth);
  if (el == null || typeof el !== 'object') return console.log(pad + String(el));
  if (Array.isArray(el)) return el.forEach((v) => print(v, depth));
  const rect = el.rect ? `rect=(${Math.round(el.rect.x)},${Math.round(el.rect.y)},${Math.round(el.rect.w)},${Math.round(el.rect.h)})` : '';
  const css = el.css ?? el;
  const style = [
    css.fontSize ?? css.fs ? `fs=${css.fontSize ?? css.fs}` : '',
    css.fontWeight ?? css.fw ? `fw=${css.fontWeight ?? css.fw}` : '',
    css.color ?? css.colorHex ? `c=${css.color ?? css.colorHex}` : '',
    css.backgroundColor && css.backgroundColor !== 'rgba(0, 0, 0, 0)' ? `bg=${css.backgroundColor}` : '',
    css.borderRadius && css.borderRadius !== '0px' ? `br=${css.borderRadius}` : '',
    css.boxShadow && css.boxShadow !== 'none' ? `sh=${String(css.boxShadow).slice(0, 40)}` : '',
    css.padding && css.padding !== '0px' ? `pad=${css.padding}` : '',
    css.gap && css.gap !== 'normal' && css.gap ? `gap=${css.gap}` : '',
    css.fontFamily ? `ff=${String(css.fontFamily).split(',')[0]}` : '',
  ].filter(Boolean).join(' ');
  const known = new Set(['rect', 'css', 'rect.x', 'rect.y', 'rect.w', 'rect.h']);
  const extraKeys = Object.keys(el).filter((k) => !known.has(k) && k !== 'css');
  const header = `${pad}${el.tag ?? el.key ?? ''} ${el.cls ? '.' + String(el.cls).split(' ')[0] : ''} ${rect} ${style} ${el.text ? '「' + String(el.text).replace(/\s+/g, ' ').slice(0, 60) + '」' : ''}`;
  console.log(header.trim());
  for (const k of extraKeys) {
    if (k === 'text' || k === 'tag' || k === 'cls' || k === 'key' || k === 'sel') continue;
    const v = el[k];
    if (typeof v === 'object' && v !== null) print(v, depth + 1);
  }
};

print(item);
