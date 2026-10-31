/**
 * 物流网络区（network）静态数据
 *
 * 数值口径全部来自 jdl.com 实测（spec/key-rects.json + 官网源 CSS）：
 * - 数字 36px JDZhengHT #FC3737，单位标签 14.4px #23252B，说明 11.52px / 行高 1.5
 * - 4 组统计：6 大网络 / 3,600 个 / 3,400 万平方米 / 25 个
 *
 * 数字滚动动画的数字被拆成「逐位数字」（digits）+「静态后缀」（suffix）：
 * 例如 3,600 的千位 3 是滚动的，",600" 是静态后缀，这样滚动时只有首位在动。
 */
export type NetworkStat = {
  /** 逐位目标数字，如 [2, 5] 表示 25（两位分别滚动） */
  digits: number[];
  /** 不参与滚动的静态后缀（千分位 + 后几位），没有则不渲染 */
  suffix?: string;
  /** 数字右侧的单位标签（14.4px 深灰），如「个」「万平方米」「大网络」 */
  unit: string;
  /** 数字下方的说明文案（11.52px，最多两行） */
  detail: string;
};

export const NETWORK_STATS: NetworkStat[] = [
  {
    digits: [6],
    unit: '大网络',
    detail: '仓储网络、综合运输网络、最后一公里配送网络、大件网络、冷链物流网络和跨境物流网络',
  },
  {
    digits: [3],
    suffix: ',600',
    unit: '个',
    detail: '京东物流已拥有超3600个仓库',
  },
  {
    digits: [3],
    suffix: ',400',
    unit: '万平方米',
    detail: '仓库总管理面积超3400万平方米',
  },
  {
    digits: [2, 5],
    unit: '个',
    detail: '京东物流海外仓已覆盖全球25个国家和地区',
  },
];

/** 右侧 4 个圆形特性按钮：113.04px 圆，图标 25.92px，白字 11.52px */
export type NetworkFeature = {
  /** 图标逻辑名（src/assets 下） */
  icon: string;
  /** 按钮文字 */
  name: string;
};

export const NETWORK_FEATURES: NetworkFeature[] = [
  { icon: 'network/icon-earth.png', name: '全网覆盖' },
  { icon: 'network/icon-menu.png', name: '数实融合' },
  { icon: 'network/icon-chain.png', name: '全链共生' },
  { icon: 'network/icon-time.png', name: '7X24小时服务' },
];
