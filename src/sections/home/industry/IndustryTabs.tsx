import type { KeyboardEvent } from 'react';
import { asset } from '@/lib/assets';
import { INDUSTRIES } from './data';

interface IndustryTabsProps {
  /** 当前选中的行业下标 */
  activeIndex: number;
  /** 点击未选中 tab 时切换行业 */
  onSelect: (index: number) => void;
}

/** 键盘触发切换：Enter / Space 等价于点击 */
function isActivationKey(event: KeyboardEvent<HTMLDivElement>): boolean {
  return event.key === 'Enter' || event.key === ' ';
}

/**
 * 底部行业 tab 条（官网实测：绝对定位 x=229、y=1530、982x70，距 section 底 89.28）
 *
 * 每个 tab 162.24x69.84 玻璃态白底（rgba(255,255,255,.7)、圆角 2.88、间距 0.72）：
 * - 未选中：居中展示 17.28px / 600 的行业名，点击（或键盘激活）整块 tab 切换行业；
 * - 选中：展示 162x100.8 的红色渐变卡（72px 图标上溢 25.2px + 「了解更多 >」），
 *   卡片整体上下各溢出 tab 15.48px，与官网一致；整卡即「了解更多」落地页链接。
 */
export function IndustryTabs({ activeIndex, onSelect }: IndustryTabsProps) {
  return (
    <div
      className="absolute bottom-[89.28px] left-1/2 z-10 flex w-[982px] max-w-[calc(100%-24px)] -translate-x-1/2"
      role="tablist"
      aria-label="热门行业解决方案"
    >
      {INDUSTRIES.map((item, index) => {
        const active = index === activeIndex;
        return (
          <div
            key={item.key}
            role="tab"
            aria-selected={active}
            tabIndex={0}
            data-qa={`industry-tab-${index}`}
            onClick={() => onSelect(index)}
            onKeyDown={(event) => {
              if (!isActivationKey(event)) return;
              event.preventDefault();
              onSelect(index);
            }}
            className={`industry-tab-item ${active ? 'is-active' : ''}`}
          >
            <a
              href={item.href}
              className={`industry-tab-card ${active ? 'is-active' : ''}`}
              tabIndex={active ? 0 : -1}
              aria-hidden={!active}
              aria-label={`了解更多：${item.name}行业解决方案`}
            >
              <img src={asset(item.icon)} alt="" className="industry-tab-icon" />
              <div className="industry-tab-more">了解更多</div>
            </a>
            <span className="industry-tab-name">{item.name}</span>
          </div>
        );
      })}
    </div>
  );
}
