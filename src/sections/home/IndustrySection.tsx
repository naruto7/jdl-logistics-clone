import { useCallback, useState } from 'react';
import { asset } from '@/lib/assets';
import { INDUSTRIES } from './industry/data';
import { IndustryInfo } from './industry/IndustryInfo';
import { IndustryTabs } from './industry/IndustryTabs';
import './industry/industry.css';

/**
 * 首页第 3 区：热门行业解决方案（官网实测 y=1185 / h=504，1440x900 基准）
 *
 * DOM 结构对齐官网 .industry-solutions：
 * - 整幅背景大图（cover + center，左深右亮的渐变已烘焙在图片里，无需额外遮罩），padding-top 43.2
 * - 居中标题「热门行业解决方案」：FZLTDHK 25.92px + 两侧 17.28x1.44 的 #f10215 短横线
 * - 副标题：14.4px 白色 80%（上边距 -11.52，与标题下边距 18.72 折叠后间距 7.2）
 * - 982 版心内的左侧信息块（标题 / 描述 / 两条 feature），内容整体距副标题 40.32
 * - 底部行业 tab 条：绝对定位距 section 底 89.28，6 个 162.24x69.84 玻璃态 tab
 *
 * 交互：点击 tab 切换左侧文案与背景大图；文案按官网 slideUp 曲线淡入，背景两层叠图交叉淡入。
 */
export function IndustrySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  /** 背景切换的「上一层」下标：用于两层叠图淡入，动画结束后清除 */
  const [fadingFrom, setFadingFrom] = useState<number | null>(null);

  const activeItem = INDUSTRIES[activeIndex];
  const activeBackground = asset(activeItem.background);
  const fadingBackground = fadingFrom === null ? null : asset(INDUSTRIES[fadingFrom].background);
  const showBackgroundFade = fadingBackground !== null && fadingBackground !== activeBackground;

  const handleSelect = useCallback(
    (index: number) => {
      if (index === activeIndex) return;
      setFadingFrom(activeIndex);
      setActiveIndex(index);
    },
    [activeIndex],
  );

  return (
    <section
      data-section="industry"
      className="relative h-[504px] w-full bg-dark text-white"
      style={{ paddingTop: 43.2 }}
    >
      {/* 背景大图：单层时等价于官网 background-size:cover / position:50%；切换时新图淡入 */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div
          className="industry-bg-layer absolute inset-0"
          style={{ backgroundImage: `url(${showBackgroundFade ? fadingBackground : activeBackground})` }}
        />
        {showBackgroundFade ? (
          <div
            key={activeBackground}
            className="industry-bg-layer industry-bg-fade-in absolute inset-0"
            style={{ backgroundImage: `url(${activeBackground})` }}
            onAnimationEnd={() => setFadingFrom(null)}
          />
        ) : null}
      </div>

      <h2 className="relative z-10 mt-0 mr-0 mb-[18.72px] ml-0 flex items-center justify-center gap-[10.8px] text-center font-display text-[25.92px] font-normal leading-[30.24px] text-white before:block before:h-[1.44px] before:w-[17.28px] before:bg-[#f10215] before:content-[''] after:block after:h-[1.44px] after:w-[17.28px] after:bg-[#f10215] after:content-['']">
        热门行业解决方案
      </h2>
      <p className="relative z-10 mx-0 mb-0 -mt-[11.52px] text-center text-[14.4px] font-normal leading-[20.16px] text-white opacity-80">
        京东物流完善的服务体系为企业保驾护航
      </p>

      {/* 982 版心：官网 .detail-wrap；信息块 margin-top 40.32 对应 .industry-content */}
      <div className="container-page relative z-10 mt-[40.32px]">
        <IndustryInfo item={activeItem} />
      </div>

      {/* 底部行业 tab 条（绝对定位，距 section 底 89.28，与官网一致） */}
      <IndustryTabs activeIndex={activeIndex} onSelect={handleSelect} />
    </section>
  );
}
