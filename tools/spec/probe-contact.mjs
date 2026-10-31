#!/usr/bin/env node
/**
 * 联系条数字探针：对比官网与本地「950616」文本的实际排版宽度、字号、字体、字间距。
 * 用于解释页脚联系条数字的像素差异来源。
 *
 * 用法：node tools/spec/probe-contact.mjs
 */
import puppeteer from 'puppeteer-core';

const CHROME = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 1 },
  args: ['--no-sandbox', '--hide-scrollbars'],
});

async function inspect(url, rootSelector) {
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 90000 });
  await page.evaluate(async () => {
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise((r) => setTimeout(r, 800));
    if (document.fonts?.ready) await document.fonts.ready;
  });
  const out = await page.evaluate((sel) => {
    const root = document.querySelector(sel);
    if (!root) return { error: `未找到 ${sel}` };
    const target = [...root.querySelectorAll('*')].find((el) => (el.textContent ?? '').trim() === '950616');
    if (!target) return { error: '未找到 950616 元素' };
    const cs = getComputedStyle(target);
    const range = document.createRange();
    range.selectNodeContents(target);
    const rect = range.getBoundingClientRect();
    const box = target.getBoundingClientRect();
    return {
      tag: target.tagName,
      fontSize: cs.fontSize,
      fontFamily: cs.fontFamily,
      fontWeight: cs.fontWeight,
      letterSpacing: cs.letterSpacing,
      lineHeight: cs.lineHeight,
      fontFeatureSettings: cs.fontFeatureSettings,
      fontVariantNumeric: cs.fontVariantNumeric,
      textWidth: Math.round(rect.width * 100) / 100,
      textX: Math.round((rect.x + scrollX) * 100) / 100,
      box: { x: Math.round(box.x + scrollX), y: Math.round(box.y + scrollY), w: Math.round(box.width), h: Math.round(box.height) },
      fontsUsed: [...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family).slice(0, 20),
    };
  }, rootSelector);
  await page.close();
  return out;
}

try {
  const official = await inspect('https://www.jdl.com/', '.contact-footer');
  console.log('[official]', JSON.stringify(official, null, 2));
  const local = await inspect('http://127.0.0.1:5173/', '[data-section="contact"]');
  console.log('[local]', JSON.stringify(local, null, 2));
} finally {
  await browser.close();
}
