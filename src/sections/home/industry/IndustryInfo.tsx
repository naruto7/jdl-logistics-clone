import type { IndustryItem } from './data';

/**
 * 左侧行业信息块（官网实测：内容 x=264 起、宽 913，上下 164px）
 *
 * 排版还原官网 .industry-info：
 * - 标题 23.04px / 600 / 行高 32.4，下边距 4.32
 * - 描述 14.4px / 行高 20.16，固定宽 302.4（保证 3 行折行与官网一致），下边距 18
 * - feature 列表 11.52px / 行高 1.5，每项上下 padding 3.6，行首红点见 industry.css
 *
 * 切换行业时用 key 强制重挂载，重放与官网一致的 slideUp 淡入（延迟 0.1 / 0.15 / 0.25s）。
 */
export function IndustryInfo({ item }: { item: IndustryItem }) {
  return (
    <div className="px-[34.56px] text-white">
      <div key={item.key}>
        <h3
          className="industry-slide-up mb-[4.32px] text-[23.04px] font-semibold leading-[32.4px] text-white"
          style={{ animationDelay: '0.1s' }}
        >
          {item.name}
        </h3>
        <p
          className="industry-desc industry-slide-up mb-[18px] w-[302.4px] text-[14.4px] font-normal leading-[20.16px] text-white"
          style={{ animationDelay: '0.15s' }}
        >
          {item.desc}
        </p>
        <ul className="industry-slide-up" style={{ animationDelay: '0.25s' }}>
          {item.features.map((feature) => (
            <li key={feature} className="industry-feature py-[3.6px] text-[11.52px] leading-[1.5] text-white">
              {/* 官网源码行内换行会在 ::before 圆点后残留一个空格，这里显式保留以对齐 3px 间距 */}
              {' '}
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
