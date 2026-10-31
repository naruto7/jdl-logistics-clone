import { asset } from '@/lib/assets';
import { link } from '@/lib/links';

/**
 * 官网二级路径 → 本站落地页锚点。
 * 复刻范围只到「一级栏目页」，官网的 /express/、/freight/fastCargo/ 等二级内页
 * 统一回落到 /services/ 对应锚点，保证导航与卡片「零死链」。
 * 顺序很重要：更具体的路径必须排在前面。
 */
const ANCHOR_BY_PATH: Array<[RegExp, string]> = [
  [/^\/express\/jdFastest/, 'jdFastest'],
  [/^\/express\/jdStandard/, 'jdStandard'],
  [/^\/express\/(freshFastest|freshStandard)/, 'freshFastest'],
  [/^\/express/, 'express'],
  [/^\/freight\/(fastCargo|completeVehicle)/, 'heavyCargo'],
  [/^\/freight/, 'freight'],
  [/^\/supplyChain/, 'supplyChain'],
  [/^\/bulky/, 'bulky'],
  [/^\/reachWarehouse/, 'reachWarehouse'],
  [/^\/coldChain/, 'coldChain'],
  [/^\/medicine/, 'medicine'],
  [/^\/servicePlus\/install/, 'install'],
  [/^\/servicePlus\/repair/, 'repair'],
  [/^\/servicePlus/, 'findService'],
  [/^\/capacity\/dedicatedLine/, 'dedicatedLine'],
  [/^\/capacity\/fullCargo/, 'fullCargo'],
  [/^\/capacity/, 'dedicatedLine'],
  [/^\/crossBorder/, 'crossBorder'],
  [/^\/technology\/intelligentWarehouse/, 'intelligentWarehouse'],
  [/^\/technology\/intelligentPark/, 'intelligentPark'],
  [/^\/technology\/education/, 'education'],
  [/^\/technology/, 'intelligentWarehouse'],
];

/** 把官网原始内页路径解析成站内可用地址（带 base 前缀 + 锚点） */
export function serviceHref(originalPath: string): string {
  // 合作咨询：官网在 /ecology/cooperation，落地到「服务支持 - 联系我们」
  if (originalPath.startsWith('/ecology/')) return link('/support/#contact');
  for (const [pattern, anchor] of ANCHOR_BY_PATH) {
    if (pattern.test(originalPath)) return link(`/services/#${anchor}`);
  }
  return link('/services/');
}

/**
 * 「面向丰富场景的物流服务」区数据
 *
 * 全部文案、跳转链接来自官网 service 区的真实数据（通过官网 Vue 实例
 * `serviceTypes` 导出，见 qa/tmp/service-data.json 的整理结果），不做任何改写：
 * - 10 个服务项的名称/描述/产品列表/咨询链接均与官网一致；
 * - 产品列表按官网渲染规则拆成「列标题（isTitle）+ 链接」两种节点。
 */
export type ServiceProduct = {
  title: string;
  link?: string;
  /** 官网列表里的列标题（快递 / 快运等），加粗不可点 */
  isTitle?: boolean;
};

export type ServiceType = {
  key: string;
  name: string;
  /** 详情标题点击跳转（官网 /express 等内页） */
  link: string;
  description: string;
  products: ServiceProduct[];
  cooperationUrl: string;
};

