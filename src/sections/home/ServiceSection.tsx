import { useCallback, useEffect, useRef, useState } from 'react';
import { SERVICE_TYPES, ITEMS_PER_PAGE } from './service/data';
import { ServiceTypes } from './service/ServiceTypes';
import { ServiceDetail } from './service/ServiceDetail';
import './service/service.css';

/**
 * 首页第 2 区：面向丰富场景的物流服务（官网实测 y=546 / h=639 / bg #F2F3F7）
 *
 * 版式全部按 1440x900 实测值写死：
 * - section padding: 105.12 / 34.56；标题 FZLTDHK 25.92px，两侧 17.27x1.44 的红色短线
 * - 版心 982（container-page），轮播条高 122.39，详情区高 328.27
 * - 产品白卡 731.52x175.68（半透明白 + 0.72 白描边），右侧卡车图 561.59x360 溢出卡片
 *
 * 交互：
 * - 点击 10 个服务项切换下方文案/产品卡（内容整体重挂载，复现官网 slide-up 入场）
 * - 点击左右圆形箭头翻页（每屏 5 项，共 2 屏；首/末屏箭头为禁用态）
 * - 自动轮播：区块完整进入视口后先等 2s，此后每 4s 切换；鼠标悬停暂停，
 *   手动操作会重置节拍。首屏（scrollY=0）区块只露出 55%，不触发自动轮播，
 *   这样首屏截图与官网参照图始终一致。
 */

/** 自动轮播间隔（官网观感约 4s） */
const AUTOPLAY_INTERVAL = 4000;
/** 区块完整可见后先停留 2s 再开始轮播，避免用户还没看清就跳走 */
const AUTOPLAY_WARMUP = 2000;
const MAX_PAGE_INDEX = Math.ceil(SERVICE_TYPES.length / ITEMS_PER_PAGE) - 1;

export function ServiceSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollIndex, setScrollIndex] = useState(0);
  /** 区块是否「基本完整」处于视口内（自动轮播开关） */
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const autoplayStartedRef = useRef(false);

  // 视口检测：用 IntersectionObserver 而不是 scroll 事件，避免滚动时频繁 re-render
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[entries.length - 1];
        setInView(entry.isIntersecting && entry.intersectionRatio >= 0.9);
      },
      { threshold: [0, 0.5, 0.9, 1] },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 自动轮播：inView && 未悬停时排程；activeIndex/scrollIndex 变化会清掉旧定时器，天然实现「操作后重置节拍」
  useEffect(() => {
    if (!inView || hovered) return;
    const delay = autoplayStartedRef.current ? AUTOPLAY_INTERVAL : AUTOPLAY_WARMUP;
    const timer = window.setTimeout(() => {
      autoplayStartedRef.current = true;
      setActiveIndex((prev) => (prev + 1) % SERVICE_TYPES.length);
    }, delay);
    return () => window.clearTimeout(timer);
  }, [inView, hovered, activeIndex, scrollIndex]);

  // 激活项跨屏时自动翻页，保证选中项始终可见
  useEffect(() => {
    setScrollIndex(activeIndex >= ITEMS_PER_PAGE ? MAX_PAGE_INDEX : 0);
  }, [activeIndex]);

  const handleSelect = useCallback((index: number) => setActiveIndex(index), []);

  const handleScrollPage = useCallback((delta: 1 | -1) => {
    setScrollIndex((prev) => Math.min(Math.max(prev + delta, 0), MAX_PAGE_INDEX));
  }, []);

  return (
    <section
      ref={sectionRef}
      data-section="service"
      className="relative w-full overflow-hidden bg-surface"
      style={{ height: 639, paddingTop: 105.12, paddingBottom: 34.56 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* 区块标题：两侧红色短线由 flex 子项实现（官网 ::before/::after） */}
      <h2 className="mb-[18.72px] flex items-center justify-center gap-[10.8px] text-center font-display text-[25.92px] font-normal leading-[30.24px] text-black">
        <span aria-hidden className="block h-[1.4375px] w-[17.2656px] bg-[#f10215]" />
        面向丰富场景的物流服务
        <span aria-hidden className="block h-[1.4375px] w-[17.2656px] bg-[#f10215]" />
      </h2>

      <div className="container-page relative">
        <ServiceTypes
          activeIndex={activeIndex}
          scrollIndex={scrollIndex}
          onSelect={handleSelect}
          onScrollPage={handleScrollPage}
        />
        <ServiceDetail service={SERVICE_TYPES[activeIndex]} />
      </div>
    </section>
  );
}
