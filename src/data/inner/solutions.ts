import type { AnchorLink, NavItem, PageHeroContent } from './types';

/**
 * 解决方案页数据。
 * 文案来源：jdl.com 行业方案页与行业客户案例页正文（2026-10 抓取留档）。
 */
export const SOLUTIONS_HERO: PageHeroContent = {
  eyebrow: '解决方案',
  title: '解决方案',
  subtitle:
    '面向消费品、3C、大家居、服饰、家电、汽车、生鲜等行业，以数字化、可视化、智能化的一体化供应链服务，助力企业供应链升级。',
  crumbs: [{ label: '首页', href: '/' }, { label: '解决方案' }],
  image: 'inner/solutions/hero-consumer',
  tone: 'brand',
  stats: [
    { value: '7大', label: '行业解决方案' },
    { value: '99%+', label: '物流网络覆盖人口' },
    { value: '3600+', label: '仓库支撑履约' },
    { value: '全渠道', label: 'E2E 一盘货服务' },
  ],
};

export const SOLUTIONS_NAV: NavItem[] = [
  { id: 'group-industry', label: '行业方案' },
  { id: 'logisticsTech', label: '物流科技' },
  { id: 'group-cases', label: '行业案例' },
  { id: 'latestCases', label: '最新案例' },
  { id: 'group-value', label: '方案价值' },
];

export type SolutionStat = { value: string; label: string };

/** 行业方案：7 个锚点（与 nav.ts「行业方案」组一一对应） */
export const INDUSTRY_SOLUTIONS: AnchorLink[] = [
  {
    id: 'consumerGoods',
    name: '消费品行业',
    tag: '行业方案',
    desc: '为消费品行业客户提供数字化、可视化、智能化的一体解决方案，向客户提供全渠道 E2E 服务，实现供应链升级。',
    points: [
      '多渠道多场景：线上线下仓配一体、跨境、O2O 解决方案与运营能力',
      '广泛的物流网络覆盖能力：物流网络覆盖超 99% 的人口',
      '超强大促保障：峰值订单处理能力弹性扩充，保障时效达成',
      '短链、库存共享、BC 融合，降低客户供应链管理成本',
    ],
    metric: { value: '99%+', label: '物流网络覆盖人口' },
    image: 'inner/solutions/consumer-goods',
    originalPath: '/consumerGoods',
  },
  {
    id: 'digital',
    name: '3C 行业',
    tag: '行业方案',
    desc: '京东物流结合自身多种产品能力，为企业提供多渠道一盘货的一站式物流解决方案。',
    points: [
      '正逆一体服务无忧，正向发货稳定高效、逆向取件退货便捷安全',
      '全渠道一盘货库存共享，唯一码/串码精细化管理',
      '波峰波谷大促保障，多批次柔性生产',
      '专业团队全托管，提供全链条一体化服务',
    ],
    image: 'inner/solutions/3c',
    originalPath: '/digital',
  },
  {
    id: 'furnishings',
    name: '大家居行业',
    tag: '行业方案',
    desc: '为品牌方解决多工厂运输、目的城市仓集货齐套问题，根据用户需求提供集干支 + 仓储 + 送装的一体化服务。',
    points: [
      '千仓配一站式服务，降本增效',
      '多场景服务：集干支、仓储、送装一体',
      '全链路统一标准服务，提升末端送装体验',
      '降低运输破损率，改善消费者收货体验',
    ],
    image: 'inner/solutions/furnishings',
    originalPath: '/furnishings',
  },
  {
    id: 'dress',
    name: '服饰行业',
    tag: '行业方案',
    desc: '为服饰企业量身定制物流运输方案，打造从企业发货到终端配送的全链路解决方案。',
    points: [
      '24 小时发货揽收，一天两个出库揽收波次',
      '正逆一体：客退商品逆向拆包初检、质检分级',
      '越库快进快出、无库存接单，以销定采',
      '后整增值：质检、挂吊牌、车标、印花、折叠包装',
    ],
    image: 'inner/solutions/dress',
    originalPath: '/dress',
  },
  {
    id: 'homeAppliances',
    name: '家电行业',
    tag: '行业方案',
    desc: '通过供应链自动化、数智化提升生产效率，优化供应链布局，最终实现产销协同的一体化供应链物流目标。',
    points: [
      '多样化配送体系及多场景融合，正逆向履约稳定',
      '唯一码/串码精细化管理，线上线下多渠道库存融合',
      '定制化增值服务，末端 100% 送货上门',
      '品牌商、代理商等中腰部供应链需求全覆盖',
    ],
    image: 'inner/solutions/appliances',
    originalPath: '/homeAppliances',
  },
  {
    id: 'carService',
    name: '汽车行业',
    tag: '行业方案',
    desc: '通过前置仓在城市核心区域多点备货，实现对 4S 店/快修店的 1-2 小时极速覆盖，快速响应客户订单。',
    points: [
      '降低取货物流成本，提升车辆装载率与周转率',
      '自动化提升效率，缓解厂内物流降本压力',
      '数字化能力：需求预测、计划与物流过程可视',
      '仓配服务：综合性、一体化及可定制的仓配服务',
    ],
    image: 'inner/solutions/car',
    originalPath: '/carService',
  },
  {
    id: 'freshSolution',
    name: '生鲜行业',
    tag: '行业方案',
    desc: '凭借覆盖全国的冷链仓运配网络，为生鲜企业提供从原产地、生产加工源头到末端消费者的全环节一站式供应链服务。',
    points: [
      '冷链全覆盖：覆盖全国的冷链仓运配网络',
      '协同数智化能力：全程可溯源、温度可监控',
      '大数据驱动与科技赋能，建立食品供应链可视化体系',
      '自动化设备、仓网规划、智能预测，助力客户数智化转型',
    ],
    image: 'inner/solutions/fresh',
    originalPath: '/freshSolution',
  },
];

