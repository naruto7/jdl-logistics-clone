/**
 * 站点导航数据（依据 2026-10 官网现版信息架构，结构经 DOM 实测还原）。
 *
 * 说明：官网一级栏目为独立页面；本站复刻范围是「首页 + 5 个一级栏目落地页」，
 * 因此二级/三级链接统一映射到对应落地页的锚点，保证「零死链」，
 * 同时用 originalPath 保留官网原始路径，便于核对与后续扩展。
 */

export type NavLink = {
  label: string;
  /** 站内地址（落地页锚点） */
  href: string;
  /** 官网原始路径，仅留档 */
  originalPath?: string;
  /** 三级链接（官网 mega menu 中带 · 的子项） */
  children?: NavLink[];
};

export type NavColumn = {
  title: string;
  /** 列标题左侧图标（src/assets 下逻辑名） */
  icon?: string;
  links: NavLink[];
};

/** 服务与产品：左侧竖向 tab 切换「企业服务 / 个人服务」两套栏目 */
export type NavTab = { label: string; columns: NavColumn[] };

export type NavMenu = { tabs?: NavTab[]; columns?: NavColumn[] };

export type NavTop = {
  label: string;
  href: string;
  menu?: NavMenu;
};

const U = {
  services: '/services/',
  solutions: '/solutions/',
  support: '/support/',
  esg: '/esg/',
  about: '/about/',
} as const;

const link = (label: string, href: string, originalPath?: string, children?: NavLink[]): NavLink => ({
  label,
  href,
  originalPath,
  children,
});

