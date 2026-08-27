import React from "react";

/** Share of a whole, with the legend carrying the numbers. */
export function Donut({ slices = [], size = 170, legend = true, style }) {
  const total = slices.reduce((s, x) => s + x.value, 0) || 1;
  const C = 2 * Math.PI * 16;
  let acc = 0;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 36, flexWrap: "wrap", ...style }}>
      <svg viewBox="0 0 40 40" style={{ width: size, height: size, flexShrink: 0 }}>
        <g transform="rotate(-90 20 20)">
          {slices.map((s, i) => {
            const len = (s.value / total) * C;
            const off = -acc; acc += len;
            return <circle key={i} cx="20" cy="20" r="16" fill="none" stroke={s.color} strokeWidth="7"
              strokeDasharray={len.toFixed(2) + " " + (C - len).toFixed(2)} strokeDashoffset={off.toFixed(2)} />;
          })}
        </g>
      </svg>
      {legend && (
        <div style={{ display: "flex", flexDirection: "column", gap: 9, flex: 1, minWidth: 180 }}>
          {slices.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 12, color: "var(--by-grey)", paddingBottom: 8, borderBottom: "1px solid var(--by-line-faint)" }}>
              <span style={{ width: 9, height: 9, borderRadius: 2, background: s.color, flexShrink: 0 }} />
              <span style={{ minWidth: 0 }}>{s.label}</span>
              <span style={{ marginLeft: "auto", fontSize: 13, fontWeight: 700, color: "var(--by-ink)", fontVariantNumeric: "var(--by-numeric)" }}>{s.display || s.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
