import { useId } from "react";
import { S } from "../css.js";

/* Two sizes of the same six chart types: 170px under an answer, 82px on a cockpit
   card. The cockpit version is built from spans because it lives inside a button. */

/* The same points as the polyline, read as a curve: Catmull-Rom through them,
   emitted as cubic beziers. The card-size area uses it for both stroke and fill. */
export function smooth(pts) {
  const p = pts.split(" ").map(s => s.split(",").map(Number));
  if (p.length < 2) return { line: "", fill: "" };
  let d = `M${p[0][0]},${p[0][1]}`;
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] || p[i], p1 = p[i], p2 = p[i + 1], p3 = p[i + 2] || p2;
    const c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C${c1x.toFixed(2)},${c1y.toFixed(2)} ${c2x.toFixed(2)},${c2y.toFixed(2)} ${p2[0]},${p2[1]}`;
  }
  const last = p[p.length - 1];
  return { line: d, fill: `${d} L${last[0]},44 L${p[0][0]},44 Z` };
}

export function AnswerChart({ chart: c, title }) {
  if (c.isBars) return (
    <>
      <svg viewBox="0 0 100 46" preserveAspectRatio="none" role="img" aria-label={title} style={S("display:block;width:100%;height:170px")}>
        {c.bars.map((b, i) => <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} fill={b.c}></rect>)}
      </svg>
      <div style={S("display:flex;justify-content:space-between;margin-top:7px")}>
        {c.axis.map((a, i) => <span key={i} style={S("font-size:10px;color:#6B6B61")}>{a.t}</span>)}
      </div>
    </>
  );

  if (c.isDonut) return (
    <div style={S("display:flex;align-items:center;gap:36px;flex-wrap:wrap")}>
      <svg viewBox="0 0 40 40" role="img" aria-label={title} style={S("width:170px;height:170px;flex-shrink:0")}>
        <g transform="rotate(-90 20 20)">
          {c.ring.map((r, i) => <circle key={i} cx="20" cy="20" r="16" fill="none" stroke={r.c} strokeWidth="7" strokeDasharray={r.dash} strokeDashoffset={r.off}></circle>)}
        </g>
      </svg>
      <div style={S("display:flex;flex-direction:column;gap:9px;flex:1;min-width:180px")}>
        {c.legend.map((l, i) => (
          <div key={i} style={S("display:flex;align-items:center;gap:9px;font-size:12px;color:#6B6B61;padding-bottom:8px;border-bottom:1px solid #EFEFE4")}>
            <span style={S(`width:9px;height:9px;border-radius:2px;background:${l.c};flex-shrink:0`)}></span>
            <span style={S("min-width:0")}>{l.t}</span>
            <span style={S("margin-left:auto;font-size:13px;font-weight:700;color:#14170F;font-variant-numeric:tabular-nums")}>{l.v}</span>
          </div>
        ))}
      </div>
    </div>
  );

  if (c.isLine) return (
    <>
      <svg viewBox="0 0 100 46" preserveAspectRatio="none" role="img" aria-label={title} style={S("display:block;width:100%;height:170px")}>
        <polyline points={c.pts} fill="none" stroke={c.stroke} strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke"></polyline>
      </svg>
      <div style={S("display:flex;justify-content:space-between;margin-top:7px")}>
        {c.axis.map((a, i) => <span key={i} style={S("font-size:10px;color:#6B6B61")}>{a.t}</span>)}
      </div>
    </>
  );

  if (c.isArea) return (
    <>
      <svg viewBox="0 0 100 46" preserveAspectRatio="none" role="img" aria-label={title} style={S("display:block;width:100%;height:170px")}>
        <path d={c.fillD} fill={c.fill}></path>
        <polyline points={c.pts} fill="none" stroke={c.stroke} strokeWidth="2.4" strokeLinejoin="round" vectorEffect="non-scaling-stroke"></polyline>
      </svg>
      <div style={S("display:flex;justify-content:space-between;margin-top:7px")}>
        {c.axis.map((a, i) => <span key={i} style={S("font-size:10px;color:#6B6B61")}>{a.t}</span>)}
      </div>
    </>
  );

  if (c.isHbars) return (
    <>
      {c.rows.map((d, i) => (
        <div key={i} style={S("display:grid;grid-template-columns:124px 1fr 60px;gap:14px;align-items:center;padding:8px 0;border-bottom:1px solid #EFEFE4")}>
          <div style={S("min-width:0")}>
            <div style={S("font-size:12px;font-weight:500")}>{d.name}</div>
            <div style={S("font-size:10px;color:#6B6B61;margin-top:1px")}>{d.note}</div>
          </div>
          <div style={S("position:relative;height:16px")}>
            <div style={S("position:absolute;inset:0;background:#EFEFE4;border-radius:3px")}></div>
            <div style={S(`position:absolute;top:0;bottom:0;left:${d.left};width:${d.w};background:${d.color};border-radius:3px`)}></div>
            {c.showZero && <div style={S(`position:absolute;top:-3px;bottom:-3px;left:${c.zeroAt};width:1px;background:#14170F`)}></div>}
          </div>
          <div style={S(`font-size:12px;font-weight:700;text-align:right;font-variant-numeric:tabular-nums;color:${d.color}`)}>{d.v}</div>
        </div>
      ))}
      {c.showZero && (
        <div style={S("display:grid;grid-template-columns:124px 1fr 60px;gap:14px;margin-top:7px")}>
          <span></span>
          <span style={S("position:relative;display:block;font-size:10px;color:#6B6B61")}>
            <span style={S(`position:absolute;left:${c.zeroAt};transform:translateX(-50%);white-space:nowrap`)}>0</span>
          </span>
          <span></span>
        </div>
      )}
    </>
  );

  if (c.isDots) return (
    <>
      {c.rows.map((d, i) => (
        <div key={i} style={S("display:grid;grid-template-columns:124px 1fr 60px;gap:14px;align-items:center;padding:9px 0;border-bottom:1px solid #EFEFE4")}>
          <div style={S("min-width:0")}>
            <div style={S("font-size:12px;font-weight:500")}>{d.name}</div>
            <div style={S("font-size:10px;color:#6B6B61;margin-top:1px")}>{d.note}</div>
          </div>
          <div style={S("position:relative;height:14px")}>
            <div style={S("position:absolute;left:0;right:0;top:6px;height:1px;background:#EFEFE4")}></div>
            <div style={S(`position:absolute;top:1px;left:${d.left};width:12px;height:12px;border-radius:50%;background:${d.color};margin-left:-6px`)}></div>
          </div>
          <div style={S(`font-size:12px;font-weight:700;text-align:right;font-variant-numeric:tabular-nums;color:${d.color}`)}>{d.v}</div>
        </div>
      ))}
    </>
  );

  return null;
}

