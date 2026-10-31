import { useEffect, useRef, useState } from 'react';

/**
 * 「元素首次进入视口」观察钩子（自带 ref）。
 *
 * 官网交互口径：物流网络区滚动进入视口后，数字从 0 滚动到目标值、
 * 圆形按钮依次弹入；动画只播一次（滚出再滚回不重播）。
 * 因此这里用 IntersectionObserver 做一次性触发：命中后立即 disconnect，
 * 之后不再回调，避免重复播放与额外监听开销。
 *
 * @param threshold 触发比例，0.2 表示区块露出 20% 即触发（官网区块高 515px，
 *                  在 1440x900 视口下露出约 1/5 时开始，观感上「刚滚到就开始滚数」）
 */
export function useInViewOnce<T extends HTMLElement = HTMLDivElement>(threshold = 0.2) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    // 已触发过（只播一次）或元素未挂载：不再监听
    if (!el || inView) return;

    // 浏览器不支持 IntersectionObserver 时直接视为已进入，保证数字不一直是 0
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [inView, threshold]);

  return { ref, inView } as const;
}
