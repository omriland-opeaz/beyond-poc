import { Area, AreaChart, ReferenceLine, ResponsiveContainer, XAxis, YAxis } from "recharts";

const ORANGE = "#F97316";
const CLIP_MONTH = "Aug";

const chartData = [
  { month: "Feb", solid: 34.8, ghost: null },
  { month: "Mar", solid: 33.1, ghost: null },
  { month: "Apr", solid: 34.2, ghost: null },
  { month: "May", solid: 35.0, ghost: null },
  { month: "Jun", solid: 34.4, ghost: null },
  { month: "Jul", solid: 33.0, ghost: null },
  { month: "Aug", solid: 31.4, ghost: 31.4 },
  { month: "Sep", solid: null, ghost: 30.6 },
  { month: "Oct", solid: null, ghost: 29.8 },
  { month: "Nov", solid: null, ghost: 29.4 },
  { month: "Dec", solid: null, ghost: 29.9 },
];

function ClipMarker({ cx, cy, payload }) {
  if (payload?.month !== CLIP_MONTH || cx == null || cy == null) return null;
  const width = 50;
  const height = 20;
  return (
    <g>
      <rect
        x={cx - width / 2}
        y={cy - height - 10}
        width={width}
        height={height}
        rx={4}
        fill={ORANGE}
      />
      <text
        x={cx}
        y={cy - 14}
        textAnchor="middle"
        fill="#ffffff"
        fontSize="11"
        fontWeight="600"
        fontFamily="DM Sans, ui-sans-serif, system-ui, sans-serif"
      >
        31.4%
      </text>
    </g>
  );
}

function DownArrow() {
  return (
    <svg viewBox="0 0 16 16" className="size-3" aria-hidden="true">
      <path
        d="M2 5 L7 10 L9.5 7.2 L14 12"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 12 H14 V8.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ClippedAreaChart() {
  return (
    <div className="flex h-full min-h-[280px] flex-col">
      <div className="mb-6 flex items-start justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold tracking-tight text-zinc-900">Where the share went</h3>
          <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-400">
            Advil · last quarter
          </p>
        </div>
        <div className="text-right">
          <div className="flex items-center justify-end gap-2">
            <span className="text-2xl font-bold tracking-tight text-zinc-900">31.4%</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-[11px] font-semibold text-rose-600">
              <DownArrow />
              −2.1 pts
            </span>
          </div>
          <p className="mt-1 text-xs text-zinc-400">confirmed identities · three months</p>
        </div>
      </div>

      <div className="min-h-[220px] flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 28, right: 12, left: 12, bottom: 4 }}>
            <defs>
              <linearGradient id="share-clip-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={ORANGE} stopOpacity={0.28} />
                <stop offset="100%" stopColor={ORANGE} stopOpacity={0} />
              </linearGradient>
            </defs>
            <YAxis hide domain={[28.8, 35.6]} />
            <XAxis
              dataKey="month"
              interval={0}
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tick={{ fill: "#a1a1aa", fontSize: 11 }}
            />
            <ReferenceLine x={CLIP_MONTH} stroke="#d4d4d8" strokeDasharray="3 4" />
            <Area
              type="natural"
              dataKey="ghost"
              stroke={ORANGE}
              strokeWidth={2}
              strokeOpacity={0.18}
              fill="none"
              dot={false}
              activeDot={false}
              isAnimationActive={false}
            />
            <Area
              type="natural"
              dataKey="solid"
              stroke={ORANGE}
              strokeWidth={2.5}
              fill="url(#share-clip-fill)"
              fillOpacity={1}
              dot={<ClipMarker />}
              activeDot={false}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
