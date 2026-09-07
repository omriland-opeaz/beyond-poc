import { S } from "../css.js";

/* A narrowing. Each stage is a segment whose near edge is that stage's size and whose
   far edge is the next stage's, with three rings fading inward -- the original's
   construction, in plain SVG. Vertical stacks the stages and sets each one's figure
   and label beside it; horizontal runs them left to right with the label beneath.
   Entrance stagger, hover lift and sibling dimming live in global.css (.by-funnel). */

const RINGS = [1, 0.883, 0.767];
const RING_OPACITY = [0.18, 0.5, 0.86];

/* viewBox 0 0 100 100. Curved edges, like the original's default. */
function hPath(a, b, k) {
  const h0 = a * 46 * k, h1 = b * 46 * k, c = 55;
  return `M0,${50 - h0} C${c},${50 - h0} ${100 - c},${50 - h1} 100,${50 - h1}` +
         ` L100,${50 + h1} C${100 - c},${50 + h1} ${c},${50 + h0} 0,${50 + h0} Z`;
}
function vPath(a, b, k) {
  const w0 = a * 46 * k, w1 = b * 46 * k, c = 55;
  return `M${50 - w0},0 C${50 - w0},${c} ${50 - w1},${100 - c} ${50 - w1},100` +
         ` L${50 + w1},100 C${50 + w1},${100 - c} ${50 + w0},${c} ${50 + w0},0 Z`;
}

export default function Funnel({ stages, orientation = "horizontal", color = "#C8F068", size = 200 }) {
  if (!stages.length) return null;
  const vert = orientation === "vertical";
  const max = stages[0].value;
  const norm = stages.map(s => s.value / max);
  const path = vert ? vPath : hPath;

  return (
    <span className={"by-funnel" + (vert ? " by-funnel-v" : "")} style={S(`display:flex;flex-direction:${vert ? "column" : "row"};gap:${vert ? 0 : 4}px;width:100%;height:${size}px`)}>
      {stages.map((s, i) => {
        const a = norm[i], b = norm[Math.min(i + 1, stages.length - 1)];
        const pct = Math.round(a * 100) + "%";
        const shape = (
          <span style={S("position:relative;display:block;width:100%;height:100%")}>
            <svg className="by-seg-shape" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" style={S("position:absolute;inset:0;width:100%;height:100%;overflow:visible")}>
              {RINGS.map((r, k) => <path key={k} d={path(a, b, r)} fill={color} opacity={RING_OPACITY[k]}></path>)}
            </svg>
            <span className="by-seg-pill" style={S("position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);padding:3px 9px;border-radius:100px;background:#14170F;color:#F7F7EF;font-size:10px;font-weight:800;font-variant-numeric:tabular-nums;white-space:nowrap;pointer-events:none")}>{pct}</span>
          </span>
        );
        return vert ? (
          <span key={s.label} className="by-seg" style={S(`flex:1;min-height:0;display:grid;grid-template-columns:1fr 108px;gap:14px;align-items:center;padding:5px 0;border-top:${i ? "1px solid #E5E5DA" : "none"}`)}>
            <span style={S(`display:block;height:100%;min-height:0;transform-origin:center top;animation:byGrow 520ms cubic-bezier(.22,1,.36,1) ${i * 110}ms both`)}>{shape}</span>
            <span style={S(`display:flex;flex-direction:column;gap:2px;min-width:0;animation:byRise 420ms ease-out ${i * 110 + 160}ms both`)}>
              <span style={S("font-size:22px;font-weight:800;font-variant-numeric:tabular-nums;letter-spacing:-0.025em;line-height:1.15")}>{s.display}</span>
              <span style={S("font-size:10px;color:#6B6B61;line-height:1.3;text-wrap:balance")}>{s.label}</span>
            </span>
          </span>
        ) : (
          <span key={s.label} className="by-seg" style={S(`flex:1;min-width:0;display:flex;flex-direction:column;gap:6px;transform-origin:left center;animation:byGrow 520ms cubic-bezier(.22,1,.36,1) ${i * 110}ms both`)}>
            <span style={S("display:block;flex:1;min-height:0")}>{shape}</span>
            <span style={S("display:flex;flex-direction:column;align-items:center;gap:1px;min-width:0")}>
              <span style={S("font-size:13px;font-weight:800;font-variant-numeric:tabular-nums;line-height:1.15")}>{s.display}</span>
              <span style={S("font-size:9.5px;color:#6B6B61;line-height:1.2;text-align:center;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100%")}>{s.label}</span>
            </span>
          </span>
        );
      })}
    </span>
  );
}
