/**
 * 站点元信息与「复刻声明」文案。
 * 素材来源与版权声明集中在此，页脚 / 关于本项目页共用，避免散落。
 */
export const SITE = {
  name: '京东物流',
  nameEn: 'JDL',
  cloneTitle: '京东物流官网复刻演示',
  sourceUrl: 'https://www.jdl.com/',
  repoTooltip: '本站为学习用途的前端复刻，非京东物流官方站点',
  disclaimer:
    '本站是借助 Vibe Coding 完成的学习演示项目，对京东物流官方网站（www.jdl.com）做前端复刻；页面文案、图片、Logo 等素材版权归京东物流（京东集团）所有，仅用于学习与展示，不作任何商业用途。',
  icp: '京ICP备12031107号-1',
  phone: '950616',
  buildInfo: {
    stack: 'Vite 7 · React 19 · TypeScript · Tailwind CSS 4',
    rendering: '多页静态构建（MPA）· 数据驱动',
    deploy: 'GitHub Pages（Git Data API 发布）',
  },
} as const;
