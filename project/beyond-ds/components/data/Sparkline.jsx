import React from "react";

/** A line, or a line with a fill under it. No axes, no grid: the labels below
 *  are the axis. */
export function Sparkline({ values = [], axis = [], height = 170, area, stroke = "var(--by-ink)", fill = "rgba(200,240,104,.45)", style }) {
  const max = Math.max(...values, 0), min = Math.min(...values, 0);
  const span = max - min || 1;
  const pts = values.map((v, i) => {
    const x = values.length > 1 ? (i / (values.length - 1)) * 100 : 50;
    const y = 44 - ((v - min) / span) * 40;
    return x.toFixed(2) + "," + y.toFixed(2);
  });
  const d = "M0,46 L" + pts.join(" L") + " L100,46 Z";
  return (
    <div style={style}>
      <svg viewBox="0 0 100 46" preserveAspectRatio="none" style={{ display: "block", width: "100%", height }}>
        {area && <path d={d} fill={fill} />}
        <polyline points={pts.join(" ")} fill="none" stroke={stroke} strokeWidth="2.4"
          strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      </svg>
      {axis.length > 0 && (
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 7 }}>
          {axis.map((a, i) => <span key={i} style={{ fontSize: 10, color: "var(--by-grey)" }}>{a}</span>)}
        </div>
      )}
    </div>
  );
}
