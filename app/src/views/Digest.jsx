import { S } from "../css.js";

/* What _beyond did with your data: the proposals it will not act on alone, and the
   92 it did. Every automatic action is logged with its rule and can be undone. */

export default function Digest({ v }) {
  return (
    <div style={S("height:100%;overflow:auto;animation:byFade 160ms ease-out")}>
      <div style={S("max-width:880px;margin:0 auto;padding:38px 44px 64px")}>
        <div style={S("font-size:10.5px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#6B6B61;margin-bottom:14px")}>Digest · what it did with your data</div>
        <h1 style={S("font-size:30px;font-weight:800;letter-spacing:-0.025em;line-height:1.2;margin:0;text-wrap:pretty;max-width:740px")}>
          <span style={S("font-family:'Space Grotesk',sans-serif;font-weight:700;letter-spacing:-0.02em;color:#14170F")}>_beyond</span> took 92 actions on its own this month. <span style={S("color:#9A5C0F")}>{v.pendHead}</span>
        </h1>

        <div style={S("margin-top:38px")}>
          <div style={S("display:flex;align-items:baseline;justify-content:space-between;border-bottom:2px solid #14170F;padding-bottom:10px")}>
            <div style={S("font-size:14px;font-weight:800")}>{v.pendTitle}</div>
            <div style={S("font-size:11px;color:#6B6B61")}>where <span style={S("font-family:'Space Grotesk',sans-serif;font-weight:700;letter-spacing:-0.02em;color:#14170F")}>_beyond</span> is not sure enough to act alone</div>
          </div>
          {v.pending.map((p, i) => (
            <div key={i} style={S("display:grid;grid-template-columns:minmax(0,1.35fr) minmax(0,1fr);gap:28px;align-items:start;padding:22px 0;border-bottom:1px solid #E5E5DA")}>
              <div>
                <div style={S("font-family:'Space Grotesk',sans-serif;font-size:9px;font-weight:700;letter-spacing:0.1em;color:#9A5C0F;margin-bottom:8px")}>{p.kind} · CONFIDENCE {p.conf}</div>
                <div style={S("font-size:16.5px;font-weight:700;letter-spacing:-0.015em;line-height:1.35;text-wrap:pretty")}>{p.head}</div>
                <div style={S("font-size:12.5px;line-height:1.65;color:#6B6B61;margin-top:8px")}>{p.why}</div>
                {p.undecided && (
                  <div style={S("display:flex;gap:10px;margin-top:16px")}>
                    <button onClick={p.approve} className="by-h-lime" style={S("padding:9px 18px;border-radius:8px;border:none;background:#C8F068;color:#14170F;font-size:12.5px;font-weight:700;white-space:nowrap")}>Approve</button>
                    <button onClick={p.dismiss} className="by-h-ink" style={S("padding:9px 16px;border-radius:8px;border:1px solid #D3D3C4;background:#fff;font-size:12.5px;font-weight:600;color:#14170F;white-space:nowrap")}>{p.no}</button>
                  </div>
                )}
                {p.resolved && (
                  <div style={S(`display:flex;align-items:center;flex-wrap:wrap;gap:10px;margin-top:16px;padding:11px 14px;border-radius:8px;background:${p.outTint};border:1px solid ${p.outBorder}`)}>
                    <span style={S(`font-size:12.5px;font-weight:700;color:${p.outFg};white-space:nowrap`)}>{p.outLabel}</span>
                    <span style={S("font-size:11.5px;line-height:1.5;color:#6B6B61;min-width:0")}>{p.outNote}</span>
                    <button onClick={p.undo} className="by-h-ink" style={S("margin-left:auto;padding:5px 12px;border-radius:6px;border:1px solid #D3D3C4;background:#fff;font-size:11px;font-weight:700;color:#14170F;white-space:nowrap")}>Undo</button>
                  </div>
                )}
              </div>
              <div style={S("background:#F7F7EF;border:1px solid #E5E5DA;border-radius:10px;padding:14px 16px;display:flex;flex-direction:column;gap:9px")}>
                {p.rows.map((r, j) => (
                  <div key={j} style={S("display:grid;grid-template-columns:104px 1fr;gap:10px;align-items:baseline")}>
                    <div style={S(`font-size:10px;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;color:${r.c}`)}>{r.s}</div>
                    <div style={S("font-family:'Space Grotesk',sans-serif;font-size:10.5px;color:#14170F;line-height:1.5")}>{r.v}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {v.noPending && (
            <div style={S("padding:22px 0;border-bottom:1px solid #E5E5DA;font-size:12.5px;color:#6B6B61")}>Nothing waiting. New proposals land here before anything changes in the lake.</div>
          )}
        </div>

        <div style={S("margin-top:44px")}>
          <div style={S("display:flex;align-items:baseline;justify-content:space-between;border-bottom:2px solid #14170F;padding-bottom:10px")}>
            <div style={S("font-size:14px;font-weight:800")}>Done automatically</div>
            <div style={S("font-size:11px;color:#6B6B61")}>92 actions this month · every one above 90% confidence</div>
          </div>
          {v.autoActions.map((a, i) => (
            <div key={i} style={S("display:grid;grid-template-columns:minmax(0,1fr) 52px 84px;gap:18px;align-items:baseline;padding:14px 0;border-bottom:1px solid #E5E5DA")}>
              <div style={S("min-width:0")}>
                <div style={S("font-size:13px;font-weight:600;letter-spacing:-0.005em")}>{a.head}</div>
                <div style={S("font-family:'Space Grotesk',sans-serif;font-size:10.5px;color:#6B6B61;margin-top:4px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap")}>{a.detail}</div>
              </div>
              <div style={S("font-family:'Space Grotesk',sans-serif;font-size:10.5px;font-weight:700;color:#029B82;text-align:right")}>{a.conf}</div>
              <div style={S("font-size:10.5px;color:#6B6B61;text-align:right;white-space:nowrap")}>{a.when}</div>
            </div>
          ))}
          <div style={S("font-size:11px;color:#6B6B61;margin-top:12px")}>and 86 more · every action is logged with its rule and can be undone</div>
        </div>
      </div>
    </div>
  );
}
