/**
 * 热门行业解决方案：6 个行业的数据（文案均为 jdl.com 渲染后 DOM 的原文，非自创）
 *
 * 数据来源：官网 .industry-solutions 的初始渲染 + 逐个 tab 悬停/点击后的 .industry-info 实测。
 * 背景大图说明：官网 6 张行业大图（3840x1400）的左侧深色渐变已烘焙进图片本身，
 * 因此组件不需要再叠加深色遮罩，直接用 asset('industry/bg-*.jpeg') 作为 cover 背景即可。
 */
import { link } from '@/lib/links';

export interface IndustryItem {
  /** 稳定标识：同时用作 React key */
  key: string;
  /** 行业名：tab 与左侧信息块标题共用 */
  name: string;
  /** 左侧信息块描述（官网原文） */
  desc: string;
  /** 左侧信息块能力点：官网固定两条 */
  features: readonly [string, string];
  /** tab 选中时红色卡片顶部的图标 */
  icon: string;
  /** 该行业的整幅背景大图逻辑名（src/assets 下的相对路径） */
  background: string;
  /** 「了解更多」的落地页：官网为独立行业页，本复刻统一收敛到解决方案页锚点 */
  href: string;
}

/** 展示顺序与官网一致：快消 → 服装 → 家电 → 3C → 汽车 → 生鲜 */
export const INDUSTRIES: readonly IndustryItem[] = [
  {
    key: 'consumer',
    name: '快消',
    desc: '为消费品行业客户提供数字化、可视化、智能化的一体解决方案，向客户提供全渠道 E2E 服务，实现供应链升级',
    features: ['多渠道多场景的供应链服务能力', '广泛的物流网络覆盖能力'],
    icon: 'industry/icon-consumer.png',
    background: 'industry/bg-consumer.jpeg',
    href: link('/solutions/#consumerGoods'),
  },
  {
    key: 'dress',
    name: '服装',
    desc: '京东物流秉承客户为先，利用物流覆盖全国的仓运配网络，为客户提供优质的基础物流服务',
    features: ['电商平台物流评分提升', '正逆一体'],
    icon: 'industry/icon-dress.png',
    background: 'industry/bg-dress.jpeg',
    href: link('/solutions/#dress'),
  },
  {
    key: 'homeAppliances',
    name: '家电',
    desc: '为通过供应链自动化、数智化，提升生产效率，优化供应链布局，最终实现产销协同的一体化供应链物流目标',
    features: ['多样化配送体系及多场景融合', '提供行业化标准解决方案'],
    icon: 'industry/icon-homeAppliances.png',
    background: 'industry/bg-homeAppliances.jpeg',
    href: link('/solutions/#homeAppliances'),
  },
  {
    key: 'digital',
    name: '3C',
    desc: '京东物流结合自身多种产品能力，为企业提供多渠道一盘货的一站式物流解决方案',
    features: ['正逆一体服务无忧', '全渠道一盘货库存共享'],
    icon: 'industry/icon-digital.png',
    background: 'industry/bg-digital.jpeg',
    href: link('/solutions/#digital'),
  },
  {
    key: 'car',
    name: '汽车',
    desc: '助力汽车行业客户供应链自动化、数字化转型，共同打造柔性、高效敏捷的精益物流',
    features: ['降低取货物流成本', '自动化提升效率'],
    icon: 'industry/icon-car.png',
    background: 'industry/bg-car.jpeg',
    href: link('/solutions/#carService'),
  },
  {
    key: 'fresh',
    name: '生鲜',
    desc: '助力生鲜行业客户供应链自动化、数字化转型，共同打造柔性、高效敏捷的精益物流',
    features: ['冷链全覆盖', '协同数智化能力'],
    icon: 'industry/icon-fresh.png',
    background: 'industry/bg-fresh.jpeg',
    href: link('/solutions/#freshSolution'),
  },
];
