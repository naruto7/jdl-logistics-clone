import type { AnchorLink, NavItem, PageHeroContent } from './types';

/**
 * 服务与产品页数据。
 *
 * 文案来源：2026-10 抓取 jdl.com 对应产品页正文（qa/inner-scrape/*.json 留档），
 * 只做删减与结构化，不新增与官网冲突的数字。
 */
export const SERVICES_HERO: PageHeroContent = {
  eyebrow: '服务与产品',
  title: '服务与产品',
  subtitle:
    '覆盖企业供应链与个人寄递的全场景物流服务：快递、快运、仓配一体、大件、送仓、冷链、医药、国际物流，以及物流科技与运力资源。',
  crumbs: [{ label: '首页', href: '/' }, { label: '服务与产品' }],
  image: 'inner/services/hero-express',
  tone: 'brand',
  stats: [
    { value: '3600+', label: '京东物流仓库数量' },
    { value: '3400万㎡', label: '仓库总管理面积' },
    { value: '25个', label: '海外仓覆盖国家和地区' },
    { value: '950616', label: '全国统一客服热线' },
  ],
};

/** 服务与产品页顶部固定页内导航 */
export const SERVICES_NAV: NavItem[] = [
  { id: 'service-enterprise', label: '企业服务' },
  { id: 'service-technology', label: '物流科技' },
  { id: 'service-capacity', label: '物流运力' },
  { id: 'service-plus', label: '京东服务' },
  { id: 'service-personal', label: '个人服务' },
  { id: 'findService', label: '找服务' },
];

export type ServiceGroup = {
  id: string;
  title: string;
  subtitle: string;
  items: AnchorLink[];
};

