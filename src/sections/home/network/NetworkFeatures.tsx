import { asset } from '@/lib/assets';
import { NETWORK_FEATURES, type NetworkFeature } from './data';

/**
 * 圆形特性按钮（对应官网 .feature-btn）
 *
 * 官网实测 + 源 CSS：
 * - 113.04x113.04 正圆，背景 linear-gradient(149.03deg,#FE7968,#FC3737)，白字 11.52px
 * - 内容纵向居中：图标 25.92x25.92 + margin-bottom 3.6px + 文字（左右 padding 7.2px）
 * - 入场动画 quickBounce：0.8s，translateY(-36px) → 0，逐个小延迟 0.2s，只播一次
 * - hover：放大 + 阴影增强（任务要求的交互，官网移动端组件同款）
 */
function FeatureButton({
  feature,
  index,
  active,
}: {
  feature: NetworkFeature;
  index: number;
  active: boolean;
}) {
  return (
    <div
      className="network-feature-btn-anim group relative h-[113.04px] w-[113.04px] shrink-0"
      style={
        active
          ? { animation: `networkFeatureBounce 800ms ease ${index * 0.2}s forwards` }
          : { transform: 'translateY(-28.8px)' }
      }
    >
      {/* 圆形本体：承担渐变背景与 hover 缩放（外层只负责弹入动画，避免 transform 冲突） */}
      <div
        className="flex h-full w-full flex-col items-center justify-center rounded-full text-white transition-[transform,box-shadow] duration-300 ease-out group-hover:scale-[1.06] group-hover:shadow-[0_14px_28px_rgba(252,55,55,0.35)]"
        style={{
          backgroundImage: 'linear-gradient(149.03deg, #fe7968, #fc3737)',
          fontSize: 11.52,
          lineHeight: 1,
        }}
      >
        <img src={asset(feature.icon)} alt="" className="h-[25.92px] w-[25.92px] object-contain" style={{ marginBottom: 3.6 }} />
        <span style={{ padding: '0 7.2px 7.2px', textAlign: 'center' }}>{feature.name}</span>
      </div>
    </div>
  );
}

/**
 * 右侧特性按钮组（对应官网 .network-features）
 * 官网定位：absolute right:0 bottom:36px，flex 居中，gap 14.4px，
 * 整体宽 495.36px（4×113.04 + 3×14.4），右缘与 982 版心右边界对齐。
 * 窄屏（<1024）退化为静态居中换行，避免绝对定位溢出。
 */
export function NetworkFeatures({ active }: { active: boolean }) {
  return (
    <>
      {/* 入场回弹关键帧（官网 quickBounce：-36px → 0，ease，0.8s，forwards） */}
      <style>{`
        @keyframes networkFeatureBounce {
          0% { transform: translateY(-36px); }
          100% { transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .network-feature-btn-anim { animation: none !important; transform: none !important; }
        }
      `}</style>
      <div className="absolute bottom-[36px] right-0 flex items-center gap-[14.4px] max-[1023px]:static max-[1023px]:mt-[40px] max-[1023px]:flex-wrap max-[1023px]:justify-center">
        {NETWORK_FEATURES.map((feature, index) => (
          <FeatureButton key={feature.name} feature={feature} index={index} active={active} />
        ))}
      </div>
    </>
  );
}
