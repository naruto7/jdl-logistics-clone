/**
 * 新闻动态区数据
 *
 * 来源：官网首页实测（spec/home-spec.json → content.newsCards）。
 * 日期与标题是参照站的原文，不允许自创；封面图取自 src/assets/news（原图 URL 见 assets/manifest.json）。
 * 链接：官网原始卡片均为外链新闻详情页；复刻站没有新闻详情页，统一落到关于我们页的「新闻」锚点，保证零死链。
 */
export type NewsCardData = {
  /** 发布日期，文案原样展示在封面左下角 */
  date: string;
  /** 新闻标题，最多两行，超出省略 */
  title: string;
  /** 封面图逻辑名（由 @/lib/assets 解析为带 base 前缀的 URL） */
  cover: string;
  /** 点击跳转地址 */
  href: string;
};

/** 4 张新闻卡：顺序与官网一致 */
export const NEWS_CARDS: NewsCardData[] = [
  {
    date: '2026.05.12',
    title: '一图看懂！京东物流Q1收入同比增长29% 创上市以来一季度最佳利润表现',
    cover: 'news/cover-01.jpg',
    href: '/about/#news',
  },
  {
    date: '2026.04.25',
    title: '一图读懂京东物流2025年ESG报告',
    cover: 'news/cover-02.jpg',
    href: '/about/#news',
  },
  {
    date: '2026.04.23',
    title: '全球最高标准京东物流斩获国际软件研发诺贝尔奖',
    cover: 'news/cover-03.jpg',
    href: '/about/#news',
  },
  {
    date: '2025.08.14',
    title: '服务获权威认可！京东物流旗下JD Express Investment获香港海关AEO认证',
    cover: 'news/cover-04.png',
    href: '/about/#news',
  },
];

/** 右侧「更多」卡里的两个胶囊按钮（文案来自官网实测：更多新闻 / 更多活动） */
export const MORE_ENTRIES = [
  { label: '更多新闻', href: '/about/#news' },
  { label: '更多活动', href: '/about/#videos' },
] as const;
