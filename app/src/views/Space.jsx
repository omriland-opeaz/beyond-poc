import { S } from "../css.js";
import Funnel from "./Funnel.jsx";
import Series from "./Series.jsx";

/* Your space, read as a cross-section of the lake. Above the water: three towers --
   the count as a graphic, the narrowing, the currents -- and beneath them the strip of
   readings you keep level plus the one thing _beyond wants you to see first. Then the
   waterline, at the fold. What you scroll into is the water: what is still being
   measured, and the numbers behind it. */

const TINT = { "#C0473F": "rgba(192,71,63,.10)", "#029B82": "rgba(2,155,130,.10)", "#5F7A12": "rgba(200,240,104,.38)" };
const RED = "#C0473F", GREEN = "#029B82";

/* Direction drawn, not only coloured: up-right for a rise, down-left for a fall. */
function Arrow({ up, color, size = 9 }) {
  return (
    <svg viewBox="0 0 10 10" aria-hidden="true" style={S(`width:${size}px;height:${size}px;flex-shrink:0`)}>
      <path d={up ? "M2 8 L8 2 M3.5 2 H8 V6.5" : "M8 2 L2 8 M2 3.5 V8 H6.5"} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>
  );
}

/* A signed figure becomes a tinted pill with its arrow; a qualifier stays quiet text. */
function Pill({ text, color }) {
  if (!/^[+−-]/.test(text || "")) {
    return <span style={S(`font-size:11px;font-weight:700;color:${color};white-space:nowrap;flex-shrink:0`)}>{text}</span>;
  }
  return (
    <span style={S(`display:inline-flex;align-items:center;gap:4px;padding:3px 9px 3px 7px;border-radius:100px;background:${TINT[color] || "rgba(20,23,15,.06)"};color:${color};font-size:11.5px;font-weight:800;font-variant-numeric:tabular-nums;white-space:nowrap;flex-shrink:0;line-height:1.3`)}>
      <Arrow up={!/^[−-]/.test(text)} color={color} />{text}
    </span>
  );
}

/* Thin rounded bars, the bento's sparkline: the focus bar deep lime, the rest pale
   (a series) or grey (a ranking). They grow up from the baseline on arrival. */
function Spark({ bars }) {
  const w = 6;
  return (
    <span className="by-spark" style={S("display:flex;align-items:flex-end;gap:4px;height:44px;width:100%")}>
      {bars.map((b, i) => <i key={i} style={S(`display:block;width:${w}px;height:${b.h}%;background:${b.c};border-radius:100px;animation-delay:${420 + i * 35}ms`)}></i>)}
    </span>
  );
}

/* The round trend chip from the report card: a tinted disc with the arrow in it. */
function Chip({ up }) {
  const c = up ? GREEN : RED;
  return (
    <span style={S(`display:grid;place-items:center;width:24px;height:24px;border-radius:50%;background:${TINT[c]};flex-shrink:0`)}>
      <Arrow up={up} color={c} size={11} />
    </span>
  );
}

/* The hand-drawn circled value from the guidelines: a loose bezier that draws itself. */
function Circled({ text, delay }) {
  return (
    <span style={S("position:relative;display:grid;place-items:center;width:38px;height:34px;flex-shrink:0")}>
      <svg viewBox="0 0 40 36" aria-hidden="true" style={S("position:absolute;inset:0;width:100%;height:100%;overflow:visible")}>
        <path d="M29,5.5 C36,10 39,22 31,29 C24,35 9,34 5,25 C1,16 8,4 19,3 C25,2.4 31,5 34,10" fill="none" stroke="#A5CE3C" strokeWidth="3.2" strokeLinecap="round"
          style={S(`stroke-dasharray:110;stroke-dashoffset:110;animation:byDraw 520ms ease-out ${delay}ms forwards`)}></path>
      </svg>
      <span style={S("position:relative;font-size:10.5px;font-weight:800;font-variant-numeric:tabular-nums;color:#0B2233")}>{text}</span>
    </span>
  );
}

/* The provenance line: what put this here, and the memory it came from. Two lines,
   so the reason is never crushed to make room for its own metadata. */