export const SERVICE_TYPES: ServiceType[] = [
  {
    key: 'express',
    name: '快递快运服务',
    link: '/express',
    description:
      '向企业及个人客户提供安全可靠、时效领先、专业贴心的快递及快运服务，以及在此基础上的多种增值服务',
    products: [
      { title: '快递', isTitle: true },
      { title: '京东特快', link: '/express/jdFastest' },
      { title: '京东标快', link: '/express/jdStandard' },
      { title: '增值服务', link: '/express/addValueService' },
      { title: '查看更多', link: '/express' },
      { title: '快运', isTitle: true },
      { title: '重货标快', link: '/freight/fastCargo' },
      { title: '整车直达', link: '/freight/completeVehicle' },
      { title: '增值服务', link: '/freight/addValueService' },
    ],
    cooperationUrl: '/ecology/cooperation',
  },
  {
    key: 'supplyChain',
    name: '仓配一体服务',
    link: '/supplyChain',
    description:
      '以京仓/云仓+京配/云配服务不同需求的客户，为电商仓平台商家提供高品质以及性价比仓配一体物流服务',
    products: [
      { title: '商务仓', link: '/supplyChain/businessWarehouse' },
      { title: '电商仓', link: '/supplyChain/eWarehouse' },
      { title: '更多', link: '/supplyChain' },
    ],
    cooperationUrl: '/ecology/cooperation?cooType=3',
  },
  {
    key: 'bulky',
    name: '大件服务',
    link: '/bulky',
    description:
      '面向家电、家居、电动车、健身器材行业，为客户提供全渠道正、逆向全链路一体化的仓&配供应链服务。',
    products: [
      { title: '大件商务仓', link: '/bulky/business' },
      { title: '大件备件仓', link: '/bulky/spare' },
      { title: '更多', link: '/bulky' },
    ],
    cooperationUrl: '/ecology/cooperation?cooType=2',
  },
  {
    key: 'warehouse',
    name: '送仓服务',
    link: '/reachWarehouse',
    description:
      '为企业客户提供从货源地到收货仓之间的收货、暂存、分仓调度、运输、送仓、退仓的一体化供应链物流服务。',
    products: [
      { title: '特快到仓', link: '/reachWarehouse/fast' },
      { title: '极速到仓', link: '/reachWarehouse/top' },
      { title: '更多', link: '/reachWarehouse' },
    ],
    cooperationUrl: '/ecology/cooperation?cooType=3',
  },
  {
    key: 'coldChain',
    name: '冷链服务',
    link: '/coldChain',
    description:
      '专注于生鲜食品，通过构建社会化冷链协同网络，打造全流程、全场景的F2B2C一体化供应链服务平台，实现对商家与消费终端的安心交付',
    products: [
      { title: '生鲜商务仓', link: '/coldChain/bizWarehouse' },
      { title: '冷链卡班', link: '/coldChain/truckService' },
      { title: '更多', link: '/coldChain' },
    ],
    cooperationUrl: '/ecology/cooperation?cooType=5',
  },
  {
    key: 'medicine',
    name: '医药服务',
    link: '/medicine',
    description:
      '面向受国家药监监管的医药行业，以覆盖全国的仓&配资源，全程追溯控温的数字化能力，为客户提供合规专业、安全高效的多温层履约服务',
    products: [
      { title: '医药商务仓', link: '/medicine/business' },
      { title: '医冷快递', link: '/medicine/coldExpress' },
      { title: '更多', link: '/medicine' },
    ],
    cooperationUrl: '/ecology/cooperation?cooType=22',
  },
  {
    key: 'servicePlus',
    name: '京东服务',
    link: '/servicePlus',
    description: '京东物流旗下行业领先的一站式服务平台',
    products: [
      { title: '安装', link: '/servicePlus/install' },
      { title: '维修', link: '/servicePlus/repair' },
      { title: '机器人服务', link: '/servicePlus/robot' },
    ],
    cooperationUrl: '/ecology/cooperation?cooType=20',
  },
  {
    key: 'capacity',
    name: '运力服务',
    link: '/capacity',
    description: '整合公路、铁路、航空、基础设施设备等资源，提供全方位、多层次的物流运输服务',
    products: [
      { title: '专线包仓', link: '/capacity/dedicatedLine' },
      { title: '全货机包机', link: '/capacity/fullCargo' },
      { title: '更多', link: '/capacity' },
    ],
    cooperationUrl: '/ecology/cooperation?cooType=31',
  },
  {
    key: 'inter',
    name: '国际物流',
    link: '/crossBorder',
    description: '助力中国制造和中国品牌一站出海，并为全球客户提供优质、高效全面的一体化供应链解决方案',
    products: [
      { title: '跨境端到端', link: '/crossBorder/crossBorderEnd' },
      { title: '国际运输', link: '/crossBorder/internationalTrans' },
      { title: '更多', link: '/crossBorder' },
    ],
    cooperationUrl: '/ecology/cooperation?cooType=6',
  },
  {
    key: 'technology',
    name: '物流科技',
    link: '/technology',
    description:
      '致力于创新技术服务与多元场景的有机结合，通过自动化、数字化、智能化的物流科技产品和解决方案，推动高效协同的生态赋能和多元价值的共赢共创',
    products: [
      { title: '智能仓储', link: '/technology/intelligentWarehouse' },
      { title: '智能物流园区', link: '/technology/intelligentPark' },
      { title: '更多', link: '/technology' },
    ],
    cooperationUrl: '/ecology/cooperation?cooType=7',
  },
];

/** 服务图标（官网 product/lines/*.png，非激活 51.84px / 激活 scale(2)） */
const LINE_ICON: Record<string, string> = {
  express: 'service/lines-express',
  supplyChain: 'service/lines-supplyChain',
  bulky: 'service/lines-bulky',
  warehouse: 'service/lines-warehouse',
  coldChain: 'service/lines-coldChain',
  medicine: 'service/lines-medicine',
  servicePlus: 'service/lines-servicePlus',
  capacity: 'service/lines-capacity',
  inter: 'service/lines-inter',
  technology: 'service/lines-technology',
};

export function serviceIcon(key: string): string {
  const name = LINE_ICON[key];
  return name ? asset(name) : '';
}

/**
 * 详情区右侧大图（官网 561.59x360）。
 * 目前素材库只落了「快递快运」的卡车图，其余服务没有对应实拍图：
 * 用该服务自己的 line 图标做放大插画兜底，避免出现与文案无关的图。
 */
const DETAIL_IMAGE: Record<string, string> = {
  express: 'service/express-truck',
};

export function serviceDetailImage(key: string): string {
  const name = DETAIL_IMAGE[key];
  return name ? asset(name) : '';
}

/** 场景服务条的分页尺寸：官网每屏 5 项、项宽 196.55（5 项 = 982.75 ≈ 版心宽） */
export const ITEMS_PER_PAGE = 5;
export const SERVICE_ITEM_WIDTH = 196.55;

/** 选中项底部胶囊光晕（官网 .active-bar 背景图） */
export const SERVICE_ACTIVE_BG = asset('service/service-active');

/** 卡片「产品服务」小图标（官网 icon-group.png，18.72px） */
export const SERVICE_ICON_GROUP = asset('service/icon-group');
