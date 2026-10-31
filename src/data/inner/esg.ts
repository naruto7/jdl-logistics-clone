import type { NavItem, NewsItem, PageHeroContent } from './types';

/**
 * 可持续发展（ESG）页数据。
 * 数据来源：jdl.com/esg、/green、/greenNews 三页正文与官网 ESG 报告封面信息（2026-10 抓取）。
 */
export const ESG_HERO: PageHeroContent = {
  eyebrow: '可持续发展',
  title: '可持续发展',
  subtitle: '智链协同，共享未来：以绿色包装、绿色运输、绿色仓储与绿色回收，推动供应链端到端的绿色化。',
  crumbs: [{ label: '首页', href: '/' }, { label: '可持续发展' }],
  image: 'inner/esg/hero',
  tone: 'green',
  stats: [
    { value: '2.2亿次', label: '循环快递包装累积投放' },
    { value: '85%', label: '智能物流园区绿色能源占比' },
    { value: '3%', label: '车联网综合油耗降低' },
    { value: '2017', label: '青流计划启动年份' },
  ],
};

export const ESG_NAV: NavItem[] = [
  { id: 'esg', label: 'ESG' },
  { id: 'green', label: '青流计划' },
  { id: 'greenNews', label: '环保资讯' },
  { id: 'contact', label: '合作咨询' },
];

export type Pillar = { key: string; title: string; desc: string; points: string[] };

/** ESG 治理：环境 / 社会 / 治理 三大支柱（官网「我们的承诺 / 行动 / 贡献」框架） */
export const ESG_PILLARS: Pillar[] = [
  {
    key: 'E',
    title: '环境 Environment',
    desc: '围绕包装、运输、仓储与回收四个环节推进低碳供应链，减少化石燃料使用与运输网络碳排放。',
    points: ['绿色包装：可循环快递包装', '绿色运输：车联网降低综合油耗', '绿色仓储：园区绿色能源替代'],
  },
  {
    key: 'S',
    title: '社会 Social',
    desc: '以物流基础设施服务实体经济，通过「千县万镇 24 小时达」、乡村振兴与产业带服务带动就业与流通效率。',
    points: ['服务覆盖超 99% 的人口', '产地产业带物流新基建', '员工关怀与职业发展'],
  },
  {
    key: 'G',
    title: '治理 Governance',
    desc: '以技术驱动、合规经营与信息披露为基石，建立覆盖供应链上下游的可持续发展治理体系。',
    points: ['连续发布 ESG 报告', '供应商绿色供应链辅导', '科学碳目标与合规体系建设'],
  },
];

/** 绿色行动四项（官网 ESG 页四个行动方向原话） */
export const GREEN_ACTIONS = [
  {
    title: '绿色包装',
    desc: '可循环快递包装累积投放次数已超过 2.2 亿次，持续减少一次性包装消耗。',
    stat: '2.2亿次',
    icon: '包',
  },
  {
    title: '绿色运输',
    desc: '引入车联网技术实现综合油耗降低 3% 左右，减少化石燃料使用，降低运输网络碳排放。',
    stat: '-3%',
    icon: '运',
  },
  {
    title: '绿色仓储',
    desc: '为 85% 的京东物流智能物流园区提供绿色能源，共同实现可再生能源基地的可持续发展目标。',
    stat: '85%',
    icon: '仓',
  },
  {
    title: '绿色回收',
    desc: '发起「供应链脱碳行动」，持续向上下游企业进行绿色供应链、低碳技术、科学碳目标等宣传与辅导。',
    stat: '脱碳行动',
    icon: '收',
  },
] as const;

/** ESG 报告（官网 2021-2025 报告封面） */
export const ESG_REPORTS = [
  { year: '2025', label: '2025 年 ESG 报告' },
  { year: '2024', label: '2024 年 ESG 报告' },
  { year: '2023', label: '2023 年 ESG 报告' },
  { year: '2022', label: '2022 年 ESG 报告' },
  { year: '2021', label: '2021 年 ESG 报告' },
] as const;

export const ESG_REPORT_URL = 'https://www.jdl.com/esg';

/** 青流计划页进度数字（官网「我们的进展」原话） */
export const GREEN_STATS = [
  { value: '114.48', unit: '兆瓦', label: '光伏总装机量' },
  { value: '8,290', unit: '辆', label: '新能源车' },
  { value: '27,000', unit: '吨', label: '减少碳排放' },
  { value: '100', unit: '万个', label: '循环快递包装' },
] as const;

