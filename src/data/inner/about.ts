import type { NavItem, NewsItem, PageHeroContent } from './types';

/**
 * 关于京东物流页数据。
 * 数据来源：jdl.com/profile/、/news/list、/videos、/contactUs 正文（2026-10 抓取）。
 */
export const ABOUT_HERO: PageHeroContent = {
  eyebrow: '关于京东物流',
  title: '关于京东物流',
  subtitle: '中国领先的技术驱动的供应链解决方案及物流服务商。',
  crumbs: [{ label: '首页', href: '/' }, { label: '关于京东物流' }],
  image: 'inner/about/hero',
  tone: 'brand',
  stats: [
    { value: '2007', label: '京东集团开始自建物流' },
    { value: '2017/04', label: '京东物流集团成立' },
    { value: '2021/05', label: '香港联交所主板上市' },
    { value: '3600+', label: '仓库数量' },
  ],
};

export const ABOUT_NAV: NavItem[] = [
  { id: 'profile', label: '企业介绍' },
  { id: 'news', label: '新闻中心' },
  { id: 'videos', label: '视频中心' },
  { id: 'investor', label: '投资者关系' },
  { id: 'contact', label: '联系我们' },
  { id: 'jobs', label: '招贤纳士' },
  { id: 'group', label: '集团网站' },
  { id: 'lang', label: '语言切换' },
];

/** 公司简介（官网 profile 页原文整理） */
export const PROFILE_PARAGRAPHS = [
  '京东集团 2007 年开始自建物流，2017 年 4 月正式成立京东物流集团。2021 年 5 月，京东物流于香港联交所主板上市。',
  '京东物流是中国领先的技术驱动的供应链解决方案及物流服务商，以「技术驱动，引领全球高效流通和可持续发展」为使命，致力于成为全球最值得信赖的供应链基础设施服务商。',
  '京东物流建立了包含仓储网络、综合运输网络、最后一公里配送网络、大件网络、冷链物流网络和跨境物流网络在内的高度协同的六大网络，服务覆盖超 99% 的人口，将「快」与「准」延伸到更广阔的场景。',
];

export const PROFILE_STATS = [
  { value: '3600+', label: '京东物流仓库数量' },
  { value: '3400万+', label: '仓库总管理面积（㎡）' },
  { value: '25个', label: '海外仓覆盖国家和地区' },
  { value: '99%+', label: '服务覆盖人口' },
] as const;

/** 使命愿景与经营理念（官网原话） */
export const MISSION_VISION = [
  {
    label: '企业使命',
    value: '技术驱动，引领全球高效流通和可持续发展',
  },
  {
    label: '企业愿景',
    value: '成为全球最值得信赖的供应链基础设施服务商',
  },
  {
    label: '经营理念',
    value: '以客户为中心，用可信赖的供应链服务持续创造价值',
  },
] as const;

export type TimelineNode = {
  date: string;
  title: string;
  desc: string;
  image?: string;
};

/** 公司历程（官网 profile 页时间轴原文） */
export const TIMELINE: TimelineNode[] = [
  {
    date: '2017/04',
    title: '京东物流集团成立',
    desc: '全面开放外部服务；同一年建成全球首个 B2C 全流程无人仓。',
    image: 'inner/about/develop-02',
  },
  {
    date: '2017',
    title: '推出「千县万镇 24 小时达」',
    desc: '时效提升计划发布，为 1000 多个产地产业带打造最「鲜」一公里物流新基建。',
    image: 'inner/about/develop-03',
  },
  {
    date: '2018/06',
    title: '配送机器人落地公共道路',
    desc: '京东配送机器人开始运营于北京市公共道路，末端无人配送进入常态化测试。',
  },
  {
    date: '2019/08',
    title: '发起包装标准联盟',
    desc: '与七家机构一起发起成立中国电商物流行业包装标准联盟，并启动供应链产业平台（OPDS）。',
  },
  {
    date: '2021/05',
    title: '香港联交所主板上市',
    desc: '京东物流在香港交易所挂牌上市，进入新的发展阶段。',
    image: 'inner/about/develop-04',
  },
  {
    date: '2023/04',
    title: '四大独立事业部成立',
    desc: '组织结构调整，成立供应链、快递、快运、国际业务等四大独立事业部。',
  },
  {
    date: '2024/07',
    title: '入选标普可持续发展年鉴',
    desc: '京东物流首次入选标普全球《2024 可持续发展年鉴（中国版）》。',
  },
  {
    date: '2025/04',
    title: '欧洲自建物流网络启动',
    desc: '京东自建欧洲物流网络启动，推出 Joyexpress 快递品牌。',
    image: 'inner/about/course-02',
  },
];