/** 企业服务：8 个一级服务，对应 nav.ts 前 8 个锚点 */
const ENTERPRISE: AnchorLink[] = [
  {
    id: 'express',
    name: '快递服务',
    tag: '企业服务',
    desc: '为您提供安全可靠、时效领先、温暖贴心的快递服务体验，同时可享多种专业化的增值服务。',
    points: [
      '最快 1 小时上门揽收，支持预约时间揽收',
      '门到门递送，同时提供便捷、智能的自提服务',
      '时效型、经济型产品组合，可叠加保价、京尊达等增值服务',
      '全国统一热线 950616，售前、售中、售后专业客服团队',
    ],
    metric: { value: '1小时', label: '最快上门揽收' },
    image: 'inner/services/express',
    originalPath: '/express/',
  },
  {
    id: 'freight',
    name: '快运服务',
    tag: '企业服务',
    desc: '京东快运聚焦 15KG 以上的大件重货市场，为您在全国范围内提供快捷、安全的高品质陆运运输服务。',
    points: [
      '全国 13 万条线路流向，覆盖 90%+ 的地址',
      '丰富网络资源，承诺时效内送达',
      '15KG+ 大件运输，3000KG+ 重货运输',
      '多项增值服务，可覆盖百种行业服务需求',
    ],
    metric: { value: '13万条', label: '全国线路流向' },
    image: 'inner/services/freight',
    originalPath: '/freight/',
  },
  {
    id: 'supplyChain',
    name: '仓配一体',
    tag: '企业服务',
    desc: '以京仓/云仓 + 京配/云配服务不同需求客户，为电商与平台商家提供高品质、高性价比的仓配一体物流服务。',
    points: [
      '全国超 1500 个自营管理仓库，3000+ 万㎡ 仓储面积',
      '350+ 个全国合作仓源，配送范围覆盖全国 2800+ 区县',
      '全国统一标准化库内运营，智能化设备应用',
      '十五年大促运营经验，保障商家 10 倍+ 高弹性订单',
    ],
    metric: { value: '1500+', label: '自营管理仓库' },
    image: 'inner/services/supply-chain',
    originalPath: '/supplyChain/',
  },
  {
    id: 'bulky',
    name: '大件服务',
    tag: '企业服务',
    desc: '面向家电、家居、电动车、健身器材行业，提供全渠道正、逆向全链路一体化的仓 & 配供应链服务。',
    points: [
      '送装拆收一体化：仓配装拆收，能力全面且多样',
      '全托管、按约送达，100% 区县覆盖',
      '满足仓配一体、送装一体、正逆一体的供应链需求',
      '大件商务仓、标准宅配、商务仓仓配家电、备件仓多产品组合',
    ],
    metric: { value: '100%', label: '区县覆盖' },
    image: 'inner/services/bulky',
    originalPath: '/bulky/',
  },
  {
    id: 'reachWarehouse',
    name: '送仓服务',
    tag: '企业服务',
    desc: '为企业客户提供从货源地到收货仓之间的收货、暂存、分仓调度、运输、送仓、退仓一体化供应链物流服务。',
    points: [
      '90 多个转运中心辐射全国，一地提货、多地多平台送仓',
      '卡班运输网络，当天送仓当天上架，支持多平台限时达',
      '京东仓专属通道：优先卸货、验货、上架',
      '特快到仓、极速到仓、大票直送、整车专送多产品矩阵',
    ],
    metric: { value: '90+', label: '转运中心辐射全国' },
    image: 'inner/services/warehouse',
    originalPath: '/reachWarehouse/',
  },
  {
    id: 'coldChain',
    name: '冷链服务',
    tag: '企业服务',
    desc: '仓配一体、全场景覆盖的冷链服务，智能温控、全流程可视，为客户提供合规专业、安全高效的多温层履约。',
    points: [
      '40+ 城市仓网布局，冷仓面积 400000㎡',
      '覆盖 290+ 城市、30000+ 运输线路',
      '生鲜仓储 211、冷链卡班、生鲜到仓、冷链城配、冷链整车',
      '多地入仓、社会化协同，专属定制一站式托付',
    ],
    metric: { value: '290+', label: '冷链覆盖城市' },
    image: 'inner/services/cold-chain',
    originalPath: '/coldChain/',
  },
  {
    id: 'medicine',
    name: '医药服务',
    tag: '企业服务',
    desc: '依托覆盖全国的仓配资源与全程追溯控温的数字化能力，为受国家药监监管的医药行业提供专业解决方案。',
    points: [
      '质量安全：高标准医药质量要求，100% 合规',
      '全链路服务：商流助力，打造商流物流全链路能力',
      '数智化能力：源头可溯、全程可视',
      '合规资源覆盖：末端可触达 300+ 个城市',
    ],
    metric: { value: '300+', label: '末端可触达城市' },
    image: 'inner/services/medicine',
    originalPath: '/medicine/',
  },
  {
    id: 'crossBorder',
    name: '国际服务',
    tag: '企业服务',
    desc: '助力中国制造和中国品牌一站出海，并为全球客户提供优质、高效、全面的一体化供应链解决方案。',
    points: [
      '全球近 90 个保税仓库、直邮仓库和海外仓库，总面积近 90 万平方米',
      '丰富的跨境 2B 与 2C 端到端产品',
      '海外仓配、跨境端到端、进口保税、进口直邮',
      '国际运输、出口专线与国际快递',
    ],
    metric: { value: '近90个', label: '保税/直邮/海外仓' },
    image: 'inner/services/cross-border',
    originalPath: '/crossBorder/',
  },
];

/** 物流科技：4 个锚点 */
const TECHNOLOGY: AnchorLink[] = [
  {
    id: 'intelligentWarehouse',
    name: '智能仓储',
    tag: '物流科技',
    desc: '京东物流自主研发的软件系统与核心智能设备，搭配算法优化、数据分析和系统仿真能力，为多行业提供智能仓储一站式解决方案。',
    points: [
      '自主研发：软件系统与核心智能设备',
      '专业能力：算法优化、数据分析、系统仿真',
      '资源丰富：丰富的渠道代理资源',
      '集成融合 + 实施保障，覆盖项目全周期',
    ],
    image: 'inner/services/intelligent-warehouse',
    originalPath: '/technology/intelligentWarehouse/',
  },
  {
    id: 'education',
    name: '教育产业学院',
    tag: '物流科技',
    desc: '京东物流以实践为基础，通过技术、平台和生态，打造线上、线下及产学研相融合的教育产业平台。',
    points: [
      '多样化场景：生产型实训实战、职业化科普实验基地',
      '资源共享：开放亚洲一号智能产业园等校外实习基地',
      '专业群数字化升级咨询与人才培养方案修订',
      '支持院校国际交流与合作',
    ],
    image: 'inner/services/education',
    originalPath: '/technology/education/',
  },
  {
    id: 'intelligentPark',
    name: '智能物流园区',
    tag: '物流科技',
    desc: '融合新技术与京东物流核心管理调度能力，提供一体化园区规划与数字化服务，帮助客户降本增效。',
    points: [
      '科学仓储规划与专业运营流程设计',
      '数字化、自动化能力应用',
      '集成融合：多货主管理和多仓调度核心能力',
      '伴随式服务，支撑客户建立复杂场景履约能力',
    ],
    image: 'inner/services/intelligent-park',
    originalPath: '/technology/intelligentPark/',
  },
  {
    id: 'digitizedSupplyChain',
    name: '数智化供应链',
    tag: '物流科技',
    desc: '以供应链管理优化为目标，提供物流履约、供应链履约与多仓协同的一体化数字化供应链解决方案。',
    points: [
      '物流履约方案：基于 OTWB 自研产品构建一体化方案',
      '供应链履约方案：零部件采购与售后备件一体化',
      '多仓协同方案：以供应链控制中台为核心',
      '供应链战略规划、网络优化与咨询能力',
    ],
    image: 'inner/services/digitized-supply-chain',
    originalPath: '/technology/digitizedSupplyChain/',
  },
];