export type CaseStudy = {
  id: string;
  name: string;
  /** 案例主体（官网页面 h3） */
  subject: string;
  desc: string;
  metrics: SolutionStat[];
  image: string;
  originalPath: string;
};

/** 行业案例：4 个锚点（消费品案例复用 #consumerGoods） */
export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'industrialProducts',
    name: '工业品行业',
    subject: '工业品 MRO 线上平台',
    desc: 'L 平台是基于建筑行业率先进行工业品 MRO 互联网 B2B 交易平台，为国内大型建筑企业集团提供阳光集采通道。',
    metrics: [
      { value: '8.5%', label: '订单满足率提升' },
      { value: '21%', label: '履约时效提升' },
      { value: '0→1', label: '信息化体验飞跃' },
    ],
    image: 'inner/solutions/industrial',
    originalPath: '/solution/industrialProducts',
  },
  {
    id: 'vehicle',
    name: '汽车行业',
    subject: 'W 汽车',
    desc: '面向全国仓储业务、干线调拨与区域配送，通过需求预测及智能补调、大屏看板，平衡高满足率与低库存水平。',
    metrics: [
      { value: '95.5%', label: '一次订单满足率提升' },
      { value: '35%', label: '库存金额降低' },
      { value: '55%', label: '库存周转率提升' },
      { value: '6配/周', label: '常规订单配送频次' },
    ],
    image: 'inner/solutions/car',
    originalPath: '/solution/vehicle',
  },
  {
    id: 'bigFashion',
    name: '大时尚行业',
    subject: '赫基',
    desc: '通过提升大促弹性产能、退货质检上架速度与商品翻新率，帮助品牌更快把商品送到消费者手中，提升销售额。',
    metrics: [
      { value: '20倍', label: '大促弹性产能提升' },
      { value: '24小时', label: '退货质检 + 上架' },
      { value: '80%+', label: '商品翻新率' },
      { value: '98%', label: '质检合格率' },
    ],
    image: 'inner/solutions/big-fashion',
    originalPath: '/solution/bigFashion',
  },
  {
    id: 'furnituredAppliance',
    name: '家电家居行业',
    subject: '松下正逆向一体化供应链',
    desc: '面向家电家居品牌的正逆向一体化供应链服务，覆盖仓储、配送、安装与售后备件，支撑全渠道履约。',
    metrics: [
      { value: '正逆向', label: '一体化供应链' },
      { value: '送装一体', label: '末端服务能力' },
      { value: '全渠道', label: '库存共享' },
    ],
    image: 'inner/solutions/furniture-appliance',
    originalPath: '/solution/furnituredAppliance',
  },
];

export type ValueProp = { title: string; desc: string };

/** 物流科技解决方案（导航「解决方案 · 物流科技」列，锚点 #logisticsTech） */
export const LOGISTICS_TECH_SOLUTIONS = [
  {
    name: '智能仓储',
    desc: '自研软件系统与核心智能设备，搭配算法优化、数据分析与系统仿真能力。',
    target: 'intelligentWarehouse',
  },
  {
    name: '教育产业学院',
    desc: '线上线下及产学研相融合的教育产业平台，开放亚洲一号等校外实习基地。',
    target: 'education',
  },
  {
    name: '智能物流园',
    desc: '一体化园区规划与数字化服务，帮助客户建立复杂场景履约能力。',
    target: 'intelligentPark',
  },
  {
    name: '数智化供应链',
    desc: '物流履约、供应链履约与多仓协同的一体化数字化供应链方案。',
    target: 'digitizedSupplyChain',
  },
  {
    name: '与图数智地图服务平台',
    desc: '面向供应链场景的数智地图与位置智能服务，支撑仓网规划与末端履约。',
    target: 'digitizedSupplyChain',
  },
] as const;

/** 最新案例（导航「解决方案 · 最新案例」列，锚点 #latestCases） */
export const LATEST_CASES = [
  {
    title: '一周送出一亿只粽子，百年老字号的供应链物流革新',
    tag: '消费品',
    desc: '老字号品牌借助京东物流仓配一体与柔性产能，把节令性爆发的订单稳稳接住。',
    cover: 'inner/news/cover-a',
  },
  {
    title: '冰爽 618，京东物流携手八喜实现冷链从成本中心到增长引擎',
    tag: '生鲜冷链',
    desc: '多温层仓储 + 冷链卡班 + 末端配送，让冰淇淋品类在旺季也能稳定履约。',
    cover: 'inner/news/green-a',
  },
  {
    title: '从 1 件校园白 T 到年销 25 亿，打赢服装「质价比」之战',
    tag: '服饰',
    desc: '质检、后整、正逆向一体化与仓播协同，支撑服饰品牌的高频上新与退货处理。',
    cover: 'inner/news/cover-c',
  },
] as const;


export const SOLUTION_VALUES: ValueProp[] = [
  {
    title: '数字化',
    desc: '在供应链全链路实现数据可视与智能决策，需求预测、库存计划与履约过程可追溯。',
  },
  {
    title: '可视化',
    desc: '从工厂提货、总仓/分仓到终端消费者，全链条节点清晰可见，异常可及时预警。',
  },
  {
    title: '智能化',
    desc: '自动化设备、算法优化、系统仿真与仓网规划落地应用，推动客户供应链数智化转型。',
  },
];

export const SOLUTIONS_FOOTNOTE =
  '行业方案与案例数据整理自京东物流官网公开页面，仅用于本站学习复刻演示。';