/** 企业荣誉（官网 profile「企业荣誉 / 信息安全」板块） */
export const HONORS = [
  '首次入选标普全球《2024 可持续发展年鉴（中国版）》',
  '标普 CSA 评分保持中国内地物流行业第一',
  '京东物流斩获国际软件研发领域重要奖项',
  '旗下 JD Express Investment 获香港海关 AEO 认证',
] as const;

/** 新闻中心（官网 /news/list 与首页新闻卡原文，日期取自原站） */
export const NEWS_ITEMS: NewsItem[] = [
  {
    title: '「护航 11.11，又快又省心！」京东物流系列好服务落地，AI 新成果全面应用',
    date: '2026.10.16',
    tag: '公司动态',
    cover: 'inner/news/cover-a',
  },
  {
    title: '再获高分！京东物流标普 CSA 评分保持中国内地物流行业第一，ESG 贡献获全球权威机构高度认可',
    date: '2026.10.10',
    tag: '可持续发展',
    cover: 'inner/news/cover-b',
  },
  {
    title: '国际服务获权威认可！京东物流入选服贸会 2026 赋能企业「出海」示范案例',
    date: '2026.09.11',
    tag: '国际业务',
    cover: 'inner/news/cover-c',
  },
  {
    title: '华东首个！京东物流首开长三角至京津冀电商多式联运快速班列',
    date: '2026.08.24',
    tag: '物流网络',
    cover: 'news/cover-01',
  },
  {
    title: '面向百所高职院校！京东物流与教育部职业教育发展中心启动智能物流装备产教融合项目',
    date: '2026.08.24',
    tag: '产教融合',
    cover: 'news/cover-extra-7',
  },
  {
    title: '一图看懂！京东物流上半年收入同比增长 26.5%，利润持续改善、经营保持韧性',
    date: '2026.08.13',
    tag: '公司动态',
    cover: 'news/cover-extra-8',
  },
  {
    title: '直面行业痛点！京东物流发布时尚服饰行业一体化供应链解决方案',
    date: '2026.08.04',
    tag: '行业方案',
    cover: 'news/cover-extra-9',
  },
  {
    title: '一图看懂！京东物流 Q1 收入同比增长 29%，创上市以来一季度最佳利润表现',
    date: '2026.05.12',
    tag: '公司动态',
    cover: 'news/cover-01',
  },
  {
    title: '一图读懂京东物流 2025 年 ESG 报告',
    date: '2026.04.25',
    tag: '可持续发展',
    cover: 'inner/news/green-b',
  },
  {
    title: '服务获权威认可！京东物流旗下 JD Express Investment 获香港海关 AEO 认证',
    date: '2025.08.14',
    tag: '国际业务',
    cover: 'news/cover-extra-11',
  },
];

export type VideoItem = { title: string; cover: string; duration?: string };

/** 视频中心（官网 /videos 列表原文） */
export const VIDEO_ITEMS: VideoItem[] = [
  { title: '一周送出一亿只粽子，百年老字号的供应链物流革新', cover: 'inner/about/video-thumb-a', duration: '03:12' },
  { title: '从 1 件校园白 T 到年销 25 亿，打赢服装「质价比」之战', cover: 'inner/about/video-thumb-b', duration: '04:05' },
  { title: '京东物流智狼 新一代货到人解决方案', cover: 'news/cover-extra-9', duration: '01:48' },
  { title: '寄件快用京东快递 最快早上 8 点到', cover: 'inner/news/cover-c', duration: '00:32' },
  { title: '探寻宝藏东港：京东物流一体化供应链，助力东港乡村振兴', cover: 'inner/news/cover-b', duration: '05:26' },
  { title: '京东物流大件家居仓配装模式', cover: 'inner/about/course-03', duration: '02:37' },
  { title: '你知道寄包裹可以减碳吗？', cover: 'inner/news/green-a', duration: '01:15' },
  { title: '数字化让汽后供应链管理更柔更敏捷', cover: 'news/cover-extra-12', duration: '03:44' },
  { title: '物流科技赋能百级洁净车间', cover: 'inner/about/course-06', duration: '02:08' },
  { title: '连续第 10 年「春节也送货」萌虎上路', cover: 'news/cover-extra-13', duration: '01:02' },
];