/* `compact` is the tile size: the ranked-row charts (hbars, dots) are laid out from
   fixed row heights rather than a box height, so they cannot be squeezed by `height`
   the way the SVG charts can. Compact trades type size for rows that all fit.
   `legend` drops the donut's five-row key where the tile only has room for the ring. */
export function CardChart({ chart: c, title, height = 82, compact = false, legend = true, axis = true }) {
  const gid = "g" + useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const row = compact
    ? { gap: 4, cols: "64px 1fr 30px", inner: 7, font: 9, bar: 7, dot: 7 }
    : { gap: 6, cols: "68px 1fr 36px", inner: 9, font: 10, bar: 9, dot: 9 };

  if (c.isBars) return (
    <>
      <svg viewBox="0 0 100 46" preserveAspectRatio="none" role="img" aria-label={title} style={S(`display:block;width:100%;height:${height}px`)}>
        {c.bars.map((b, i) => <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} fill={b.c}></rect>)}
      </svg>
      {axis && (
        <span style={S("display:flex;justify-content:space-between;margin-top:5px")}>
          {c.axis.map((a, i) => <span key={i} style={S("font-size:8.5px;color:#6B6B61")}>{a.t}</span>)}
        </span>
      )}
    </>
  );

  if (c.isDonut) return (
    <span style={S("display:flex;align-items:center;gap:16px")}>
      <svg viewBox="0 0 40 40" role="img" aria-label={title} style={S(`width:${height}px;height:${height}px;flex-shrink:0`)}>
        <g transform="rotate(-90 20 20)">
          {c.ring.map((r, i) => <circle key={i} cx="20" cy="20" r="16" fill="none" stroke={r.c} strokeWidth="7" strokeDasharray={r.dash} strokeDashoffset={r.off}></circle>)}
        </g>
      </svg>
      {legend && (
        <span style={S("display:flex;flex-direction:column;gap:5px;flex:1;min-width:0")}>
          {c.legend.map((l, i) => (
            <span key={i} style={S("display:flex;align-items:center;gap:7px;font-size:10.5px;color:#6B6B61")}>
              <span style={S(`width:7px;height:7px;border-radius:2px;background:${l.c};flex-shrink:0`)}></span>
              <span style={S("overflow:hidden;text-overflow:ellipsis;white-space:nowrap")}>{l.t}</span>
              <span style={S("margin-left:auto;font-weight:700;color:#14170F;font-variant-numeric:tabular-nums")}>{l.v}</span>
            </span>
          ))}
        </span>
      )}
    </span>
  );

  if (c.isLine) return (
    <>
      <svg viewBox="0 0 100 46" preserveAspectRatio="none" role="img" aria-label={title} style={S(`display:block;width:100%;height:${height}px`)}>
        <polyline points={c.pts} fill="none" stroke={c.stroke} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke"></polyline>
      </svg>
      {axis && (
        <span style={S("display:flex;justify-content:space-between;margin-top:5px")}>
          {c.axis.map((a, i) => <span key={i} style={S("font-size:8.5px;color:#6B6B61")}>{a.t}</span>)}
        </span>
      )}
    </>
  );

  if (c.isArea) {
    const sm = smooth(c.pts);
    return (
    <>
      <svg viewBox="0 0 100 46" preserveAspectRatio="none" role="img" aria-label={title} style={S(`display:block;width:100%;height:${height}px`)}>
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={c.stroke} stopOpacity=".38"></stop>
            <stop offset="1" stopColor={c.stroke} stopOpacity="0"></stop>
          </linearGradient>
        </defs>
        <path d={sm.fill} fill={`url(#${gid})`}></path>
        <path d={sm.line} fill="none" stroke={c.stroke} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke"></path>
      </svg>
      {axis && (
        <span style={S("display:flex;justify-content:space-between;margin-top:5px")}>
          {c.axis.map((a, i) => <span key={i} style={S("font-size:8.5px;color:#6B6B61")}>{a.t}</span>)}
        </span>
      )}
    </>
  );
  }

  if (c.isHbars) return (
    <span style={S(`display:flex;flex-direction:column;gap:${row.gap}px`)}>
      {c.rows.map((r, i) => (
        <span key={i} style={S(`display:grid;grid-template-columns:${row.cols};gap:${row.inner}px;align-items:center;line-height:1.15`)}>
          <span style={S(`font-size:${row.font}px;color:#6B6B61;overflow:hidden;text-overflow:ellipsis;white-space:nowrap`)}>{r.name}</span>
          <span style={S(`position:relative;display:block;height:${row.bar}px;background:#EFEFE4;border-radius:2px`)}>
            <span style={S(`position:absolute;top:0;bottom:0;left:${r.left};width:${r.w};background:${r.color};border-radius:2px`)}></span>
          </span>
          <span style={S(`font-size:${row.font}px;font-weight:700;text-align:right;font-variant-numeric:tabular-nums;color:${r.color}`)}>{r.v}</span>
        </span>
      ))}
    </span>
  );

  if (c.isDots) return (
    <span style={S(`display:flex;flex-direction:column;gap:${row.gap}px`)}>
      {c.rows.map((r, i) => (
        <span key={i} style={S(`display:grid;grid-template-columns:${row.cols};gap:${row.inner}px;align-items:center;line-height:1.15`)}>
          <span style={S(`font-size:${row.font}px;color:#6B6B61;overflow:hidden;text-overflow:ellipsis;white-space:nowrap`)}>{r.name}</span>
          <span style={S(`position:relative;display:block;height:${row.dot}px`)}>
            <span style={S(`position:absolute;left:0;right:0;top:${(row.dot - 1) / 2}px;height:1px;background:#EFEFE4`)}></span>
            <span style={S(`position:absolute;top:0;left:${r.left};width:${row.dot}px;height:${row.dot}px;border-radius:50%;background:${r.color};margin-left:${-row.dot / 2}px`)}></span>
          </span>
          <span style={S(`font-size:${row.font}px;font-weight:700;text-align:right;font-variant-numeric:tabular-nums;color:${r.color}`)}>{r.v}</span>
        </span>
      ))}
    </span>
  );

  return null;
}
