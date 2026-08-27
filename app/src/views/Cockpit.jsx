import { S } from "../css.js";
import { CardChart } from "./Charts.jsx";

export default function Cockpit({ v }) {
  return (
    <div style={S("display:flex;flex-direction:column;min-height:100%;animation:byFade 160ms ease-out")}>
      <div style={S("flex:1;padding:34px 44px 40px")}>

        <div style={S("display:flex;align-items:flex-start;justify-content:space-between;gap:24px")}>
          <div style={S("max-width:620px")}>
            <div style={S("font-size:10.5px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#6B6B61")}>WEDNESDAY 26 AUGUST 2026</div>
            <h1 style={S("font-size:30px;font-weight:800;letter-spacing:-0.025em;line-height:1.2;margin:10px 0 0")}>Six graphs <span style={S("color:#5F7A12")}>you don't have to ask for.</span></h1>
          </div>
          <div style={S("text-align:right;flex-shrink:0")}>
            <div style={S("font-size:10.5px;color:#6B6B61")}>recomputed 14 min ago</div>
          </div>
        </div>

        <button onClick={v.openAlert} className="by-h-alert" style={S("display:flex;flex-wrap:wrap;align-items:center;gap:14px;width:100%;text-align:left;margin-top:24px;padding:15px 18px;border-radius:12px;border:1px solid #C0473F;background:rgba(192,71,63,.04);font:inherit;color:inherit")}>
          <span style={S("font-size:9.5px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#C0473F;white-space:nowrap")}>Alert fired · 2 h ago</span>
          <span style={S("font-size:13.5px;font-weight:700;letter-spacing:-0.01em;min-width:0")}>Advil share in Cocody fell 11.4 % week on week.</span>
          <span style={S("font-size:11.5px;color:#6B6B61")}>you asked to be told below −10 % · set 12 Aug</span>
          <span style={S("margin-left:auto;font-size:12px;font-weight:700;color:#14170F;white-space:nowrap")}>why →</span>
        </button>

        <div style={S("display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:14px;margin-top:20px")}>
          {v.cockpitCards.map((c, i) => (
            <button key={i} onClick={c.open} className="by-h-ink" style={S(`text-align:left;border:1px solid ${c.border};border-radius:14px;background:#fff;padding:17px 19px 15px;display:flex;flex-direction:column;min-width:0;font:inherit;color:inherit;cursor:pointer;animation:${c.rise}`)}>
              <span style={S("display:flex;align-items:center;gap:8px;width:100%")}>
                <span style={S(`display:inline-flex;align-items:center;gap:5px;padding:0 9px;height:19px;border-radius:20px;background:${c.badgeBg};border:1px solid ${c.badgeBorder};font-size:9px;line-height:1;font-weight:700;letter-spacing:0.07em;text-transform:uppercase;color:${c.badgeFg};white-space:nowrap`)}>{c.badge}</span>
                <span style={S("margin-left:auto;font-size:10px;color:#6B6B61;white-space:nowrap")}>{c.when}</span>
              </span>
              <span style={S("display:block;font-size:13px;font-weight:700;letter-spacing:-0.01em;line-height:1.35;margin-top:11px;text-wrap:pretty")}>{c.title}</span>
              <span style={S("display:flex;align-items:baseline;gap:9px;margin-top:7px")}>
                <span style={S("font-size:27px;font-weight:800;letter-spacing:-0.025em;font-variant-numeric:tabular-nums")}>{c.v}</span>
                <span style={S(`font-size:12px;font-weight:800;font-variant-numeric:tabular-nums;color:${c.dc};white-space:nowrap`)}>{c.delta}</span>
              </span>
              <span style={S("display:block;margin-top:12px")}>
                <CardChart chart={c.chart} title={c.title} />
              </span>
              <span style={S("display:block;font-size:10px;color:#6B6B61;margin-top:11px")}>{c.foot}</span>
              <span style={S("display:flex;align-items:center;gap:7px;margin-top:11px;padding-top:10px;border-top:1px solid #EFEFE4")}>
                <span style={S(`width:5px;height:5px;border-radius:50%;background:${c.whyDot};flex-shrink:0`)}></span>
                <span style={S("font-size:10.5px;color:#6B6B61;min-width:0;text-wrap:pretty")}>{c.why}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
      <div style={S("flex-shrink:0;padding:12px 44px;border-top:1px solid #E5E5DA;font-size:10.5px;color:#6B6B61")}>Nothing here was configured. Click any graph to open the conversation it came from.</div>
    </div>
  );
}