export const VIDEOS_OFFICIAL_URL = 'https://www.jdl.com/videos';

/** 集团网站（京东集团旗下站点） */
export const GROUP_SITES = [
  { name: '京东集团', desc: '京东集团官方网站', href: 'https://www.jd.com/' },
  { name: '京东零售', desc: '京东零售业务主站', href: 'https://www.jd.com/' },
  { name: '京东科技', desc: '京东科技（京东云）官网', href: 'https://www.jdcloud.com/' },
  { name: '京东健康', desc: '京东健康官方网站', href: 'https://www.healthjd.com/' },
  { name: '京东工业', desc: '京东工业品官网', href: 'https://www.jdindustrial.com/' },
  { name: '德邦快递', desc: '德邦快递官方网站', href: 'https://www.deppon.com/' },
] as const;

/** 语言切换（官网顶部条：简体 / 繁體 / English） */
export const LANGS = [
  { code: 'zh-CN', name: '简体中文', native: '简体中文', active: true },
  { code: 'zh-TW', name: '繁體中文', native: '繁體中文', active: false },
  { code: 'en', name: 'English', native: 'English', active: false },
] as const;

/** 联系我们 */
export const ABOUT_CONTACT = [
  {
    label: '全国客服热线',
    value: '950616',
    note: '周一至周日 8:00-22:00',
    href: 'tel:950616',
  },
  {
    label: '香港 / 澳门咨询',
    value: '（852）25949618 / （853）28528618',
    note: '港澳寄递服务咨询',
  },
  {
    label: '总部地址',
    value: '北京市大兴区亦庄经济技术开发区科创十一街 18 号院',
    note: '京东集团总部（京东物流）',
  },
  {
    label: '企业合作',
    value: '扫码添加企业合作微信',
    note: '24×7 即时响应、最快 15 分钟对接销售专家',
  },
] as const;

/** 官方社交渠道二维码（已有素材） */
export const ABOUT_QRCODES = [
  { image: 'contact/qrcode-jdl', label: '京东物流' },
  { image: 'contact/qrcode-jdl-express', label: '京东快递' },
  { image: 'contact/qrcode-jdl-express-mini', label: '京东快递小程序' },
] as const;

/** 投资者关系（导航「关于京东物流 · 投资者关系」，锚点 #investor） */
export const INVESTOR_INFO = {
  url: 'https://ir.jdl.com/',
  listing: [
    { label: '上市地点', value: '香港联合交易所主板' },
    { label: '上市时间', value: '2021 年 5 月' },
    { label: '股票代码', value: '2618.HK' },
    { label: '公司全称', value: '京东物流股份有限公司' },
  ],
  links: ['财务报告', '业绩公告', '公司通函', '投资者日历', 'ESG 报告'],
} as const;

/** 招贤纳士（导航「关于京东物流 · 招贤纳士」，锚点 #jobs） */
export const JOBS_INFO = {
  url: 'https://zhaopin.jd.com/',
  intro: '京东物流以技术驱动的一体化供应链服务实体经济，欢迎物流运营、供应链方案、技术研发与国际业务人才加入。',
  directions: [
    { title: '供应链方案', desc: '行业解决方案设计、仓网规划与供应链咨询。' },
    { title: '物流运营', desc: '仓储、分拣、运输、配送与末端服务网络运营管理。' },
    { title: '技术研发', desc: '物流系统、算法、自动化设备与数据平台研发。' },
    { title: '国际业务', desc: '跨境物流、海外仓与全球供应链网络拓展。' },
  ],
} as const;

export const ABOUT_FOOTNOTE =
  '企业介绍、历程与新闻内容整理自京东物流官网公开页面，仅用于本站学习复刻演示。';