/** 物流运力：2 个锚点 */
const CAPACITY: AnchorLink[] = [
  {
    id: 'dedicatedLine',
    name: '专线包仓',
    tag: '物流运力',
    desc: '基于京东物流公铁航运输线路仓位资源能力，为您提供时效稳定、安全可靠、省心省钱、服务周到的货物集拼整仓发运服务。',
    points: [
      '稳定的运输时效：卡班网络运输时效，全年稳定',
      '多种运输方式：公路、铁路和航空低载空仓资源可匹配',
      '直提直送无中转：一车提派直发，无中转和二次装卸',
      '高性价比：整车、零担与计划性、临时性多场景满足',
    ],
    image: 'inner/services/dedicated-line',
    originalPath: '/capacity/dedicatedLine/',
  },
  {
    id: 'fullCargo',
    name: '全货机包机',
    tag: '物流运力',
    desc: '为您提供包机、包板和包舱服务，航线覆盖国内与国际，满足不同规模企业的航空货运需求。',
    points: [
      '服务模式：整机包机、包板与腹舱包舱',
      '产品类型：港到港、门到门',
      '货物类型：普货与特种货物',
      '航班时段：全天候，提供长期定期或临时服务',
    ],
    image: 'inner/services/full-cargo',
    originalPath: '/capacity/fullCargo/',
  },
];

/** 京东服务：2 个锚点 */
const SERVICE_PLUS: AnchorLink[] = [
  {
    id: 'install',
    name: '安装服务',
    tag: '京东服务',
    desc: '为您提供家电家居安装服务和充电桩安装服务，送装一体、安装透明、售后有保障。',
    points: [
      '全国覆盖：31 个服务管理中心、300+ 城市、2800+ 区县',
      '一站式服务：送装一体，送装拆收、拆装清',
      '尊享售后：满意再付款，多收费双倍赔',
      '极致服务：365 天全年保障，一客一群管家式服务',
    ],
    metric: { value: '2800+', label: '服务覆盖区县' },
    image: 'inner/services/install',
    originalPath: '/servicePlus/install/',
  },
  {
    id: 'repair',
    name: '维修服务',
    tag: '京东服务',
    desc: '提供家庭维修和 3C 维修服务，响应快、上门快、修好快、收费准。',
    points: [
      '家庭维修 10S 响应、2h 上门，一次解决率 90%',
      '3C 维修 5min 响应、当天上门，一次解决率 95%',
      '家庭维修计价器满意付，3C 维修一口价',
      '全国 8 大寄修中心与 31 个服务管理中心支撑',
    ],
    metric: { value: '95%', label: '3C 维修一次解决率' },
    image: 'inner/services/repair',
    originalPath: '/servicePlus/repair/',
  },
];

