import React from "react";

const LAKE = "M44,168 C39,153 63,142 93,139 C126,135 149,146 182,141 C213,136 248,133 278,139 C314,146 341,157 335,173 C330,188 291,197 235,200 C177,203 116,198 78,189 C55,183 47,175 44,168 Z";

/** Drop anything. A stone falls into the lake, rings spread, the file is filed.
 *  The three states are idle, reading and filed. */
export function DropZone({ state = "idle", step, result, onClick, style }) {
  const uid = React.useId ? React.useId().replace(/:/g, "") : "byDz";
  const busy = state === "reading";
  return (
    <button type="button" onClick={onClick}
      aria-label="Drop a file, or press Enter to browse"
      style={{
        position: "relative", overflow: "hidden", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 10, width: "100%", minHeight: 344,
        padding: "24px 22px", border: "2px dashed " + (busy ? "var(--by-water)" : "var(--by-line-strong)"),
        borderRadius: 15, background: state === "filed" ? "#FBFCF3" : "var(--by-paper)",
        color: "inherit", font: "inherit", textAlign: "center", cursor: "pointer", ...style
      }}>
      <svg width="380" height="210" viewBox="0 0 380 210" aria-hidden="true" style={{ flexShrink: 0, overflow: "visible" }}>
        <defs>
          <linearGradient id={uid} x1="0" y1="0" x2="0.25" y2="1">
            <stop offset="0" stopColor="var(--by-water-light)" />
            <stop offset="1" stopColor="var(--by-water)" />
          </linearGradient>
        </defs>
        {state === "idle" && (
          <path d="M163,28 C165,16 177,8 192,9 C208,10 219,18 220,30 C221,42 211,51 194,52 C177,53 164,46 162,36 C161,33 161,30 163,28 Z"
            fill="var(--by-grey)" stroke="var(--by-grey)" strokeWidth="2.4" strokeLinejoin="round" />
        )}
        <path d={LAKE} fill={"url(#" + uid + ")"} stroke="var(--by-lime)" strokeWidth="2.8" strokeLinejoin="round" />
        <g fill="none" stroke="rgba(255,255,255,.55)" strokeWidth="1.6" strokeLinecap="round">
          <path d="M76,160 q10,-7 20,0 t20,0" />
          <path d="M250,152 q10,-7 20,0 t20,0" />
          <path d="M142,184 q10,-7 20,0 t20,0" />
        </g>
        {busy && (
          <g fill="none" stroke="rgba(255,255,255,.85)" strokeWidth="1.7">
            {[0, 1.1, 2.2].map(d => (
              <ellipse key={d} cx="190" cy="143" rx="56" ry="17"
                style={{ transformOrigin: "190px 143px", animation: "byRing 3.4s ease-out " + d + "s infinite" }} />
            ))}
          </g>
        )}
      </svg>
      {state === "idle" && (<>
        <span style={{ fontSize: 14.5, fontWeight: 800, letterSpacing: "-0.01em" }}>Drop a file here, or click to browse</span>
        <span style={{ fontSize: 11, color: "var(--by-grey)" }}>xlsx · csv · pdf · docx · images · anything, really</span>
      </>)}
      {busy && (<>
        <span style={{ fontSize: 15, fontWeight: 800, letterSpacing: "-0.01em" }}>We're working our magic</span>
        <span style={{ fontSize: 11.5, color: "var(--by-lime-type)", fontWeight: 700, animation: "byPulse 1.6s ease-in-out infinite" }}>{step}</span>
      </>)}
      {state === "filed" && (<>
        <span style={{ position: "relative", display: "inline-block", fontSize: 16, fontWeight: 800, padding: "3px 16px 5px" }}>
          Filed.
          <svg viewBox="0 0 130 46" preserveAspectRatio="none" style={{ position: "absolute", left: "-12%", top: "-24%", width: "124%", height: "150%", overflow: "visible", pointerEvents: "none" }}>
            <path d="M104,11 C88,3 44,1 23,9 C6,16 5,32 22,39 C41,47 90,45 107,36 C120,29 117,14 98,8"
              fill="none" stroke="var(--by-lime-shade)" strokeWidth="3" strokeLinecap="round"
              vectorEffect="non-scaling-stroke" strokeDasharray="330" strokeDashoffset="330"
              style={{ animation: "byDraw 760ms ease-out 160ms forwards" }} />
          </svg>
        </span>
        <span style={{ fontSize: 11.5, color: "var(--by-grey)" }}>{result}</span>
      </>)}
    </button>
  );
}
