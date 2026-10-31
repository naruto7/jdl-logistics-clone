#!/usr/bin/env node
/**
 * 抓取新闻卡的懒加载封面图：官网新闻卡图片在滚动后才写入 src，
 * 这里驱动真实浏览器滚动后读取，下载到 src/assets/news/ 并登记 manifest。
 *
 * 用法：node tools/spec/news-covers.mjs
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import puppeteer from 'puppeteer-core';

const ROOT = resolve(import.meta.dirname, '../..');
const CHROME = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 1 },
  args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars'],
});

try {
  const page = await browser.newPage();
  await page.goto('https://www.jdl.com/', { waitUntil: 'networkidle2', timeout: 90000 });
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
  });
  await new Promise((r) => setTimeout(r, 2500));

  const covers = await page.evaluate(() =>
    [...document.querySelectorAll('.news-card')].map((card) => {
      const img = card.querySelector('img');
      const title = card.querySelector('.title')?.innerText?.trim() ?? '';
      return { src: img?.src ?? '', title };
    }),
  );

  console.log('[news] 封面列表：');
  covers.forEach((c, i) => console.log(` ${i + 1}. ${c.title.slice(0, 40)} -> ${c.src.slice(0, 100)}`));

  await mkdir(resolve(ROOT, 'src/assets/news'), { recursive: true });
  const manifestPath = resolve(ROOT, 'src/assets/manifest.json');
  const manifest = existsSync(manifestPath) ? JSON.parse(await readFile(manifestPath, 'utf8')) : [];

  for (const [i, cover] of covers.entries()) {
    if (!cover.src.startsWith('http')) continue;
    const ext = (cover.src.match(/\.(jpe?g|png|webp)/i)?.[1] ?? 'jpg').toLowerCase();
    const target = `news/cover-${String(i + 1).padStart(2, '0')}.${ext}`;
    const res = await fetch(cover.src, { headers: { 'User-Agent': 'Mozilla/5.0 Chrome/140' } });
    if (!res.ok) {
      console.log(`[news] 下载失败 ${target}: HTTP ${res.status}`);
      continue;
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    await writeFile(resolve(ROOT, 'src/assets', target), buffer);
    const record = { url: cover.src, target, note: `新闻封面：${cover.title.slice(0, 30)}`, status: 'ok', bytes: buffer.length };
    const existing = manifest.findIndex((m) => m.target === target);
    if (existing >= 0) manifest[existing] = record;
    else manifest.push(record);
    console.log(`[news] 已保存 ${target}（${Math.round(buffer.length / 1024)} KB）`);
  }

  await writeFile(manifestPath, JSON.stringify(manifest, null, 2));
  console.log('[news] manifest 已更新');
} finally {
  await browser.close();
}
