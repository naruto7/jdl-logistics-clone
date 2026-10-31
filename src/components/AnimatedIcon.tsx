/**
 * 逐帧雪碧图图标：官网的快捷入口图标是 21 帧序列图（3696x176 = 21×176），
 * 静态时显示首帧，hover 时逐帧播放——这里用 background-position steps 动画还原。
 */
const FRAMES = 21;
const FRAME = 176;

export function AnimatedIcon({
  src,
  displaySize = 63,
  className = '',
  duration = 1.05,
}: {
  src: string;
  displaySize?: number;
  className?: string;
  duration?: number;
}) {
  const scale = displaySize / FRAME;
  return (
    <span
      aria-hidden
      className={`sprite-icon block shrink-0 ${className}`}
      style={{
        width: displaySize,
        height: displaySize,
        backgroundImage: `url(${src})`,
        // 整张图按显示尺寸等比缩放：21 帧横向排列
        backgroundSize: `${FRAMES * FRAME * scale}px ${FRAME * scale}px`,
        backgroundPosition: '0 0',
        backgroundRepeat: 'no-repeat',
        // 由 CSS 变量驱动 hover 动画的关键帧终点
        ['--sprite-distance' as string]: `${-FRAMES * displaySize}px`,
        ['--sprite-duration' as string]: `${duration}s`,
      }}
    />
  );
}

export const SPRITE_FRAMES = FRAMES;
