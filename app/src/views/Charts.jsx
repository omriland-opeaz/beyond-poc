import { S } from "../css.js";

/* Two sizes of the same six chart types: 170px under an answer, 82px on a cockpit
   card. The cockpit version is built from spans because it lives inside a button. */

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

export function CardChart({ chart: c, title, height = 82 }) {
  if (c.isBars) return (
    <>
      <svg viewBox="0 0 100 46" preserveAspectRatio="none" role="img" aria-label={title} style={S(`display:block;width:100%;height:${height}px`)}>
        {c.bars.map((b, i) => <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} fill={b.c}></rect>)}
      </svg>
      <span style={S("display:flex;justify-content:space-between;margin-top:5px")}>
        {c.axis.map((a, i) => <span key={i} style={S("font-size:8.5px;color:#6B6B61")}>{a.t}</span>)}
      </span>
    </>
  );

  if (c.isDonut) return (
    <span style={S("display:flex;align-items:center;gap:16px")}>
      <svg viewBox="0 0 40 40" role="img" aria-label={title} style={S(`width:${height}px;height:${height}px;flex-shrink:0`)}>
        <g transform="rotate(-90 20 20)">
          {c.ring.map((r, i) => <circle key={i} cx="20" cy="20" r="16" fill="none" stroke={r.c} strokeWidth="7" strokeDasharray={r.dash} strokeDashoffset={r.off}></circle>)}
        </g>
      </svg>
      <span style={S("display:flex;flex-direction:column;gap:5px;flex:1;min-width:0")}>
        {c.legend.map((l, i) => (
          <span key={i} style={S("display:flex;align-items:center;gap:7px;font-size:10.5px;color:#6B6B61")}>
            <span style={S(`width:7px;height:7px;border-radius:2px;background:${l.c};flex-shrink:0`)}></span>
            <span style={S("overflow:hidden;text-overflow:ellipsis;white-space:nowrap")}>{l.t}</span>
            <span style={S("margin-left:auto;font-weight:700;color:#14170F;font-variant-numeric:tabular-nums")}>{l.v}</span>
          </span>
        ))}
      </span>
    </span>
  );

  if (c.isLine) return (
    <>
      <svg viewBox="0 0 100 46" preserveAspectRatio="none" role="img" aria-label={title} style={S(`display:block;width:100%;height:${height}px`)}>
        <polyline points={c.pts} fill="none" stroke={c.stroke} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke"></polyline>
      </svg>
      <span style={S("display:flex;justify-content:space-between;margin-top:5px")}>
        {c.axis.map((a, i) => <span key={i} style={S("font-size:8.5px;color:#6B6B61")}>{a.t}</span>)}
      </span>
    </>
  );

  if (c.isArea) return (
    <>
      <svg viewBox="0 0 100 46" preserveAspectRatio="none" role="img" aria-label={title} style={S(`display:block;width:100%;height:${height}px`)}>
        <path d={c.fillD} fill={c.fill}></path>
        <polyline points={c.pts} fill="none" stroke={c.stroke} strokeWidth="2" strokeLinejoin="round" vectorEffect="non-scaling-stroke"></polyline>
      </svg>
      <span style={S("display:flex;justify-content:space-between;margin-top:5px")}>
        {c.axis.map((a, i) => <span key={i} style={S("font-size:8.5px;color:#6B6B61")}>{a.t}</span>)}
      </span>
    </>
  );

  if (c.isHbars) return (
    <span style={S("display:flex;flex-direction:column;gap:6px")}>
      {c.rows.map((r, i) => (
        <span key={i} style={S("display:grid;grid-template-columns:68px 1fr 36px;gap:9px;align-items:center")}>
          <span style={S("font-size:10px;color:#6B6B61;overflow:hidden;text-overflow:ellipsis;white-space:nowrap")}>{r.name}</span>
          <span style={S("position:relative;display:block;height:9px;background:#EFEFE4;border-radius:2px")}>
            <span style={S(`position:absolute;top:0;bottom:0;left:${r.left};width:${r.w};background:${r.color};border-radius:2px`)}></span>
          </span>
          <span style={S(`font-size:10px;font-weight:700;text-align:right;font-variant-numeric:tabular-nums;color:${r.color}`)}>{r.v}</span>
        </span>
      ))}
    </span>
  );

  if (c.isDots) return (
    <span style={S("display:flex;flex-direction:column;gap:6px")}>
      {c.rows.map((r, i) => (
        <span key={i} style={S("display:grid;grid-template-columns:68px 1fr 36px;gap:9px;align-items:center")}>
          <span style={S("font-size:10px;color:#6B6B61;overflow:hidden;text-overflow:ellipsis;white-space:nowrap")}>{r.name}</span>
          <span style={S("position:relative;display:block;height:9px")}>
            <span style={S("position:absolute;left:0;right:0;top:4px;height:1px;background:#EFEFE4")}></span>
            <span style={S(`position:absolute;top:0;left:${r.left};width:9px;height:9px;border-radius:50%;background:${r.color};margin-left:-4px`)}></span>
          </span>
          <span style={S(`font-size:10px;font-weight:700;text-align:right;font-variant-numeric:tabular-nums;color:${r.color}`)}>{r.v}</span>
        </span>
      ))}
    </span>
  );

  return null;
}
