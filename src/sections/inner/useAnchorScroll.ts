import { useEffect } from 'react';

/**
 * MPA + 锚点跳转：从其他页面点 /about/#lang 这类深链进来时，
 * 浏览器会在 React 挂载前尝试定位（此时节点还不存在），
 * 因此需要挂载后补一次滚动；字体/图片加载会改变上方区块高度，
 * 所以再在字体就绪与短延时后各校正一次。
 */
export function useAnchorScroll() {
  useEffect(() => {
    if (!window.location.hash) return;
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id) return;

    let cancelled = false;
    const timers: number[] = [];

    const scrollToTarget = () => {
      if (cancelled) return;
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ block: 'start', behavior: 'instant' as ScrollBehavior });
    };

    // 元素可能尚未渲染：短轮询直到出现
    let attempts = 0;
    const waitForNode = () => {
      if (cancelled) return;
      const el = document.getElementById(id);
      if (el) {
        scrollToTarget();
        return;
      }
      attempts += 1;
      if (attempts <= 25) timers.push(window.setTimeout(waitForNode, 80));
    };
    timers.push(window.setTimeout(waitForNode, 30));

    // 字体与懒加载图片会让上方高度变化，做几次校正
    const corrections = [180, 420, 900];
    if (typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready.then(() => {
        scrollToTarget();
        corrections.forEach((delay) => timers.push(window.setTimeout(scrollToTarget, delay)));
      });
    } else {
      corrections.forEach((delay) => timers.push(window.setTimeout(scrollToTarget, delay)));
    }

    return () => {
      cancelled = true;
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);
}