/** 个人服务：6 个锚点（含找服务入口） */
const PERSONAL: AnchorLink[] = [
  {
    id: 'jdFastest',
    name: '京东特快',
    tag: '个人服务',
    desc: '优先派送、单独交接，同城最快当日达、跨省最快次晨达，晚到必赔。',
    points: [
      '优先派送、单独交接，时效领先',
      '全程物流轨迹跟踪，大促期间履约波动小',
      '1 小时上门，一单到底专人跟进，准时派送、晚到必赔',
      '送货上门、超时可退费、24h 理赔',
    ],
    image: 'inner/services/jd-fastest',
    originalPath: '/express/jdFastest/',
  },
  {
    id: 'jdStandard',
    name: '京东标快',
    tag: '个人服务',
    desc: '为您提供时效稳定、安全可靠、性价比高的高品质门到门寄递服务。',
    points: [
      '全网覆盖：中国大陆全境覆盖（含港澳地区）',
      '全年无休，连续十余年春节不打烊',
      'C 端 1 小时揽收，派送送货上门',
      '支持保价、代收货款等多种增值服务',
    ],
    image: 'inner/services/jd-standard',
    originalPath: '/express/jdStandard/',
  },
  {
    id: 'freshFastest',
    name: '生鲜特快',
    tag: '个人服务',
    desc: '速度快、时效稳、高品质、多温层的门到门生鲜专属寄递包装服务。',
    points: [
      '核心城市今日寄、明日到，专属运力保障快速交付',
      '生鲜贴纸、优先派送、禁止投柜等专项保障',
      '专属生鲜理赔标准，保价 24 小时内快速定责赔付',
      '专业包装方案，最大限度保证产品新鲜送达',
    ],
    image: 'inner/services/fresh-fastest',
    originalPath: '/express/freshFastest/',
  },
  {
    id: 'hkmo',
    name: '寄港澳',
    tag: '个人服务',
    desc: '京东标快覆盖中国大陆全境（含港澳地区），港澳寄递可拨打专属咨询电话。',
    points: [
      '港澳地区纳入京东标快覆盖范围',
      '香港咨询：（852）25949618',
      '澳门咨询：（853）28528618',
      '全年无休，节假日正常运营',
    ],
    image: 'inner/services/cross-border',
    originalPath: '/send/sendSingleEntry/?isHKMO=1',
  },
  {
    id: 'heavyCargo',
    name: '发重货',
    tag: '个人服务',
    desc: '主打单票 15KG+ 大件运输服务，满足个人发运、个人售后逆向、电商发件、门店调拨与工厂批量件场景。',
    points: [
      '同省次日、经济圈次日、跨省隔日',
      '2 小时上门、准时派送',
      '100% 上门送货、时效承诺送到',
      '计费简洁，采用首续重计价',
    ],
    image: 'inner/services/heavy-cargo',
    originalPath: '/freight/fastCargo/',
  },
  {
    id: 'findService',
    name: '找服务',
    tag: '个人服务',
    desc: '京东服务+ 聚焦 3C、家电、家居三大领域，提供安装、维修、清洗、保养等高品质服务。',
    points: [
      '多元化网络能力：多层级服务网络、全品类覆盖',
      '高标准质控体系：服务雷达系统管控服务质量',
      '技术赋能：以技术驱动服务发展',
      '专属客服体系：售前、售中、售后管理',
    ],
    image: 'inner/services/cleaning',
    originalPath: '/servicePlus/',
  },
];

export const SERVICE_GROUPS: ServiceGroup[] = [
  {
    id: 'service-enterprise',
    title: '企业服务',
    subtitle: '面向企业客户的全链路供应链物流能力，从揽收到送仓、从常温到冷链、从国内到国际。',
    items: ENTERPRISE,
  },
  {
    id: 'service-technology',
    title: '物流科技',
    subtitle: '数字化、智能化、软硬件一体化的物流科技产品与解决方案，推动高效协同的生态赋能。',
    items: TECHNOLOGY,
  },
  {
    id: 'service-capacity',
    title: '物流运力',
    subtitle: '公铁航多式联运的运力资源池，为货主提供时效稳定、安全可靠的仓位与包机服务。',
    items: CAPACITY,
  },
  {
    id: 'service-plus',
    title: '京东服务',
    subtitle: '「好服务 为生活加分」：安装、维修、清洗、保养，一体化、快速、安全、省心、透明。',
    items: SERVICE_PLUS,
  },
  {
    id: 'service-personal',
    title: '个人服务',
    subtitle: '寄快递、发重货、寄生鲜、寄港澳、找服务，个人寄递需求一站直达。',
    items: PERSONAL,
  },
];

/** 页尾通用提示 */
export const SERVICES_FOOTNOTE =
  '本页服务能力描述整理自京东物流官网对应产品页；具体可服务范围、价格与时效以官方渠道实时信息为准。';
