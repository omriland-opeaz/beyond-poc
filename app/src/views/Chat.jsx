import { S } from "../css.js";
import { AnswerChart } from "./Charts.jsx";

export default function Chat({ v }) {
  return (
    <div style={S("display:flex;flex-direction:column;height:100%;animation:byFade 160ms ease-out")}>
      <div style={S("flex:1;overflow:auto")}>
        <div style={S("max-width:860px;margin:0 auto;padding:34px 44px 30px")}>

          {v.thread.map((m, i) => (
            <div key={i} style={S("margin-bottom:26px")}>

              {m.isUser && (
                <div style={S("display:flex;justify-content:flex-end")}>
                  <div style={S("max-width:540px;background:#F7F7EF;border:1px solid #E5E5DA;border-radius:12px 12px 4px 12px;padding:14px 18px;font-size:13.5px;line-height:1.55")}>{m.text}</div>
                </div>
              )}

              {m.isBeyondAsk && (
                <div style={S("display:flex;justify-content:flex-start")}>
                  <div style={S("max-width:560px;background:#14170F;color:#F7F7EF;border-radius:12px 12px 12px 4px;padding:15px 19px")}>
                    <div style={S("font-size:9.5px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#C8F068")}>Asked for you</div>
                    <div style={S("font-size:13.5px;line-height:1.55;margin-top:8px")}>{m.text}</div>
                    <div style={S("font-size:11.5px;line-height:1.65;color:rgba(247,247,239,.72);margin-top:9px")}>{m.why}</div>
                  </div>
                </div>
              )}

              {m.isAnswer && (
                <>
                  <div style={S("max-width:700px")}>
                    <h2 style={S("font-size:24px;font-weight:800;letter-spacing:-0.025em;line-height:1.2;margin:0")}>{m.head} <span style={S("color:#5F7A12")}>{m.headAccent}</span></h2>
                    <p style={S("font-size:13.5px;line-height:1.7;color:#6B6B61;margin:12px 0 24px")}>{m.body}</p>
                  </div>
                  <div style={S("border-top:2px solid #14170F;padding-top:14px")}>
                    <div style={S("display:flex;align-items:baseline;justify-content:space-between;margin-bottom:14px")}>
                      <div style={S("font-size:12.5px;font-weight:700")}>{m.chartTitle}</div>
                      <div style={S("display:flex;gap:8px")}>
                        <button onClick={v.toggleWatch} className="by-h-ink" style={S(`padding:5px 11px;border-radius:6px;border:1px solid ${v.watchBorder};background:${v.watchBg};font-size:11px;font-weight:700;color:${v.watchFg};white-space:nowrap`)}>{v.watchLabel}</button>
                        <button onClick={v.toggleAlert} className="by-h-ink" style={S(`padding:5px 11px;border-radius:6px;border:1px solid ${v.alertBorder};background:${v.alertBg};font-size:11px;font-weight:700;color:${v.alertFg};white-space:nowrap`)}>{v.alertLabel}</button>
                        <button className="by-h-ink" style={S("padding:5px 11px;border-radius:6px;border:1px solid #D3D3C4;background:#fff;font-size:11px;font-weight:600;color:#6B6B61")}>Export</button>
                      </div>
                    </div>
                    <AnswerChart chart={m.chart} title={m.chartTitle} />
                  </div>
                  <div style={S("display:grid;grid-template-columns:96px 1fr;gap:18px;padding:14px 0;border-top:1px solid #E5E5DA;border-bottom:1px solid #E5E5DA;margin-top:22px")}>
                    <div style={S("font-size:10px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#6B6B61")}>Method</div>
                    <div style={S("font-size:11.5px;line-height:1.6;color:#6B6B61")}>{m.method}</div>
                  </div>
                </>
              )}

              {/* _beyond argues with the question */}
              {m.isChallenge && (
                <div style={S("border:1px solid #14170F;border-radius:14px;overflow:hidden")}>
                  <div style={S("background:#14170F;color:#F7F7EF;padding:15px 20px 16px")}>
                    <div style={S("font-size:9.5px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#C8F068")}>{m.kicker}</div>
                    <div style={S("font-size:18px;font-weight:800;letter-spacing:-0.02em;line-height:1.3;margin-top:8px")}>{m.head}</div>
                    <div style={S("font-size:12.5px;line-height:1.65;color:rgba(247,247,239,.74);margin-top:8px;max-width:600px")}>{m.body}</div>
                  </div>
                  <div style={S("background:#fff;padding:14px 20px;display:flex;flex-wrap:wrap;align-items:center;gap:10px")}>
                    <button onClick={m.cta} className="by-h-lime" style={S("padding:10px 18px;border-radius:100px;border:none;background:#C8F068;color:#14170F;font-size:12.5px;font-weight:800")}>{m.ctaLabel}</button>
                    <button onClick={m.alt} className="by-h-ink" style={S("padding:10px 16px;border-radius:100px;border:1px solid #D3D3C4;background:#fff;font-size:12.5px;font-weight:600;color:#14170F")}>{m.altLabel}</button>
                  </div>
                </div>
              )}

              {/* coverage is thin: _beyond asks before it acts */}
              {m.isExpand && (
                <div style={S("border:1px solid #D3D3C4;border-radius:14px;background:#fff;padding:18px 20px")}>
                  <div style={S("display:flex;align-items:center;gap:9px")}>
                    <span style={S("font-size:9.5px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#9A5C0F")}>{m.kicker}</span>
                    <span style={S("height:1px;flex:1;background:#E5E5DA")}></span>
                  </div>
                  <div style={S("font-size:17px;font-weight:800;letter-spacing:-0.02em;line-height:1.3;margin-top:10px")}>{m.head}</div>
                  <div style={S("font-size:12.5px;line-height:1.65;color:#6B6B61;margin-top:8px;max-width:620px")}>{m.body}</div>
                  <div style={S("display:flex;flex-direction:column;gap:0;margin-top:16px;border-top:1px solid #E5E5DA")}>
                    {m.rows.map((r, j) => (
                      <div key={j} style={S("display:grid;grid-template-columns:22px minmax(0,1fr) auto;gap:12px;align-items:baseline;padding:11px 0;border-bottom:1px solid #E5E5DA")}>
                        <div style={S("font-size:10.5px;font-weight:700;color:#A3A399;font-variant-numeric:tabular-nums")}>{r.n}</div>
                        <div style={S("min-width:0")}>
                          <div style={S("font-size:12.5px;font-weight:600")}>{r.head}</div>
                          <div style={S("font-size:11px;color:#6B6B61;margin-top:3px")}>{r.note}</div>
                        </div>
                        <div style={S(`font-size:10px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:${r.tagFg};white-space:nowrap`)}>{r.tag}</div>
                      </div>
                    ))}
                  </div>
                  <div style={S("display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin-top:16px")}>
                    <button onClick={m.cta} className="by-h-lime" style={S("padding:10px 18px;border-radius:100px;border:none;background:#C8F068;color:#14170F;font-size:12.5px;font-weight:800")}>{m.ctaLabel}</button>
                    <button onClick={m.alt} className="by-h-ink" style={S("padding:10px 16px;border-radius:100px;border:1px solid #D3D3C4;background:#fff;font-size:12.5px;font-weight:600;color:#14170F")}>{m.altLabel}</button>
                    <span style={S("font-size:10.5px;color:#A3A399;margin-left:auto;max-width:320px;text-align:right;text-wrap:pretty")}>{m.note}</span>
                  </div>
                </div>
              )}

              {/* what the expansion actually did */}
              {m.isExpanded && (
                <div style={S("border-left:3px solid #C8F068;padding:2px 0 2px 16px")}>
                  <div style={S("font-size:9.5px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#5F7A12")}>{m.kicker}</div>
                  <div style={S("display:flex;flex-direction:column;gap:7px;margin-top:10px")}>
                    {m.rows.map((r, j) => (
                      <div key={j} style={S("display:grid;grid-template-columns:minmax(0,1fr) auto;gap:14px;align-items:baseline")}>
                        <div style={S("font-size:12.5px;color:#14170F;min-width:0")}>{r.head}</div>
                        <div style={S(`font-size:10.5px;font-weight:700;color:${r.tagFg};white-space:nowrap`)}>{r.tag}</div>
                      </div>
                    ))}
                  </div>
                  <div style={S("font-size:11.5px;line-height:1.6;color:#6B6B61;margin-top:12px;max-width:600px")}>{m.foot}</div>
                </div>
              )}

              {/* the agent writes to its own memory, and shows you what it wrote */}
              {m.isMemory && (
                <div style={S("border:1px solid #C8F068;border-radius:14px;background:#FBFEF3;padding:18px 20px")}>
                  <div style={S("display:flex;align-items:center;gap:10px")}>
                    <span style={S("width:18px;height:18px;border-radius:5px;background:#C8F068;overflow:hidden;position:relative;flex-shrink:0")}>
                      <span style={S("position:absolute;right:-4px;bottom:-4px;width:14px;height:14px;border-radius:50%;background:#14170F")}></span>
                    </span>
                    <span style={S("font-size:9.5px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#5F7A12")}>{m.kicker}</span>
                    <span style={S("margin-left:auto;font-size:10.5px;color:#6B6B61")}>{m.when}</span>
                  </div>
                  <div style={S("font-size:16.5px;font-weight:800;letter-spacing:-0.02em;line-height:1.35;margin-top:11px;max-width:600px")}>{m.head}</div>
                  <div style={S("display:flex;flex-direction:column;margin-top:14px;border-top:1px solid #E5E5DA")}>
                    {m.rows.map((r, j) => (
                      <div key={j} style={S("display:grid;grid-template-columns:minmax(0,1fr) auto;gap:14px;align-items:baseline;padding:11px 0;border-bottom:1px solid #E5E5DA")}>
                        <div style={S("min-width:0")}>
                          <div style={S("font-size:12.5px;font-weight:600;text-wrap:pretty")}>{r.head}</div>
                          <div style={S("font-size:11px;color:#6B6B61;margin-top:3px")}>{r.note}</div>
                        </div>
                        <button onClick={r.forget} className="by-h-ink" style={S(`padding:4px 11px;border-radius:100px;border:1px solid #D3D3C4;background:#fff;font-size:10.5px;font-weight:700;color:${r.btnFg};white-space:nowrap`)}>{r.btn}</button>
                      </div>
                    ))}
                  </div>
                  <div style={S("font-size:11px;line-height:1.6;color:#6B6B61;margin-top:12px")}>{m.foot}</div>
                </div>
              )}

              {m.isNone && (
                <div style={S("max-width:680px;border-top:2px solid #14170F;padding-top:18px")}>
                  <h2 style={S("font-size:20px;font-weight:800;letter-spacing:-0.02em;line-height:1.3;margin:0")}>No sourced read for that question yet.</h2>
                  <p style={S("font-size:13.5px;line-height:1.7;color:#6B6B61;margin:10px 0 0")}>This prototype runs on a handful of measured reads. Everything else would be a number without a source, and <span style={S("font-family:'Space Grotesk',sans-serif;font-weight:700;letter-spacing:-0.02em;color:#14170F")}>_beyond</span> does not publish those. Pick one below, or connect the source that would answer it.</p>
                </div>
              )}

            </div>
          ))}

          <div style={S("display:flex;flex-wrap:wrap;gap:8px;margin-top:20px")}>
            {v.followUps.map((f, i) => (
              <button key={i} onClick={f.ask} className="by-h-chip" style={S("padding:8px 14px;border-radius:20px;border:1px solid #D3D3C4;background:#fff;font-size:12px;font-weight:500;color:#14170F;text-align:left")}>{f.t}</button>
            ))}
          </div>
        </div>
      </div>
      <div style={S("flex-shrink:0;padding:18px 44px 22px;border-top:1px solid #E5E5DA;background:#fff")}>
        <div style={S("max-width:860px;margin:0 auto;position:relative")}>
          <input
            id="by-ask-chat"
            value={v.draft}
            onChange={v.setDraft}
            onKeyDown={v.askKey}
            placeholder="Ask a follow-up"
            aria-label="Ask a follow-up"
            style={S("width:100%;background:#F7F7EF;border:1.5px solid #E5E5DA;border-radius:10px;padding:14px 56px 14px 18px;font-size:13.5px;outline:none;color:#14170F")}
          />
          <button onClick={v.askSend} aria-label="Ask" style={S(`position:absolute;right:7px;top:50%;transform:translateY(-50%);width:34px;height:34px;border-radius:8px;background:${v.askBg};border:none;display:grid;place-items:center;color:#14170F;font-size:14px;font-weight:700;cursor:${v.askCursor}`)}>→</button>
        </div>
        <div style={S("max-width:860px;margin:8px auto 0;font-size:10.5px;color:#6B6B61;text-align:center")}>Answers are read from the lake. <span style={S("font-family:'Space Grotesk',sans-serif;font-weight:700;letter-spacing:-0.02em;color:#14170F")}>_beyond</span> does not write to your sources.</div>
      </div>
    </div>
  );
}
