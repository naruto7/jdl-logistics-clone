/**
 * 数字滚动组件（对应官网 .number-roll / .digit-wrapper / .digit-scroll 结构）
 *
 * 原理：每一位数字是一列 0~9 的竖排数字（共 10em 高），外层窗口高 1em 并
 * overflow:hidden，只露出其中一位；把内层 translateY 从 0% 过渡到 -digit*10%
 * （百分比相对 10em 总高）就实现了「数字从 0 滚到目标值」。
 *
 * 官网过渡参数：transform 1s cubic-bezier(.34,1.56,.64,1)（带轻微回弹）。
 */
const ALL_DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

type NumberRollProps = {
  /** 逐位目标数字，如 [3] / [2, 5] */
  digits: number[];
  /** 静态后缀，如 ",600"（不滚动） */
  suffix?: string;
  /** 是否已滚动到目标值（由外层 IntersectionObserver 控制） */
  active: boolean;
};

export function NumberRoll({ digits, suffix, active }: NumberRollProps) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'baseline',
        fontFamily: 'var(--font-num)',
        fontSize: 'inherit',
        color: 'inherit',
      }}
    >
      {digits.map((digit, index) => (
        <div key={index} style={{ height: '1em', overflow: 'hidden' }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              transform: `translateY(${active ? -digit * 10 : 0}%)`,
              transition: 'transform 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
              willChange: 'transform',
            }}
          >
            {ALL_DIGITS.map((value) => (
              <span
                key={value}
                style={{
                  display: 'block',
                  height: '1em',
                  lineHeight: 1,
                  fontFamily: 'var(--font-num)',
                }}
              >
                {value}
              </span>
            ))}
          </div>
        </div>
      ))}
      {suffix ? (
        <span style={{ color: 'inherit', fontFamily: 'var(--font-num)', fontSize: 'inherit' }}>{suffix}</span>
      ) : null}
    </div>
  );
}
