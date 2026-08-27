import React from "react";

/** Vertical bars. One series, ink by default, lime for the bar being talked
 *  about. */
export function BarChart({ values = [], axis = [], height = 170, color = "var(--by-ink)", highlight = -1, highlightColor = "var(--by-lime)", style }) {
  const max = Math.max(...values, 0) || 1;
  const n = values.length || 1;
  const slot = 100 / n, w = slot * 0.62;
  return (
    <div style={style}>
      <svg viewBox="0 0 100 46" preserveAspectRatio="none" style={{ display: "block", width: "100%", height }}>
        {values.map((v, i) => {
          const h = (v / max) * 44;
          return <rect key={i} x={i * slot + (slot - w) / 2} y={46 - h} width={w} height={h}
            fill={i === highlight ? highlightColor : color} />;
        })}
      </svg>
      {axis.length > 0 && (
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 7 }}>
          {axis.map((a, i) => <span key={i} style={{ fontSize: 10, color: "var(--by-grey)" }}>{a}</span>)}
        </div>
      )}
    </div>
  );
}
