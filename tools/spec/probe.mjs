#!/usr/bin/env node
/**
 * 参考站元素级测量：在 1440x900 视口打开 jdl.com，按选择器采集
 * 每个关键元素的 rect 与计算样式，输出 spec/key-rects.json。
 *
 * 目的：复刻要"像"，靠的不是目测，而是这些像素级数值 → 直接喂给组件实现。
 *
 * 用法：node tools/spec/probe.mjs
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import puppeteer from 'puppeteer-core';

const ROOT = resolve(import.meta.dirname, '../..');
const CHROME = process.env.CHROME_PATH || 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

const SELECTORS = {
  header: ['.header-common', '.top-navi-cnt', '.main-navi-cnt', '.pageCenterWidth', '.navi-logo-box', '.navi-logo-box img', '.main-navi-bar', '.first-menu-item', '.first-menu-item .link'],
  dropmenu: ['.drop-menu-box', '.drop-menu-wrap', '.sub-menu-wrap', '.second-menu-item', '.third-menu-item'],
  banner: ['.banner-container', '.banner-item.swiper-slide-active', '.banner-media', '.banner-media img', '.scroll-info', '.text-info', '.text-info .text', '.swiper-pagination'],
  search: ['.search-wrap', '.waybill-search-container', '.waybill-search-content', '.search-icon', '.waybill-search-btn', '.quick-search-wrap', '.search-item', '.search-item .icon', '.search-item .tag'],
  service: ['.logistics-service', '.logistics-service .home-section-title', '.scroll-btn-left', '.scroll-btn-right', '.service-types-wrapper', '.service-types', '.service-item', '.service-item.active', '.service-con', '.active-bar', '.service-content', '.content-header', '.content-title', '.content-desc', '.card-container', '.service-card', '.card-item', '.card-header', '.icon-title', '.card-header .name', '.service-list', '.service-title', '.service-list .btn', '.service-image', '.logistics-service .home-section-title .title-line'],
  industry: ['.industry-solutions', '.industry-solutions .home-section-title', '.industry-solutions .home-subtitle', '.detail-wrap', '.industry-content', '.industry-info', '.industry-title', '.industry-desc', '.feature-list', '.feature-list li', '.industry-tabs', '.tab-item', '.tab-item.active', '.tab-content', '.tab-icon', '.tab-item .more', '.tab-item .name'],
  network: ['.logistics-network', '.logistics-network .home-section-title', '.logistics-network .home-subtitle', '.content-wrapper', '.statistics', '.stat-item', '.number', '.number .desc', '.stat-item .detail', '.network-features', '.feature-btn', '.feature-btn .icon', '.feature-btn .name'],
  news: ['.news-updates', '.news-updates .home-section-title', '.carousel-wrapper', '.news-list', '.news-card', '.card-main', '.card-main .tag', '.card-image', '.card-main .date', '.card-main .title', '.more-card', '.more-button'],
  contact: ['.contact-footer', '.contact-footer .detail-wrap', '.contact-title', '.info-section', '.info-section .desc', '.tel-img', '.contact-list', '.contact-item', '.contact-item .icon'],
  footer: ['.footer-common', '.footer-content', '.footer-content .detail-wrap', '.link-map', '.link-item', '.link-item .name', '.sub-link', '.sub-name', '.beian-wrap', '.other-info-link', '.other-info-link .white-link'],
  float: ['.home-float', '.sidebar-list', '.sidebar-item', '.sidebar-top'],
};

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 1 },
  args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars'],
});

try {
  const page = await browser.newPage();
  await page.goto('https://www.jdl.com/', { waitUntil: 'networkidle2', timeout: 90000 });
  // 预热滚动触发懒加载与动画
  await page.evaluate(async () => {
    const step = 600;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 1200));
  });

  const result = await page.evaluate((selectors) => {
    const out = {};
    const pick = (el) => {
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return {
        tag: el.tagName,
        class: typeof el.className === 'string' ? el.className.slice(0, 120) : '',
        rect: { x: Math.round(r.x + scrollX), y: Math.round(r.y + scrollY), w: Math.round(r.width), h: Math.round(r.height) },
        text: (el.innerText || el.getAttribute('alt') || '').replace(/\s+/g, ' ').trim().slice(0, 80),
        style: {
          fontSize: cs.fontSize,
          fontWeight: cs.fontWeight,
          lineHeight: cs.lineHeight,
          letterSpacing: cs.letterSpacing,
          color: cs.color,
          backgroundColor: cs.backgroundColor,
          backgroundImage: cs.backgroundImage === 'none' ? 'none' : cs.backgroundImage.slice(0, 160),
          borderRadius: cs.borderRadius,
          boxShadow: cs.boxShadow,
          padding: cs.padding,
          margin: cs.margin,
          display: cs.display,
          alignItems: cs.alignItems,
          justifyContent: cs.justifyContent,
          gap: cs.gap,
          transform: cs.transform,
          opacity: cs.opacity,
          fontFamily: cs.fontFamily.slice(0, 100),
          filter: cs.filter,
        },
      };
    };
    for (const [group, list] of Object.entries(selectors)) {
      out[group] = {};
      for (const sel of list) {
        const els = [...document.querySelectorAll(sel)].slice(0, 14);
        out[group][sel] = els.map(pick);
      }
    }
    return out;
  }, SELECTORS);

  mkdirSync(resolve(ROOT, 'spec'), { recursive: true });
  const file = resolve(ROOT, 'spec/key-rects.json');
  writeFileSync(file, JSON.stringify(result, null, 2));

  let count = 0;
  for (const [group, map] of Object.entries(result)) {
    for (const [, els] of Object.entries(map)) count += els.length;
  }
  console.log(`[probe] 写出 ${file}（${count} 个元素）`);

  // 关键数值摘要
  const one = (group, sel, i = 0) => result[group]?.[sel]?.[i];
  const brief = (label, el) => el && console.log(`[probe] ${label.padEnd(26)} rect=${JSON.stringify(el.rect)} fs=${el.style.fontSize} fw=${el.style.fontWeight} color=${el.style.color}`);
  brief('header', one('header', '.header-common'));
  brief('logo', one('header', '.navi-logo-box img'));
  brief('nav-bar', one('header', '.main-navi-bar'));
  brief('banner', one('banner', '.banner-container'));
  brief('hero-text', one('banner', '.text-info .text'));
  brief('search-wrap', one('search', '.search-wrap'));
  brief('waybill-btn', one('search', '.waybill-search-btn'));
  brief('service-section', one('service', '.logistics-service'));
  brief('service-title', one('service', '.logistics-service .home-section-title'));
  brief('active-service-item', one('service', '.service-item.active'));
  brief('card-container', one('service', '.card-container'));
  brief('industry', one('industry', '.industry-solutions'));
  brief('industry-title', one('industry', '.industry-title'));
  brief('tab-item', one('industry', '.tab-item'));
  brief('network', one('network', '.logistics-network'));
  brief('statistics', one('network', '.statistics'));
  brief('feature-btn', one('network', '.feature-btn'));
  brief('news', one('news', '.news-updates'));
  brief('news-card', one('news', '.news-card'));
  brief('contact', one('contact', '.contact-footer'));
  brief('footer', one('footer', '.footer-common'));
} finally {
  await browser.close();
}
