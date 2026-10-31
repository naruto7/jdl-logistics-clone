import { asset } from '@/lib/assets';
import { NetworkStats } from './network/NetworkStats';
import { NetworkFeatures } from './network/NetworkFeatures';
import { useInViewOnce } from './network/useInViewOnce';

/**
 * 首页「物流网络」区（官网 .logistics-network）
 *
 * 实测口径（1440x900，spec/key-rects.json + 官网源 CSS，官网 1rem = 72px）：
 * - 根 section：y=1689；硬性要求高 515px。官网真实布局高 514.8（padding 43.2 + 内容 446.4 + 25.2），
 *   为在固定 515px 的前提下让内部内容与官网「页面坐标」逐像素对齐，把多出的 0.2px 放到顶部
 *   padding（实现为 43.4），底部仍是 25.2，内容区正好 446.4。
 * - 背景两层：network-bg2.png（点阵地球）叠在 network-bg.jpg 之上；
 *   地球层 background-position:100% 100%，background-size:auto 423.36px（5.88rem），
 *   即画在右下角、高 423.36px、宽 861.12px，右缘贴视口右边；底色层铺满 100% 100%
 * - 标题「物流网络」25.92px FZLTDHK，行高 30.24，居中，两侧红色短线 gap 10.8（#F10215）；
 *   短线几何尺寸 17.28x1.44，但官网最终渲染成像素对齐的 17x2 实心块，这里按渲染结果复现
 * - 副标题 14.4px / 20.16 #23252B，margin-top -11.52（与标题 margin-bottom 18.72 折叠后净距 7.2）
 * - 内容行 .detail-wrap：宽 982.08（13.64rem）居中，margin-top 28.8，min-height 360
 *   · 左：统计列（374.4 宽）
 *   · 右：4 个 113.04 圆形特性按钮（absolute right:0 bottom:36）
 *
 * 交互：
 * - IntersectionObserver 首次进入视口：数字从 0 滚动到目标值（1s 回弹过渡），只播一次
 * - 圆形按钮依次弹入（0.8s，逐个延迟 0.2s），hover 放大 + 阴影增强
 */
export function NetworkSection() {
  const { ref, inView } = useInViewOnce<HTMLElement>(0.2);

  return (
    <section
      ref={ref}
      data-section="network"
      className="relative h-[515px] w-full overflow-hidden pt-[43.4px] pb-[25.2px] max-[1023px]:h-auto"
      style={{
        backgroundImage: `url(${asset('network/network-bg2.png')}), url(${asset('network/network-bg.jpg')})`,
        backgroundPosition: '100% 100%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'auto 423.36px, 100% 100%',
      }}
    >
      {/* 区块标题 + 副标题（官网 .home-section-title / .home-subtitle）
          · 两侧红色短线：官网渲染时是像素对齐的实心 17x2 色块（不做抗锯齿），这里用
            height:2px 的色块复现；几何中线仍与标题文字居中对齐
          · 标题文字：官网为灰阶抗锯齿且整体落在下一像素行，通过独立合成层
            translateZ(0)+translateY(0.5px) 复现同一栅格化位置（不影响布局） */}
      <h2
        className="relative flex items-center justify-center font-display"
        style={{
          gap: 10.8,
          margin: '0 0 18.72px',
          fontSize: 25.92,
          lineHeight: '30.24px',
          fontWeight: 400,
          color: '#000',
        }}
      >
        <span aria-hidden style={{ display: 'block', width: 17.28, height: 2, backgroundColor: '#f10215' }} />
        <span style={{ transform: 'translateZ(0) translateY(0.5px)' }}>物流网络</span>
        <span aria-hidden style={{ display: 'block', width: 17.28, height: 2, backgroundColor: '#f10215' }} />
      </h2>
      <p
        style={{
          margin: '-11.52px 0 0',
          fontSize: 14.4,
          lineHeight: '20.16px',
          color: '#23252b',
          textAlign: 'center',
        }}
      >
        遍布全球的基础设施为物流提供快速稳定、智能可靠的服务
      </p>

      {/* 内容行：左侧统计列 + 右侧圆形特性按钮 */}
      <div className="relative mx-auto mt-[28.8px] min-h-[360px] w-[982.08px] max-w-[calc(100%-48px)] max-[1023px]:min-h-0">
        <NetworkStats active={inView} />
        <NetworkFeatures active={inView} />
      </div>
    </section>
  );
}
