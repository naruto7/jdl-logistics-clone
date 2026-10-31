import { NETWORK_STATS, type NetworkStat } from './data';
import { NumberRoll } from './NumberRoll';

/**
 * 单条统计：数字行（滚动数字 + 单位）+ 说明行。
 *
 * 官网实测（1440 视口）：
 * - .number 为 flex + align-items:baseline，高 43.2px，数字 36px JDZhengHT #FC3737，gap 5.76px
 * - 数字前有一个空的 .desc 占位（官网 DOM 里确实存在，会产生一段 gap，必须保留才能像素级对齐）
 * - 单位标签 14.4px #23252B PingFang（flex 子项会被块级化）
 * - .detail 11.52px / line-height 1.5 / #23252B，容器宽 374.4px（首条文案折成两行）
 * - 每条间距 margin-bottom 18px
 */
function NetworkStatItem({ stat, active }: { stat: NetworkStat; active: boolean }) {
  return (
    <div style={{ marginBottom: 18 }}>
      {/* 数字行 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          height: 43.2,
          gap: 5.76,
          color: '#fc3737',
          fontFamily: 'var(--font-num)',
          fontSize: 36,
          lineHeight: 1,
        }}
      >
        {/* 官网 DOM 里的前置空 .desc 占位，保留以复现数字起始 x 位置 */}
        <span style={{ color: '#23252b', fontFamily: 'var(--font-body)', fontSize: 14.4 }} />
        <NumberRoll digits={stat.digits} suffix={stat.suffix} active={active} />
        <span style={{ color: '#23252b', fontFamily: 'var(--font-body)', fontSize: 14.4 }}>{stat.unit}</span>
      </div>
      {/* 说明行 */}
      <div style={{ color: '#23252b', fontFamily: 'var(--font-body)', fontSize: 11.52, lineHeight: 1.5 }}>
        {stat.detail}
      </div>
    </div>
  );
}

/**
 * 左侧统计列：4 组数据。
 * 官网 .statistics 为 max-width:374.4px + position:relative + z-index:1，
 * 使折行宽度固定为 374.4px（1320 版心 982px 的左列宽度）。
 */
export function NetworkStats({ active }: { active: boolean }) {
  return (
    <div className="relative z-[1] w-full max-w-[374.4px] max-[1023px]:max-w-none">
      {NETWORK_STATS.map((stat) => (
        <NetworkStatItem key={stat.detail} stat={stat} active={active} />
      ))}
    </div>
  );
}