function Because({ w }) {
  return (
    <div style={S("display:grid;grid-template-columns:5px 1fr;column-gap:8px;row-gap:2px;align-items:center;padding:6px 20px 10px;flex-shrink:0;overflow:hidden;font-variant-numeric:tabular-nums;border-top:1px solid rgba(20,23,15,.08)")}>
      <span style={S(`width:5px;height:5px;border-radius:50%;background:${w.whyDot}`)}></span>
      {w.fromMemory ? (
        <button onClick={w.toMemory} className="by-h-ink" style={S("justify-self:start;border:none;background:none;padding:0;font:inherit;font-size:10px;color:#6B6B61;text-align:left;border-bottom:1px solid #D3D3C4;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100%")}>{w.because}</button>
      ) : (
        <span style={S("font-size:10px;color:#6B6B61;overflow:hidden;text-overflow:ellipsis;white-space:nowrap")}>{w.because}</span>
      )}
      <span></span>
      <span style={S("display:flex;gap:8px;font-size:10px;color:#A3A399;white-space:nowrap;overflow:hidden;text-overflow:ellipsis")}>
        <span>{w.becauseWhen}</span>
        {w.fromMemory && <span style={S("margin-left:auto")}>from memory · yours to delete →</span>}
      </span>
    </div>
  );
}

function Climb({ text }) {
  return (
    <span style={S("display:flex;align-items:center;gap:6px;min-width:0")}>
      <svg viewBox="0 0 34 20" aria-hidden="true" style={S("width:22px;height:13px;flex-shrink:0;overflow:visible")}>
        <path className="by-mark" d="M3,17 C8,9 15,4.5 26,3.6" fill="none" stroke="#A5CE3C" strokeWidth="3.2" strokeLinecap="round"></path>
        <path className="by-mark by-mark-b" d="M19.5,2.4 L27,3.4 L25.4,10.6" fill="none" stroke="#A5CE3C" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"></path>
      </svg>
      <span style={S("font-size:10px;font-weight:700;line-height:1.3;color:#5F7A12;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0")}>{text}</span>
    </span>
  );
}

const CARD = "background:#fff;border:1px solid #E5E5DA;border-radius:12px;overflow:hidden;display:flex;flex-direction:column;min-width:0;font-variant-numeric:tabular-nums";
const HEAD = "font-size:20px;font-weight:800;letter-spacing:-0.02em;line-height:1.15;text-wrap:pretty";
const SUB = "font-size:10.5px;color:#6B6B61;margin-top:3px";

