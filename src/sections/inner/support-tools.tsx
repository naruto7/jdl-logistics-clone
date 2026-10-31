import { useMemo, useState, type FormEvent } from 'react';
import {
  BRANCH_TYPES,
  CONTACT_ITEMS,
  COVERAGE_PROVINCES,
  ETA_CITIES,
  ETA_PRODUCTS,
  FAQ_ITEMS,
  LOGIN_ENTRIES,
} from '@/data/inner/support';
import { DemoBadge, PillLink, SectionHead } from './primitives';

/* -------------------------------------------------------------------------- */
/* 工具函数                                                                    */
/* -------------------------------------------------------------------------- */

function hashCode(input: string): number {
  let hash = 0;
  for (let index = 0; index < input.length; index += 1) {
    hash = (hash * 31 + input.charCodeAt(index)) | 0;
  }
  return Math.abs(hash);
}

function formatTime(timestamp: number): string {
  const date = new Date(timestamp);
  const pad = (value: number) => String(value).padStart(2, '0');
  return `${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

const FIELD_CLASS =
  'h-11 w-full rounded-[10px] border border-line bg-white px-3.5 text-[14px] text-ink outline-none transition-colors placeholder:text-ink-3/70 focus:border-brand focus:ring-2 focus:ring-brand/15';

/* -------------------------------------------------------------------------- */
/* 运单查询                                                                    */
/* -------------------------------------------------------------------------- */

type TrackEvent = { time: string; status: string; desc: string };

type TrackResult = {
  waybill: string;
  status: string;
  from: string;
  to: string;
  product: string;
  events: TrackEvent[];
};

const MOCK_CITIES = ['北京', '上海', '广州', '深圳', '杭州', '成都', '武汉', '西安'];

/** 城市 → 代表区域，保证模拟轨迹里的区名与城市一致 */
const CITY_DISTRICTS: Record<string, string> = {
  北京: '亦庄',
  上海: '浦东',
  广州: '天河',
  深圳: '南山',
  杭州: '西湖',
  成都: '高新',
  武汉: '洪山',
  西安: '雁塔',
};

function buildTrackResult(waybill: string): TrackResult {
  const seed = hashCode(waybill);
  const from = MOCK_CITIES[seed % MOCK_CITIES.length];
  const to = MOCK_CITIES[(seed >> 3) % MOCK_CITIES.length];
  const base = Date.now() - 1000 * 60 * 60 * 26;
  const hour = 1000 * 60 * 60;
  const district = CITY_DISTRICTS[to] ?? '朝阳';
  const courier = ['王师傅', '李师傅', '张师傅', '刘师傅'][seed % 4];

  return {
    waybill,
    status: '派送中',
    from,
    to,
    product: from === to ? '京东特快 · 同城急送' : '京东标快',
    events: [
      {
        time: formatTime(base),
        status: '已揽收',
        desc: `快件已由 ${from}京东物流 ${CITY_DISTRICTS[from] ?? '朝阳'}营业部揽收，揽收员：${courier}`,
      },
      {
        time: formatTime(base + 4 * hour),
        status: '运输中',
        desc: `快件已由 ${from}分拨中心发出，发往 ${to}分拨中心`,
      },
      {
        time: formatTime(base + 9 * hour),
        status: '运输中',
        desc: `快件已到达 ${to}分拨中心，准备转运至末端营业部`,
      },
      {
        time: formatTime(base + 21 * hour),
        status: '派送中',
        desc: `快件已到达 ${to}${district}营业部，京东快递员正在派送，请保持电话畅通`,
      },
    ],
  };
}

export function WaybillQuery() {
  const [waybill, setWaybill] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TrackResult | null>(null);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = waybill.trim().toUpperCase();
    if (!value) {
      setError('请输入运单号');
      return;
    }
    if (!/^(JD)?\d{8,20}$/.test(value) && !/^[A-Z]{2}\d{8,20}$/.test(value)) {
      setError('运单号格式不正确：请输入 8-20 位数字，或 JD + 数字（示例：JD0123456789012）');
      return;
    }
    setError('');
    setLoading(true);
    setResult(null);
    window.setTimeout(() => {
      setResult(buildTrackResult(value));
      setLoading(false);
    }, 820);
  };

  return (
    <div className="grid overflow-hidden rounded-xl border border-line bg-white shadow-card md:grid-cols-[300px_1fr]">
      <div className="relative flex flex-col justify-between bg-brand-gradient p-7 text-white">
        <div>
          <p className="font-display text-[24px] tracking-[1px]">运单查询</p>
          <p className="mt-3 text-[13px] leading-6 text-white/85">
            输入运单号即可查看包裹全流程节点：揽收、中转、派送状态一目了然。
          </p>
          <p className="mt-4 text-[12px] leading-5 text-white/70">示例：JD0123456789012 / 0123456789</p>
        </div>
        <div className="mt-6 flex items-center gap-2 text-[12px] text-white/80">
          <span className="h-1.5 w-1.5 rounded-full bg-white" aria-hidden />
          演示站点：结果为前端模拟
        </div>
      </div>

      <div className="p-7">
        <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
          <div className="flex-1">
            <label htmlFor="waybill-no" className="mb-1.5 block text-[12.5px] text-ink-3">
              运单号 / 订单号
            </label>
            <input
              id="waybill-no"
              value={waybill}
              onChange={(event) => {
                setWaybill(event.target.value);
                if (error) setError('');
              }}
              placeholder="请输入运单号"
              className={FIELD_CLASS}
              autoComplete="off"
            />
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              disabled={loading}
              className="h-11 rounded-full bg-brand px-8 text-[14px] font-medium text-white transition-all hover:bg-brand/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? '查询中…' : '立即查询'}
            </button>
          </div>
        </form>

        {error ? (
          <p role="alert" className="mt-3 rounded-[10px] bg-brand/10 px-3.5 py-2.5 text-[12.5px] text-brand">
            {error}
          </p>
        ) : null}

        {loading ? (
          <div className="mt-5 space-y-2.5" aria-hidden>
            <div className="h-4 w-40 animate-pulse rounded bg-surface" />
            <div className="h-3 w-64 animate-pulse rounded bg-surface" />
            <div className="h-3 w-56 animate-pulse rounded bg-surface" />
          </div>
        ) : null}

        {result ? (
          <div className="mt-5 rounded-[10px] border border-line bg-surface/60 p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-[13px] text-ink-3">运单号 {result.waybill}</p>
                <p className="mt-1 text-[18px] font-semibold text-ink">
                  {result.from} → {result.to}
                  <span className="ml-3 rounded-full bg-brand/10 px-2.5 py-0.5 text-[12px] font-normal text-brand">
                    {result.status}
                  </span>
                </p>
              </div>
              <DemoBadge>模拟轨迹</DemoBadge>
            </div>
            <p className="mt-1 text-[12.5px] text-ink-3">产品：{result.product}</p>
            <ol className="mt-4 space-y-3">
              {result.events.map((event, index) => (
                <li key={`${event.time}-${event.status}`} className="flex gap-3">
                  <span className="mt-1.5 flex flex-col items-center" aria-hidden>
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        index === result.events.length - 1 ? 'bg-brand' : 'bg-ink-3/40'
                      }`}
                    />
                    {index < result.events.length - 1 ? <span className="mt-1 h-full w-px bg-line" /> : null}
                  </span>
                  <div className="pb-1">
                    <p className="text-[13px] font-medium text-ink">
                      {event.status}
                      <span className="ml-2 font-normal text-ink-3">{event.time}</span>
                    </p>
                    <p className="mt-0.5 text-[12.5px] leading-6 text-ink-2">{event.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        ) : null}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 时效查询                                                                    */
