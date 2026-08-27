import React from "react";

/** The lake. One hand-shaped body of water, a lime shoreline, a lime halo
 *  behind it, three or four white marks and two slow ripples. */
export function Lake({ width = 310, rows, caption = "rows · read-only", foot, scale = 1, style }) {
  const uid = React.useId ? React.useId().replace(/:/g, "") : "byLake";
  const path = "M20,112 C8,80 30,50 64,42 C90,36 104,16 136,18 C174,21 200,40 214,68 C230,100 226,136 200,160 C174,184 136,198 100,188 C66,178 32,144 20,112 Z";
  return (
    <div style={{ position: "relative", width, height: Math.round(width * 0.9), ...style }}>
      <svg viewBox="0 0 240 216" style={{
        position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible",
        transform: "scale(" + scale + ")", transformOrigin: "50% 52%",
        transition: "transform 1600ms cubic-bezier(.22,1,.36,1)"
      }}>
        <defs>
          <linearGradient id={uid} x1="0" y1="0" x2="0.3" y2="1">
            <stop offset="0" stopColor="var(--by-water-light)" />
            <stop offset="1" stopColor="var(--by-water)" />
          </linearGradient>
        </defs>
        <path d={path} fill="var(--by-lime)" opacity=".34" transform="translate(3,5)" />
        <path d={path} fill={"url(#" + uid + ")"} stroke="var(--by-lime)" strokeWidth="3" />
        <g fill="none" stroke="rgba(255,255,255,.55)" strokeWidth="1.4" strokeLinecap="round">
          <path d="M52,146 q9,-7 18,0 t18,0" />
          <path d="M150,54 q9,-7 18,0 t18,0" />
          <path d="M162,150 q9,-7 18,0 t18,0" />
          <path d="M44,86 q9,-7 18,0 t18,0" />
        </g>
        <g fill="none" stroke="rgba(255,255,255,.6)" strokeWidth="1.2">
          <ellipse cx="118" cy="104" rx="34" ry="22" style={{ transformOrigin: "118px 104px", animation: "byRing 3.4s ease-out infinite" }} />
          <ellipse cx="118" cy="104" rx="34" ry="22" style={{ transformOrigin: "118px 104px", animation: "byRing 3.4s ease-out infinite 1.7s" }} />
        </g>
      </svg>
      <div style={{
        position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 2, textAlign: "center",
        color: "var(--by-water-ink)", paddingTop: 10, whiteSpace: "nowrap"
      }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "var(--by-tracking-kicker)" }}>THE LAKE</span>
        {rows && <span style={{ fontSize: 46, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1, fontVariantNumeric: "var(--by-numeric)" }}>{rows}</span>}
        <span style={{ fontSize: 12.5, fontWeight: 500 }}>{caption}</span>
        {foot && <span style={{ fontSize: 11, fontWeight: 700, marginTop: 8 }}>{foot}</span>}
      </div>
    </div>
  );
}