export default function Space({ v }) {
  const F = v.spaceFunnel, C = v.spaceSeries, P = v.spaceSpot;
  return (
    <div style={S("display:flex;flex-direction:column;min-height:100%;background:#F7F7EF;animation:byFade 160ms ease-out")}>
      <div style={S("flex:1;min-height:0;display:flex;flex-direction:column;padding:26px 40px 0")}>

        {/* ---- three towers ------------------------------------------------- */}
        <div style={S("display:grid;grid-template-columns:repeat(12,1fr);grid-template-rows:minmax(460px,auto);gap:14px")}>

          {/* The count as a graphic. Ripples top-right: the stone dropped in. */}
          <div style={S("grid-column:1/5;position:relative;background:#14170F;border-radius:12px;padding:22px 24px 24px;display:flex;flex-direction:column;min-width:0;overflow:hidden;animation:byRise 520ms ease-out both")}>
            <svg viewBox="0 0 220 220" aria-hidden="true" style={S("position:absolute;right:0;top:0;width:220px;height:220px;pointer-events:none")}>
              <circle cx="196" cy="24" r="54" fill="none" stroke="rgba(247,247,239,.16)" strokeWidth="1.5"></circle>
              <circle cx="196" cy="24" r="86" fill="none" stroke="rgba(247,247,239,.11)" strokeWidth="1.5"></circle>
              <circle cx="196" cy="24" r="118" fill="none" stroke="rgba(247,247,239,.07)" strokeWidth="1.5"></circle>
            </svg>
            <span style={S("align-self:flex-start;display:inline-flex;padding:4px 10px;border-radius:100px;background:rgba(247,247,239,.10);font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:rgba(247,247,239,.62)")}>{v.spaceTag}</span>
            <span style={S("font-size:10.5px;color:rgba(247,247,239,.55);margin-top:26px")}>{v.spaceLead}</span>
            <span style={S("font-size:210px;font-weight:800;letter-spacing:-0.06em;line-height:.82;font-variant-numeric:tabular-nums;color:#C8F068;margin-top:6px")}>{v.spaceN}</span>
            <span style={S("font-size:28px;font-weight:800;letter-spacing:-0.03em;line-height:1.2;color:#F7F7EF;margin-top:10px;text-wrap:pretty")}>{v.spaceNLabel}</span>
            <span style={S("font-size:10.5px;color:rgba(247,247,239,.5);margin-top:14px;font-variant-numeric:tabular-nums")}>{v.spaceKicker} · {v.spaceStamp}</span>
            <button onClick={v.goHome} className="by-cta" style={S("margin-top:auto;align-self:flex-start;padding:10px 20px;border-radius:100px;border:none;background:#C8F068;color:#14170F;font-size:13px;font-weight:800;letter-spacing:-0.01em")}>Ask something new →</button>
          </div>

          {/* The narrowing. */}
          <div className="by-h-tint" style={S(`grid-column:5/9;${CARD};animation:byRise 520ms ease-out 80ms both`)}>
            <button onClick={F.open} style={S("flex:1;min-height:0;display:flex;flex-direction:column;text-align:left;padding:20px 22px 12px;border:none;background:transparent;font:inherit;color:inherit;min-width:0")}>
              <span style={S(HEAD)}>{F.title}</span>
              <span style={S(SUB)}>{F.sub}</span>
              <span style={S("display:block;flex:1;min-height:0;margin-top:14px")}>
                <Funnel stages={F.stages} orientation="vertical" size={v.showWhy ? 310 : 336} />
              </span>
            </button>
            {v.showWhy && <Because w={v.why(F)} />}
          </div>

          {/* The currents: three districts on one field, then the rows. */}
          <div className="by-h-tint" style={S(`grid-column:9/13;${CARD};animation:byRise 520ms ease-out 160ms both`)}>
            <button onClick={C.open} style={S("flex:1;min-height:0;display:flex;flex-direction:column;text-align:left;padding:20px 22px 12px;border:none;background:transparent;font:inherit;color:inherit;min-width:0")}>
              <span style={S(HEAD)}>{C.title}</span>
              <span style={S(SUB)}>{C.sub}</span>
              {C.moved && <span style={S("margin-top:6px")}><Climb text={C.moved} /></span>}
              <span style={S("display:flex;gap:14px;margin-top:12px")}>
                {C.series.map(s => (
                  <span key={s.name} style={S("display:inline-flex;align-items:center;gap:6px;font-size:10px;color:#6B6B61")}>
                    <span style={S(`width:8px;height:8px;border-radius:2px;background:${s.color}`)}></span>{s.name}
                  </span>
                ))}
              </span>
              <span style={S("display:block;margin-top:10px")}>
                <Series series={C.series} labels={C.labels} height={C.moved ? 140 : 160} title={C.title} />
              </span>
              <span style={S("display:flex;flex-direction:column;margin-top:8px")}>
                {C.rows.map((r, i) => {
                  const s = C.series.find(x => x.name === r.name);
                  return (
                    <span key={r.name} style={S(`display:grid;grid-template-columns:8px 1fr auto 24px;gap:10px;align-items:center;padding:5px 0;border-top:1px solid #E5E5DA;animation:byRise 420ms ease-out ${380 + i * 70}ms both`)}>
                      <span style={S(`width:8px;height:8px;border-radius:2px;${s ? `background:${s.color}` : "background:#E5E5DA"}`)}></span>
                      <span style={S("font-size:12px;font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap")}>{r.name}</span>
                      <span style={S(`font-size:12.5px;font-weight:800;font-variant-numeric:tabular-nums;color:${r.up ? GREEN : RED}`)}>{r.v}</span>
                      <Chip up={r.up} />
                    </span>
                  );
                })}
              </span>
            </button>
            {v.showWhy && <Because w={v.why(C)} />}
          </div>
        </div>

        {/* ---- the strip and the spotlight --------------------------------- */}
        <div style={S("display:grid;grid-template-columns:repeat(12,1fr);grid-template-rows:minmax(158px,auto);gap:14px;margin-top:14px")}>

          <div style={S(`grid-column:1/9;${CARD};flex-direction:row;display:grid;grid-template-columns:repeat(3,1fr);animation:byRise 520ms ease-out 240ms both`)}>
            {v.spaceStill.map((t, i) => {
              const [lead, ...rest] = t.against.split(" ");
              return (
                <button key={t.key} onClick={t.open} className="by-h-tint" style={S(`display:flex;flex-direction:column;justify-content:space-between;gap:10px;text-align:left;padding:18px 20px 16px;border:none;border-left:${i ? "1px solid #E5E5DA" : "none"};background:transparent;font:inherit;color:inherit;min-width:0`)}>
                  <span style={S("display:flex;flex-direction:column;gap:2px;min-width:0")}>
                    <span style={S("font-size:13px;font-weight:700;letter-spacing:-0.01em;line-height:1.25;min-height:33px;text-wrap:pretty")}>{t.title}</span>
                    <span style={S("font-size:10.5px;color:#6B6B61;overflow:hidden;text-overflow:ellipsis;white-space:nowrap")}>{t.foot}</span>
                  </span>
                  <Spark bars={t.spark} />
                  <span style={S("display:flex;flex-direction:column;gap:6px;min-width:0")}>
                    <span style={S("display:flex;align-items:center;gap:10px;min-width:0")}>
                      <span style={S("font-size:30px;font-weight:800;letter-spacing:-0.03em;font-variant-numeric:tabular-nums;line-height:1.15")}>{t.v}</span>
                      <Pill text={t.delta} color={t.dc} />
                    </span>
                    <span style={S("font-size:11px;color:#6B6B61;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-variant-numeric:tabular-nums")}>
                      <span style={S(`font-weight:700;color:${/^[+−-]/.test(lead) ? t.dc : "#14170F"}`)}>{lead}</span> {rest.join(" ")}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* The one thing to see first. */}
          <div className={P.up ? "by-h-spot-rise" : "by-h-spot-fall"} style={S(`grid-column:9/13;${CARD};background:${P.up ? "rgba(200,240,104,.28)" : "rgba(192,71,63,.09)"};border-color:${P.up ? "rgba(95,122,18,.22)" : "rgba(192,71,63,.22)"};animation:byRise 520ms ease-out 300ms both`)}>
            <button onClick={P.open} style={S("flex:1;min-height:0;display:flex;flex-direction:column;gap:6px;text-align:left;padding:16px 20px 12px;border:none;background:transparent;font:inherit;color:inherit;min-width:0")}>
              <span style={S("display:flex;align-items:center;justify-content:space-between;gap:10px")}>
                <Arrow up={P.up} color={P.up ? "#14170F" : RED} size={22} />
                {P.moved ? <Climb text={P.moved} /> : <span style={S(`font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:${P.up ? "#14170F" : RED}`)}>{P.kicker}</span>}
              </span>
              <span style={S("display:flex;align-items:baseline;gap:10px;flex-wrap:wrap")}>
                <span style={S(`font-size:46px;font-weight:800;letter-spacing:-0.04em;font-variant-numeric:tabular-nums;line-height:1.2;color:${P.up ? "#14170F" : RED}`)}>{P.big}</span>
                {P.moved && <span style={S(`font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:${P.up ? "#14170F" : RED}`)}>{P.kicker}</span>}
              </span>
              <span style={S("font-size:13px;font-weight:700;letter-spacing:-0.01em;line-height:1.3;text-wrap:pretty")}>{P.head}</span>
              <span style={S("font-size:10.5px;color:#6B6B61;overflow:hidden;text-overflow:ellipsis;white-space:nowrap")}>{P.sub}</span>
              <span style={S("margin-top:auto;padding-top:4px;font-size:12px;font-weight:700;color:#14170F;white-space:nowrap")}>{P.up ? "Ask about this →" : "Ask why →"}</span>
            </button>
            {v.showWhy && <Because w={v.why(P)} />}
          </div>
        </div>

        <svg viewBox="0 0 600 14" preserveAspectRatio="none" aria-hidden="true" style={S("display:block;width:calc(100% + 80px);height:16px;margin:16px -40px 0;overflow:visible")}>
          <path d="M2,9 C58,3 96,12 158,7 C220,2 262,11 322,7 C382,3 428,12 486,7 C540,2 572,10 598,6" fill="none" stroke="#A5CE3C" strokeWidth="3" strokeLinecap="round"></path>
        </svg>

        {/* ---- below the surface -------------------------------------------- */}
        <div style={S("flex:1;min-height:0;margin:0 -40px;padding:18px 40px 26px;background:linear-gradient(rgba(159,209,242,.24),rgba(91,155,217,.56))")}>
          <div style={S("display:grid;grid-template-columns:repeat(12,1fr);gap:14px")}>

            <div style={S("grid-column:1/9;border:1px solid rgba(11,34,51,.10);border-radius:12px;background:rgba(255,255,255,.72);padding:14px 20px 6px;font-variant-numeric:tabular-nums;animation:byRise 520ms ease-out 380ms both")}>
              <div style={S("display:flex;align-items:baseline;flex-wrap:wrap;gap:12px;padding-bottom:8px")}>
                <div style={S("font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#0B2233;opacity:.75")}>{v.deepKicker}</div>
                <div style={S("font-size:10.5px;color:#0B2233;opacity:.7")}>{v.deepNote}</div>
              </div>
              {v.spaceDeep.map((d, i) => (
                <div key={d.key} style={S(`display:grid;grid-template-columns:38px 1fr auto auto;gap:14px;align-items:center;padding:10px 0;border-top:1px solid rgba(11,34,51,.09);animation:byRise 420ms ease-out ${460 + i * 80}ms both`)}>
                  <Circled text={d.confMark} delay={700 + i * 90} />
                  <span style={S("display:flex;flex-direction:column;gap:2px;min-width:0")}>
                    <span style={S("font-size:12.5px;font-weight:700;letter-spacing:-0.01em;line-height:1.35;color:#0B2233;text-wrap:pretty")}>{d.head}</span>
                    <span style={S("font-size:10.5px;line-height:1.45;color:rgba(11,34,51,.66);text-wrap:pretty")}>{d.note}</span>
                  </span>
                  <span style={S("display:inline-flex;align-items:center;height:20px;padding:0 10px;border-radius:20px;border:1px solid rgba(11,34,51,.16);font-size:10px;font-weight:700;letter-spacing:0.07em;text-transform:uppercase;color:#0B2233;opacity:.7;white-space:nowrap")}>{d.tag}</span>
                  <button onClick={d.toggle} className="by-h-ink" style={S(`padding:5px 12px;border-radius:100px;border:1px solid ${d.btnBorder};background:${d.btnBg};font-size:10.5px;font-weight:700;color:${d.btnFg};white-space:nowrap`)}>{d.btn}</button>
                </div>
              ))}
            </div>

            {/* The numbers behind the doubt: arrow, figure, qualifier, what it counts. */}
            <div style={S("grid-column:9/13;display:grid;grid-template-columns:1fr 1fr;grid-auto-rows:1fr;gap:14px")}>
              {v.spaceDeepFacts.map((f, i) => (
                <div key={i} style={S(`border:1px solid rgba(11,34,51,.10);border-radius:12px;background:rgba(255,255,255,.72);padding:14px 16px 12px;display:flex;flex-direction:column;gap:10px;min-width:0;font-variant-numeric:tabular-nums;animation:byRise 420ms ease-out ${440 + i * 70}ms both`)}>
                  <svg viewBox="0 0 34 20" aria-hidden="true" style={S("width:22px;height:13px;overflow:visible")}><path d="M3,17 C8,9 15,4.5 26,3.6" fill="none" stroke="#A5CE3C" strokeWidth="3.2" strokeLinecap="round"></path></svg>
                  <span style={S("display:flex;align-items:baseline;gap:8px;min-width:0")}>
                    <span style={S("font-size:30px;font-weight:800;letter-spacing:-0.03em;line-height:1.15;color:#0B2233")}>{f.v}</span>
                    <span style={S("font-size:10.5px;font-weight:700;color:rgba(11,34,51,.6);white-space:nowrap")}>{f.d}</span>
                  </span>
                  <span style={S("font-size:10.5px;line-height:1.4;color:rgba(11,34,51,.66);text-wrap:pretty")}>{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={S("flex-shrink:0;padding:12px 44px;border-top:1px solid #E5E5DA;font-size:10.5px;color:#6B6B61")}>
        Nothing here was configured. Every line above says what put it there.
      </div>
    </div>
  );
}
