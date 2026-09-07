import { useId } from "react";
import { S } from "../css.js";
import { smooth } from "./Charts.jsx";

/* Several series on one field. The guidelines' focus logic: the first series is the
   focus and carries a lime gradient under its curve; the rest are strokes only, in
   greys, so the field stays lime rather than compositing to sage. Three faint
   gridlines, labels along the foot, no legend of its own. */
export default function Series({ series, labels, height = 168, title }) {
  const gid = "s" + useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const all = series.flatMap(s => s.vals);
  const hi = Math.max.apply(null, all) * 1.04, lo = Math.min.apply(null, all) * 0.96;
  const toPts = vals => vals.map((v, i) =>
    ((i / (vals.length - 1)) * 100).toFixed(1) + "," + (44 - ((v - lo) / (hi - lo)) * 42).toFixed(1)).join(" ");

  return (
    <>
      <svg viewBox="0 0 100 46" preserveAspectRatio="none" role="img" aria-label={title} style={S(`display:block;width:100%;height:${height}px;animation:byFadeIn 600ms ease-out 200ms both`)}>
        <defs>
          {series.map((s, i) => (
            <linearGradient key={i} id={gid + i} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#C8F068" stopOpacity=".55"></stop>
              <stop offset="1" stopColor="#C8F068" stopOpacity="0"></stop>
            </linearGradient>
          ))}
        </defs>
        {[0.25, 0.5, 0.75].map(g => (
          <line key={g} x1="0" x2="100" y1={44 - g * 42} y2={44 - g * 42} stroke="#E5E5DA" strokeWidth="1" vectorEffect="non-scaling-stroke"></line>
        ))}
        {series.map((s, i) => {
          const sm = smooth(toPts(s.vals));
          return (
            <g key={i}>
              {i === 0 && <path d={sm.fill} fill={`url(#${gid + i})`}></path>}
              <path d={sm.line} fill="none" stroke={s.color} strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke"></path>
            </g>
          );
        })}
      </svg>
      <span style={S("display:flex;justify-content:space-between;margin-top:6px")}>
        {labels.map((t, i) => <span key={i} style={S("font-size:9.5px;color:#A3A399;font-variant-numeric:tabular-nums")}>{t}</span>)}
      </span>
    </>
  );
}
