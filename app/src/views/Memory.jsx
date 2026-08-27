import { S } from "../css.js";

/* Everything the agent learned, in the open, where you can delete any of it. */

export default function Memory({ v }) {
  return (
    <div style={S("height:100%;overflow:auto")}>
      <div style={S("max-width:880px;margin:0 auto;padding:30px 44px 64px")}>
        <div style={S("font-size:10.5px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#6B6B61;margin-bottom:14px")}>Memory · what it remembers about you</div>
        <h1 style={S("font-size:30px;font-weight:800;letter-spacing:-0.025em;line-height:1.2;margin:0;max-width:740px;text-wrap:pretty")}>{v.memCount} things learned from your questions. <span style={S("color:#5F7A12")}>Every one of them is yours to delete.</span></h1>
        <p style={S("font-size:13px;line-height:1.65;color:#6B6B61;margin:12px 0 0;max-width:640px")}>Memory shapes the next answer: which cut <span style={S("font-family:'Space Grotesk',sans-serif;font-weight:700;letter-spacing:-0.02em;color:#14170F")}>_beyond</span> reaches for first, when it refuses to lead with a directional number, what it thinks you are measured on. It never leaves your lake and it is never sent to a source.</p>

        {v.memGroups.map((g, i) => (
          <div key={i} style={S("margin-top:34px")}>
            <div style={S("display:flex;align-items:baseline;justify-content:space-between;border-bottom:2px solid #14170F;padding-bottom:9px")}>
              <div style={S("font-size:14px;font-weight:800")}>{g.title}</div>
              <div style={S("font-size:11px;color:#6B6B61")}>{g.note}</div>
            </div>
            {g.rows.map((r, j) => (
              <div key={j} style={S("display:grid;grid-template-columns:minmax(0,1fr) 120px auto;gap:18px;align-items:baseline;padding:14px 0;border-bottom:1px solid #E5E5DA")}>
                <div style={S("min-width:0")}>
                  <div style={S(`font-size:13px;font-weight:600;letter-spacing:-0.005em;color:${r.fg};text-wrap:pretty`)}>{r.head}</div>
                  <div style={S("font-size:10.5px;color:#6B6B61;margin-top:4px")}>{r.note}</div>
                </div>
                <div style={S("font-size:10.5px;color:#6B6B61;text-align:right")}>{r.when}</div>
                <button onClick={r.forget} className="by-h-ink" style={S(`padding:5px 12px;border-radius:100px;border:1px solid #D3D3C4;background:#fff;font-size:10.5px;font-weight:700;color:${r.btnFg};white-space:nowrap`)}>{r.btn}</button>
              </div>
            ))}
          </div>
        ))}

        <div style={S("font-size:11px;color:#6B6B61;margin-top:22px")}>Memory is written only from your own questions and your own lake. <span style={S("font-family:'Space Grotesk',sans-serif;font-weight:700;letter-spacing:-0.02em;color:#14170F")}>_beyond</span> never reads another customer's memory, and never writes back to a source.</div>
      </div>
    </div>
  );
}