/* -------------------------------------------------------------------------- */

type EtaRow = { name: string; desc: string; eta: string };

export function EtaQuery() {
  const [from, setFrom] = useState('北京');
  const [to, setTo] = useState('上海');
  const [weight, setWeight] = useState('2');
  const [error, setError] = useState('');
  const [rows, setRows] = useState<EtaRow[] | null>(null);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = Number(weight);
    if (from === to) {
      setError('寄件地与收件地相同，请选择不同城市（同城配送请使用京东特快）');
      return;
    }
    if (!Number.isFinite(parsed) || parsed <= 0 || parsed > 1000) {
      setError('重量请输入 0.5 - 1000 之间的数字（单位：kg）');
      return;
    }
    setError('');
    const sameCity = from === to;
    setRows(
      ETA_PRODUCTS.map((product) => ({
        name: product.name,
        desc: product.desc,
        eta:
          sameCity && product.speed === 1
            ? '预计当日达'
            : product.speed === 1
              ? '预计次晨达'
              : product.speed === 2
                ? '预计次日达'
                : '预计隔日达',
      })),
    );
  };

  return (
    <div className="rounded-xl border border-line bg-white p-7 shadow-card">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[18px] font-semibold text-ink">运费时效查询</p>
          <p className="mt-1.5 text-[13px] text-ink-3">选择寄件地、收件地与重量，查看不同产品线的预计时效。</p>
        </div>
        <DemoBadge>模拟结果</DemoBadge>
      </div>
      <form onSubmit={submit} className="mt-5 grid gap-4 md:grid-cols-4">
        <div>
          <label htmlFor="eta-from" className="mb-1.5 block text-[12.5px] text-ink-3">
            寄件地
          </label>
          <select id="eta-from" value={from} onChange={(event) => setFrom(event.target.value)} className={FIELD_CLASS}>
            {ETA_CITIES.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="eta-to" className="mb-1.5 block text-[12.5px] text-ink-3">
            收件地
          </label>
          <select id="eta-to" value={to} onChange={(event) => setTo(event.target.value)} className={FIELD_CLASS}>
            {ETA_CITIES.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="eta-weight" className="mb-1.5 block text-[12.5px] text-ink-3">
            重量（kg）
          </label>
          <input
            id="eta-weight"
            value={weight}
            onChange={(event) => setWeight(event.target.value)}
            inputMode="decimal"
            className={FIELD_CLASS}
            placeholder="如 2"
          />
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            className="h-11 w-full rounded-full bg-brand text-[14px] font-medium text-white transition-colors hover:bg-brand/90"
          >
            查询
          </button>
        </div>
      </form>

      {error ? (
        <p role="alert" className="mt-3 rounded-[10px] bg-brand/10 px-3.5 py-2.5 text-[12.5px] text-brand">
          {error}
        </p>
      ) : null}

      {rows ? (
        <div className="mt-5 overflow-hidden rounded-[10px] border border-line">
          <table className="w-full border-collapse text-left text-[13px]">
            <thead className="bg-surface text-[12px] text-ink-3">
              <tr>
                <th className="px-4 py-2.5 font-medium">产品</th>
                <th className="px-4 py-2.5 font-medium">服务说明</th>
                <th className="px-4 py-2.5 font-medium">预计时效</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.name} className="border-t border-line">
                  <td className="px-4 py-3 font-medium text-ink">{row.name}</td>
                  <td className="px-4 py-3 text-ink-2">{row.desc}</td>
                  <td className="px-4 py-3 text-brand">{row.eta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
      <p className="mt-3 text-[12px] leading-5 text-ink-3">
        {from} → {to}，重量 {weight || '-'} kg。时效为演示估算，实际以下单页承诺为准。
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 服务范围 / 网点查询                                                          */
/* -------------------------------------------------------------------------- */

export function CoverageLookup() {
  const [province, setProvince] = useState(COVERAGE_PROVINCES[0].province);
  const current = useMemo(
    () => COVERAGE_PROVINCES.find((item) => item.province === province) ?? COVERAGE_PROVINCES[0],
    [province],
  );

  return (
    <div className="rounded-xl border border-line bg-white p-7 shadow-card">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[18px] font-semibold text-ink">服务范围查询</p>
          <p className="mt-1.5 text-[13px] text-ink-3">
            京东物流服务覆盖超 99% 的人口；选择省份查看已覆盖城市（演示数据）。
          </p>
        </div>
        <DemoBadge>示例范围</DemoBadge>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {COVERAGE_PROVINCES.map((item) => (
          <button
            key={item.province}
            type="button"
            onClick={() => setProvince(item.province)}
            className={`rounded-full px-4 py-1.5 text-[13px] transition-colors ${
              item.province === province
                ? 'bg-brand text-white'
                : 'border border-line text-ink-2 hover:border-brand/40 hover:text-brand'
            }`}
          >
            {item.province}
          </button>
        ))}
      </div>
      <div className="mt-5 rounded-[10px] bg-surface/70 p-5">
        <div className="flex items-center justify-between">
          <p className="text-[14px] font-medium text-ink">{current.province}</p>
          <span className="rounded-full bg-white px-2.5 py-1 text-[12px] text-brand">{current.level}</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {current.cities.map((city) => (
            <span key={city} className="rounded-full bg-white px-3 py-1 text-[12.5px] text-ink-2 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              {city}
            </span>
          ))}
        </div>
      </div>
      <p className="mt-3 text-[12px] leading-5 text-ink-3">
        完整服务范围（含街道/乡镇级细化）请以官网「服务范围查询」工具结果为准。
      </p>
    </div>
  );
}

export function BranchLookup() {
  const [city, setCity] = useState('北京');
  const [type, setType] = useState<(typeof BRANCH_TYPES)[number]['type'] | '全部'>('全部');
  const [submitted, setSubmitted] = useState(true);

  const branches = useMemo(() => {
    const seed = hashCode(city);
    const districts = [
      ['亦庄', '大兴区'],
      ['望京', '朝阳区'],
      ['中关村', '海淀区'],
      ['虹桥', '闵行区'],
      ['天府', '高新区'],
    ];
    return BRANCH_TYPES.map((item, index) => {
      const [area, district] = districts[(seed + index) % districts.length];
      return {
        name: `${city} · ${area}${item.type}`,
        type: item.type,
        desc: item.desc,
        address: `${city}${district}${['科创十一街', '幸福大街', '工业园路', '物流大道'][(seed + index) % 4]} ${
          (seed % 80) + 8
        } 号（演示地址）`,
        hours: item.type === '营业部' ? '08:00 - 20:00' : '全天候作业',
      };
    }).filter((item) => type === '全部' || item.type === type);
  }, [city, type]);

  return (
    <div className="rounded-xl border border-line bg-white p-7 shadow-card">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[18px] font-semibold text-ink">网点查询</p>
          <p className="mt-1.5 text-[13px] text-ink-3">输入城市，查看该城市的营业部、分拨中心、冷链仓与大件站点。</p>
        </div>
        <DemoBadge>示例网点</DemoBadge>
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
        }}
        className="mt-5 flex flex-col gap-3 sm:flex-row"
      >
        <input
          value={city}
          onChange={(event) => setCity(event.target.value)}
          className={`${FIELD_CLASS} sm:max-w-[240px]`}
          placeholder="请输入城市，如 北京"
          aria-label="城市"
        />
        <button
          type="submit"
          className="h-11 rounded-full bg-brand px-8 text-[14px] font-medium text-white transition-colors hover:bg-brand/90"
        >
          查询
        </button>
      </form>
      <div className="mt-4 flex flex-wrap gap-2">
        {(['全部', ...BRANCH_TYPES.map((item) => item.type)] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setType(item)}
            className={`rounded-full px-3.5 py-1.5 text-[12.5px] transition-colors ${
              item === type ? 'bg-brand text-white' : 'border border-line text-ink-2 hover:border-brand/40 hover:text-brand'
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {submitted ? (
        <ul className="mt-5 grid gap-3 md:grid-cols-2">
          {branches.map((branch) => (
            <li key={branch.name} className="rounded-[10px] border border-line p-4">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[14px] font-medium text-ink">{branch.name}</p>
                <span className="rounded-full bg-surface px-2 py-0.5 text-[11.5px] text-ink-3">{branch.type}</span>
              </div>
              <p className="mt-1.5 text-[12.5px] leading-6 text-ink-2">{branch.address}</p>
              <p className="mt-1 text-[12px] text-ink-3">
                服务：{branch.desc} · 营业时间 {branch.hours}
              </p>
            </li>
          ))}
          {branches.length === 0 ? (
            <li className="rounded-[10px] bg-surface px-4 py-6 text-center text-[13px] text-ink-3">
              该类型下暂无示例网点，请切换类型。
            </li>
          ) : null}
        </ul>
      ) : null}
      <p className="mt-3 text-[12px] leading-5 text-ink-3">网点名称与地址为演示数据，真实网点请以官网「网点查询」结果为准。</p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 常见问题                                                                    */
/* -------------------------------------------------------------------------- */

export function FaqAccordion() {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {FAQ_ITEMS.map((item) => (
        <details
          key={item.q}
          className="group rounded-xl border border-line bg-white px-5 py-4 shadow-[0_4px_14px_rgba(26,26,26,0.04)] transition-shadow hover:shadow-card open:shadow-card"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[14px] font-medium text-ink [&::-webkit-details-marker]:hidden">
            {item.q}
            <span className="text-brand transition-transform group-open:rotate-45" aria-hidden>
              +
            </span>
          </summary>
          <p className="mt-3 text-[13px] leading-7 text-ink-2">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 联系我们 + 登录                                                             */
/* -------------------------------------------------------------------------- */

export function ContactPanel() {
  return (
    <div className="grid gap-6 md:grid-cols-[1fr_280px]">
      <dl className="grid gap-4 sm:grid-cols-2">
        {CONTACT_ITEMS.map((item) => (
          <div key={item.label} className="rounded-xl border border-line bg-white p-5">
            <dt className="text-[12.5px] text-ink-3">{item.label}</dt>
            <dd className="mt-1.5 text-[16px] font-semibold text-ink">
              {item.href ? (
                <a href={item.href} className="transition-colors hover:text-brand">
                  {item.value}
                </a>
              ) : (
                item.value
              )}
            </dd>
            {item.note ? <p className="mt-1 text-[12px] leading-5 text-ink-3">{item.note}</p> : null}
          </div>
        ))}
      </dl>
      <div className="flex flex-col justify-between rounded-xl bg-dark p-6 text-white">
        <div>
          <p className="font-display text-[20px] tracking-[1px]">企业合作</p>
          <p className="mt-2 text-[12.5px] leading-6 text-white/70">
            扫码添加企业合作微信，即可获得专属物流顾问服务：24×7 即时响应、最快 15 分钟对接销售专家。
          </p>
        </div>
        <div className="mt-5 flex items-center gap-3">
          <div className="grid h-20 w-20 place-items-center rounded-lg bg-white/10 text-[10px] text-white/60">
            企业微信
          </div>
          <PillLink href="tel:950616" variant="white" className="h-10 px-5">
            致电 950616
          </PillLink>
        </div>
      </div>
    </div>
  );
}

export function LoginPanel({ notify }: { notify: (message: string) => void }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {LOGIN_ENTRIES.map((entry) => (
        <div key={entry.title} className="flex flex-col rounded-xl border border-line bg-white p-6">
          <p className="text-[16px] font-semibold text-ink">{entry.title}</p>
          <p className="mt-2 flex-1 text-[13px] leading-6 text-ink-2">{entry.desc}</p>
          <button
            type="button"
            onClick={() => notify(`演示站点不提供真实登录：${entry.action}入口仅作交互演示`)}
            className="mt-5 h-10 rounded-full border border-brand/40 text-[13px] font-medium text-brand transition-colors hover:border-brand hover:bg-brand/5"
          >
            {entry.action}
          </button>
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* 组合：查询区标题                                                            */
/* -------------------------------------------------------------------------- */

export function QuerySectionHead({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: string;
  desc: string;
}) {
  return <SectionHead eyebrow={eyebrow} title={title} desc={desc} />;
}