export const TOP_NAV: NavTop[] = [
  { label: '首页', href: '/' },
  {
    label: '服务与产品',
    href: U.services,
    menu: {
      tabs: [
        {
          label: '企业服务',
          columns: [
            {
              title: '物流服务',
              icon: 'ui/icon-express.svg',
              links: [
                link('快递服务', '/services/#express', '/express/'),
                link('快运服务', '/services/#freight', '/freight/'),
                link('仓配一体', '/services/#supplyChain', '/supplyChain/'),
                link('大件服务', '/services/#bulky', '/bulky/'),
                link('送仓服务', '/services/#reachWarehouse', '/reachWarehouse/'),
                link('冷链服务', '/services/#coldChain', '/coldChain/'),
                link('医药服务', '/services/#medicine', '/medicine/'),
                link('国际服务', '/services/#crossBorder', '/crossBorder/'),
              ],
            },
            {
              title: '物流科技',
              links: [
                link('物流机器人', '/services/#intelligentWarehouse', '/technology/intelligentWarehouse/', [
                  link('京东物流智狼(标准版)', '/services/#intelligentWarehouse'),
                  link('京东物流智狼(扩展版)', '/services/#intelligentWarehouse'),
                  link('京东物流智狼(穿梭版)', '/services/#intelligentWarehouse'),
                  link('京东物流天狼(四向版)', '/services/#intelligentWarehouse'),
                  link('京东物流地狼', '/services/#intelligentWarehouse'),
                  link('京东物流自动分播墙', '/services/#intelligentWarehouse'),
                ]),
                link('数智供应链', '/services/#digitizedSupplyChain', undefined, [
                  link('智能园区管理系统', '/services/#intelligentPark'),
                  link('供应链履约系统', '/services/#digitizedSupplyChain'),
                  link('视觉分析系统(视能方)', '/services/#digitizedSupplyChain'),
                  link('3D SCADA系统', '/services/#digitizedSupplyChain'),
                  link('爱咚移动数据终端', '/services/#digitizedSupplyChain'),
                ]),
                link('低碳供应链', '/services/#digitizedSupplyChain', undefined, [
                  link('京碳惠SCEMP', '/services/#digitizedSupplyChain'),
                ]),
              ],
            },
            {
              title: '物流运力',
              links: [
                link('专线包仓', '/services/#dedicatedLine', '/capacity/dedicatedLine/'),
                link('全货机包机', '/services/#fullCargo', '/capacity/fullCargo/'),
              ],
            },
            {
              title: '增值服务',
              icon: 'ui/icon-chain.svg',
              links: [
                link('快递', '/services/#express', '/express/addValueService/'),
                link('快运', '/services/#freight', '/freight/addValueService/'),
                link('仓配一体', '/services/#supplyChain', '/supplyChain/addValueService/'),
                link('大件', '/services/#bulky', '/bulky/addValueService/'),
                link('送仓', '/services/#reachWarehouse', '/reachWarehouse/addValueService/'),
                link('冷链', '/services/#coldChain', '/coldChain/addValueService/'),
                link('医药', '/services/#medicine', '/medicine/addValueService/'),
              ],
            },
            {
              title: '京东服务',
              icon: 'ui/icon-service.svg',
              links: [
                link('安装服务', '/services/#install', '/servicePlus/install/'),
                link('维修服务', '/services/#repair', '/servicePlus/repair/'),
                link('机器人服务', '/services/#intelligentWarehouse'),
              ],
            },
          ],
        },
        {
          label: '个人服务',
          columns: [
            {
              title: '寄快递',
              links: [
                link('京东特快', '/services/#jdFastest', '/express/jdFastest/'),
                link('京东标快', '/services/#jdStandard', '/express/jdStandard/'),
                link('生鲜特快', '/services/#freshFastest', '/express/freshFastest/'),
                link('生鲜标快', '/services/#freshFastest', '/express/freshStandard/'),
                link('送同城', '/services/#hkmo', '/express/sameCity/'),
                link('增值服务', '/services/#express', '/express/addValueService/'),
              ],
            },
            {
              title: '发重货',
              links: [
                link('重货标快', '/services/#heavyCargo', '/freight/fastCargo/'),
                link('整车直达', '/services/#heavyCargo', '/freight/completeVehicle/'),
                link('增值服务', '/services/#freight', '/freight/addValueService/'),
              ],
            },
            {
              title: '寄国际',
              links: [link('国际快递', '/services/#crossBorder', '/crossBorder/internationalC2C/')],
            },
            {
              title: '找服务',
              links: [
                link('安装服务', '/services/#install', '/servicePlus/install/'),
                link('维修服务', '/services/#repair', '/servicePlus/repair/'),
                link('清洗服务', '/services/#findService', '/servicePlus/cleaning/'),
              ],
            },
          ],
        },
      ],
    },
  },
  {
    label: '解决方案',
    href: U.solutions,
    menu: {
      columns: [
        {
          title: '行业解决方案',
          links: [
            link('消费品', '/solutions/#consumerGoods', '/consumerGoods'),
            link('3C', '/solutions/#digital', '/digital'),
            link('大家居', '/solutions/#furnishings', '/furnishings'),
            link('服饰', '/solutions/#dress', '/dress'),
            link('家电', '/solutions/#homeAppliances', '/homeAppliances'),
            link('汽车', '/solutions/#carService', '/carService'),
            link('生鲜', '/solutions/#freshSolution', '/freshSolution'),
          ],
        },
        {
          title: '物流科技',
          links: [
            link('智能仓储', '/solutions/#logisticsTech', '/technology/intelligentWarehouse/'),
            link('教育产业学院', '/solutions/#logisticsTech', '/technology/education/'),
            link('智能物流园', '/solutions/#logisticsTech', '/technology/intelligentPark/'),
            link('数智化供应链', '/solutions/#logisticsTech', '/technology/digitizedSupplyChain/'),
            link('与图数智地图服务平台', '/solutions/#logisticsTech'),
          ],
        },
        {
          title: '成功案例',
          links: [
            link('消费品行业', '/solutions/#consumerGoods', '/solution/consumerGoods'),
            link('工业品行业', '/solutions/#industrialProducts', '/solution/industrialProducts'),
            link('汽车行业', '/solutions/#vehicle', '/solution/vehicle'),
            link('大时尚行业', '/solutions/#bigFashion', '/solution/bigFashion'),
            link('家电家居行业', '/solutions/#furnituredAppliance', '/solution/furnituredAppliance'),
          ],
        },
        {
          title: '最新案例',
          links: [
            link('一周送出一亿只粽子，百年老字号的供应链物流革新', '/solutions/#latestCases'),
            link('冰爽618，京东物流携手八喜实现冷链从成本中心到增长引擎', '/solutions/#latestCases'),
            link('从1件校园白T到年销25亿，打赢服装“质价比”之战', '/solutions/#latestCases'),
          ],
        },
      ],
    },
  },
  {
    label: '服务支持',
    href: U.support,
    menu: {
      columns: [
        {
          title: '寄件服务',
          links: [
            link('个人寄件', '/support/#track'),
            link('批量下单（寄快递）', '/support/#track'),
            link('批量下单（发重货）', '/support/#track'),
            link('批量下单（寄生鲜）', '/support/#track'),
          ],
        },
        {
          title: '查询服务',
          links: [
            link('运单查询', '/support/#track'),
            link('运费时效查询', '/support/#eta'),
            link('网点查询', '/support/#branch'),
            link('服务范围查询', '/support/#coverage'),
            link('通关服务', '/support/#coverage'),
            link('送货入仓地址查询', '/support/#coverage'),
            link('打木架城市查询', '/support/#coverage'),
          ],
        },
        {
          title: '商家服务',
          links: [
            link('电子合同签约', '/support/#merchant'),
            link('商家工作台', '/support/#login'),
            link('开放平台', '/support/#merchant'),
            link('开通月结', '/support/#merchant'),
            link('物流合作', '/support/#contact'),
          ],
        },
        {
          title: '更多',
          links: [
            link('服务细则', '/support/#faq'),
            link('京东服务（维修 安装）', '/support/#faq'),
            link('商家优惠通道', '/support/#merchant'),
          ],
        },
      ],
    },
  },
  {
    label: '可持续发展',
    href: U.esg,
    menu: {
      columns: [
        {
          title: 'ESG',
          links: [
            link('我们的承诺', '/esg/#esg', '/esg'),
            link('我们的行动 - 环境', '/esg/#green'),
            link('我们的行动 - 社会', '/esg/#green'),
            link('我们的行动 - 治理', '/esg/#esg'),
          ],
        },
        { title: '青流计划', links: [link('青流计划', '/esg/#green', '/green')] },
        { title: '环保资讯', links: [link('环保资讯', '/esg/#greenNews', '/greenNews')] },
        { title: '合作咨询', links: [link('合作咨询', '/esg/#contact')] },
      ],
    },
  },
  {
    label: '关于京东物流',
    href: U.about,
    menu: {
      columns: [
        {
          title: '关于我们',
          links: [
            link('企业介绍', '/about/#profile', '/profile/'),
            link('新闻中心', '/about/#news', '/news/list'),
            link('视频中心', '/about/#videos', '/videos'),
            link('投资者关系', '/about/#investor'),
            link('联系我们', '/about/#contact', '/contactUs'),
            link('招贤纳士', '/about/#jobs'),
          ],
        },
      ],
    },
  },
];

/** 顶部黑色条右侧辅助导航（实测：12.48px 白色文字，带下拉箭头） */
export const UTILITY_NAV = [
  { label: '集团网站', href: '/about/#group', withArrow: true },
  { label: '简体中文', href: '/about/#lang', withArrow: true },
  { label: '登录', href: '/support/#login', withArrow: false },
] as const;