/** 青流计划四大绿色板块 */
export const GREEN_MODULES = [
  {
    title: '绿色运输',
    desc: '新能源车规模化投放与车联网技术应用，优化运输路径与装载率，降低运输网络碳排放。',
  },
  {
    title: '绿色仓储',
    desc: '光伏发电、园区绿色能源与智能能耗管理，让仓储环节用能更清洁、更高效。',
  },
  {
    title: '绿色科技',
    desc: '以京碳惠 SCEMP 等碳管理平台与智能算法能力，赋能品牌客户核算与减排。',
  },
  {
    title: '绿色包装',
    desc: '循环快递包装、循环保温箱与包装减量化设计，推动包装全生命周期循环。',
  },
] as const;

export type Milestone = { year: string; title: string; desc: string };

/** 青流计划里程碑（依据官网环保资讯标题整理） */
export const GREEN_MILESTONES: Milestone[] = [
  {
    year: '2017',
    title: '青流计划启动',
    desc: '京东物流携手供应链上下游伙伴，推动供应链端到端的绿色化、环保化。',
  },
  {
    year: '2025',
    title: '发布「FAST」可持续发展战略',
    desc: '智链协同 共享未来：京东物流在交通展上正式发布「FAST」可持续发展战略。',
  },
  {
    year: '2025',
    title: '加入全球万亿棵树倡议',
    desc: '青流八载，绿动未来：首创「购物即种树」消费新模式。',
  },
  {
    year: '2025',
    title: '红树林生态修复计划 2.0',
    desc: '携手全球伙伴成立青流计划「海洋盒伙人」，推进生态修复。',
  },
  {
    year: '2025',
    title: '618 启用 50 万个新款循环保温箱',
    desc: '迄今规模最大的一次循环保温箱投放，减少一次性泡沫箱使用。',
  },
];

/** 环保资讯（官网 /greenNews 列表，日期为原站发布日） */
export const GREEN_NEWS: NewsItem[] = [
  {
    title: '《焦点访谈》报道京东物流：科技算法加持物流包装瘦身',
    date: '2025.08.19',
    cover: 'inner/news/green-a',
  },
  {
    title: '京东物流获行业首张「五星低碳供应商」认证，引领绿色供应链新标杆',
    date: '2025.08.12',
    cover: 'inner/news/green-b',
  },
  {
    title: '行业唯一！京东物流荣获联合国 WSIS Prizes 2025 提名奖，京碳惠平台赋能全球品牌绿色转型',
    date: '2025.07.21',
    cover: 'inner/news/green-c',
  },
  {
    title: '青流八载，绿动未来！青流计划加入全球万亿棵树倡议，首创「购物即种树」消费新模式',
    date: '2025.07.07',
    cover: 'inner/news/green-a',
  },
  {
    title: '智链协同 共享未来：京东物流在交通展上正式发布「FAST」可持续发展战略',
    date: '2025.07.03',
    cover: 'inner/news/green-b',
  },
  {
    title: '响应节能低碳号召，京东物流以「循环保温箱」引领绿色焕新',
    date: '2025.06.27',
    cover: 'inner/news/green-c',
  },
  {
    title: '京东连续两年入选全球供应链 25 强，京东物流以绿色科技持续构筑低碳供应链',
    date: '2025.06.24',
    cover: 'inner/news/green-a',
  },
  {
    title: '迄今规模最大！京东物流 618 期间启用 50 万个新款循环保温箱',
    date: '2025.06.06',
    cover: 'inner/news/green-b',
  },
  {
    title: '京东物流启动红树林生态修复计划 2.0，携手全球伙伴成立青流计划「海洋盒伙人」',
    date: '2025.05.23',
    cover: 'inner/news/green-c',
  },
  {
    title: '京东物流荣膺香港品质保证局 ESG Connect 杰出先锋卓越奖',
    date: '2025.05.14',
    cover: 'inner/news/green-a',
  },
];

/** 合作咨询（导航「可持续发展 · 合作咨询」列，锚点 #contact） */
export const ESG_COOPERATION = [
  {
    title: '绿色供应链合作',
    desc: '面向品牌客户提供绿色仓配方案设计、循环包装替换与低碳运输组合。',
  },
  {
    title: '供应链脱碳行动',
    desc: '与上下游企业共同推进绿色供应链、低碳技术与科学碳目标宣传与辅导。',
  },
  {
    title: '碳管理与咨询',
    desc: '以京碳惠 SCEMP 等碳管理平台能力，支撑品牌碳核算、减排路径与信息披露。',
  },
] as const;

export const ESG_FOOTNOTE =
  'ESG 与青流计划数据整理自京东物流官网公开页面；完整报告请访问官网 ESG 频道。';
