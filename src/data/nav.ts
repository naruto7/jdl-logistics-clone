export type NavLeaf = {
  label: string;
  /** 站内跳转地址 */
  href: string;
  /** 官网原始路径，仅作对照留档 */
  originalPath?: string;
};

export type NavGroup = {
  title?: string;
  items: NavLeaf[];
};

export type NavTop = {
  label: string;
  href: string;
  /** 下拉分组；为空表示无下拉 */
  groups?: NavGroup[];
};

const A = {
  services: '/services/',
  solutions: '/solutions/',
  support: '/support/',
  esg: '/esg/',
  about: '/about/',
} as const;

/** 一级导航与其下拉结构（依据 2026-10 官网现版信息架构） */
export const TOP_NAV: NavTop[] = [
  { label: '首页', href: '/' },
  {
    label: '服务与产品',
    href: A.services,
    groups: [
      {
        title: '企业服务',
        items: [
          { label: '快递服务', href: '/services/#express', originalPath: '/express/' },
          { label: '快运服务', href: '/services/#freight', originalPath: '/freight/' },
          { label: '仓配一体', href: '/services/#supplyChain', originalPath: '/supplyChain/' },
          { label: '大件服务', href: '/services/#bulky', originalPath: '/bulky/' },
          { label: '送仓服务', href: '/services/#reachWarehouse', originalPath: '/reachWarehouse/' },
          { label: '冷链服务', href: '/services/#coldChain', originalPath: '/coldChain/' },
          { label: '医药服务', href: '/services/#medicine', originalPath: '/medicine/' },
          { label: '国际服务', href: '/services/#crossBorder', originalPath: '/crossBorder/' },
        ],
      },
      {
        title: '物流科技',
        items: [
          { label: '智能仓储', href: '/services/#intelligentWarehouse', originalPath: '/technology/intelligentWarehouse/' },
          { label: '教育产业学院', href: '/services/#education', originalPath: '/technology/education/' },
          { label: '智能物流园区', href: '/services/#intelligentPark', originalPath: '/technology/intelligentPark/' },
          { label: '数智化供应链', href: '/services/#digitizedSupplyChain', originalPath: '/technology/digitizedSupplyChain/' },
        ],
      },
      {
        title: '物流运力',
        items: [
          { label: '专线包仓', href: '/services/#dedicatedLine', originalPath: '/capacity/dedicatedLine/' },
          { label: '全货机包机', href: '/services/#fullCargo', originalPath: '/capacity/fullCargo/' },
        ],
      },
      {
        title: '京东服务',
        items: [
          { label: '安装服务', href: '/services/#install', originalPath: '/servicePlus/install/' },
          { label: '维修服务', href: '/services/#repair', originalPath: '/servicePlus/repair/' },
        ],
      },
      {
        title: '个人服务',
        items: [
          { label: '寄快递', href: '/services/#express', originalPath: '/express/' },
          { label: '京东特快', href: '/services/#jdFastest', originalPath: '/express/jdFastest/' },
          { label: '京东标快', href: '/services/#jdStandard', originalPath: '/express/jdStandard/' },
          { label: '生鲜特快', href: '/services/#freshFastest', originalPath: '/express/freshFastest/' },
          { label: '寄港澳', href: '/services/#hkmo', originalPath: '/send/sendSingleEntry/?isHKMO=1' },
          { label: '发重货', href: '/services/#heavyCargo', originalPath: '/freight/fastCargo/' },
          { label: '寄国际', href: '/services/#crossBorder', originalPath: '/crossBorder/internationalC2C/' },
          { label: '找服务', href: '/services/#findService', originalPath: '/servicePlus/' },
        ],
      },
    ],
  },
  {
    label: '解决方案',
    href: A.solutions,
    groups: [
      {
        title: '行业方案',
        items: [
          { label: '消费品', href: '/solutions/#consumerGoods', originalPath: '/consumerGoods' },
          { label: '3C', href: '/solutions/#digital', originalPath: '/digital' },
          { label: '大家居', href: '/solutions/#furnishings', originalPath: '/furnishings' },
          { label: '服饰', href: '/solutions/#dress', originalPath: '/dress' },
          { label: '家电', href: '/solutions/#homeAppliances', originalPath: '/homeAppliances' },
          { label: '汽车', href: '/solutions/#carService', originalPath: '/carService' },
          { label: '生鲜', href: '/solutions/#freshSolution', originalPath: '/freshSolution' },
        ],
      },
      {
        title: '解决方案',
        items: [
          { label: '消费品行业', href: '/solutions/#consumerGoods', originalPath: '/solution/consumerGoods' },
          { label: '工业品行业', href: '/solutions/#industrialProducts', originalPath: '/solution/industrialProducts' },
          { label: '汽车行业', href: '/solutions/#vehicle', originalPath: '/solution/vehicle' },
          { label: '大时尚行业', href: '/solutions/#bigFashion', originalPath: '/solution/bigFashion' },
          { label: '家电家居行业', href: '/solutions/#furnituredAppliance', originalPath: '/solution/furnituredAppliance' },
        ],
      },
    ],
  },
  {
    label: '服务支持',
    href: A.support,
    groups: [
      {
        title: '客户服务',
        items: [
          { label: '运单查询', href: '/support/#track' },
          { label: '时效查询', href: '/support/#eta' },
          { label: '服务范围', href: '/support/#coverage' },
          { label: '网点查询', href: '/support/#branch' },
          { label: '常见问题', href: '/support/#faq' },
          { label: '联系我们', href: '/support/#contact' },
        ],
      },
    ],
  },
  {
    label: '可持续发展',
    href: A.esg,
    groups: [
      {
        title: '可持续发展',
        items: [
          { label: 'ESG', href: '/esg/#esg', originalPath: '/esg' },
          { label: '青流计划', href: '/esg/#green', originalPath: '/green' },
          { label: '环保资讯', href: '/esg/#greenNews', originalPath: '/greenNews' },
        ],
      },
    ],
  },
  {
    label: '关于京东物流',
    href: A.about,
    groups: [
      {
        title: '关于我们',
        items: [
          { label: '企业介绍', href: '/about/#profile', originalPath: '/profile/' },
          { label: '新闻中心', href: '/about/#news', originalPath: '/news/list' },
          { label: '视频中心', href: '/about/#videos', originalPath: '/videos' },
          { label: '联系我们', href: '/about/#contact', originalPath: '/contactUs' },
        ],
      },
    ],
  },
];

/** 顶部条右侧的辅助导航 */
export const UTILITY_NAV = [
  { label: '集团网站', href: '/about/#group' },
  { label: '简体中文', href: '/about/#lang' },
  { label: '登录', href: '/support/#login' },
] as const;
