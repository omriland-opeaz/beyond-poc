import { S } from "../css.js";
import { CardChart } from "./Charts.jsx";

/* Your space, read as a cross-section of the lake: what surfaced, the level you
   keep, and what is still too deep to bring up. The one drawing on the screen is
   the waterline itself, and the bands sit either side of it.

   Band 1 is a fixed grid: the statement tile anchors the left, and the other
   three current cards fill the remaining slots by ROLE, not by array position --
   whichever card isAlert always takes the wide top slot (see slotsFor below);
   when no card is an alert, the first card in the current order does, so the
   layout never depends on where a card happens to sit in the array. */

function Because({ c }) {
  return (
    <div style={S("display:flex;align-items:center;flex-wrap:nowrap;gap:8px;padding:4px 18px 6px;flex-shrink:0;overflow:hidden")}>
      <span style={S(`width:5px;height:5px;border-radius:50%;background:${c.whyDot};flex-shrink:0`)}></span>
      {c.fromMemory ? (
        <button onClick={c.toMemory} className="by-h-ink" style={S("border:none;background:none;padding:0;font:inherit;font-size:10px;color:#6B6B61;text-align:left;border-bottom:1px solid #D3D3C4;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0")}>{c.because}</button>
      ) : (
        <span style={S("font-size:10px;color:#6B6B61;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0")}>{c.because}</span>
      )}
      <span style={S("font-size:10px;color:#A3A399;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:28px;flex-shrink:3")}>· {c.becauseWhen}</span>
      {c.fromMemory && (
        <span style={S("margin-left:auto;font-size:10px;color:#A3A399;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0;flex-shrink:1")}>from memory · yours to delete →</span>
      )}
    </div>
  );
}

function ClimbRow({ c }) {
  return (
    <span style={S("display:flex;align-items:center;gap:6px")}>
      <svg viewBox="0 0 34 20" aria-hidden="true" style={S("width:22px;height:13px;flex-shrink:0;overflow:visible")}>
        <path className="by-mark" d="M3,17 C8,9 15,4.5 26,3.6" fill="none" stroke="#A5CE3C" strokeWidth="3.2" strokeLinecap="round"></path>
        <path className="by-mark by-mark-b" d="M19.5,2.4 L27,3.4 L25.4,10.6" fill="none" stroke="#A5CE3C" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"></path>
      </svg>
      <span style={S("font-size:10px;font-weight:700;line-height:1.3;color:#5F7A12;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0")}>{c.movedWhy}</span>
    </span>
  );
}

/* Slots for the current spaceCurrent cards: whichever card isAlert takes the
   wide top of band 1, driven by that view-model flag rather than array index
   -- see the note above. The other two fill row two in whatever order remains. */
function slotsFor(cards) {
  const primeIdx = Math.max(0, cards.findIndex(c => c.isAlert));
  let seen = 0;
  return cards.map((c, i) => i === primeIdx ? "grid-column:6/13;grid-row:1"
    : (++seen === 1 ? "grid-column:6/10;grid-row:2" : "grid-column:10/13;grid-row:2"));
}

function AlertTile({ c, slot }) {
  return (
    <div style={S(`${slot};background:rgba(192,71,63,.04);border:1px solid #E5E5DA;border-left:3px solid #C0473F;border-radius:12px;overflow:hidden;display:flex;flex-direction:column;min-width:0;animation:${c.rise}`)}>
      <button onClick={c.open} className="by-h-alert" style={S("flex:1 0 auto;display:flex;flex-direction:column;gap:4px;text-align:left;padding:12px 18px 4px;border:none;background:transparent;font:inherit;color:inherit;min-width:0;overflow:hidden")}>
        {c.climbs && <ClimbRow c={c} />}
        <span style={S("font-size:9.5px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#C0473F;white-space:nowrap;flex-shrink:0")}>{c.kicker}</span>
        <span style={S("font-size:17px;font-weight:800;letter-spacing:-0.015em;line-height:1.22;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;text-wrap:pretty;flex-shrink:0")}>{c.head}</span>
        <span style={S("font-size:11.5px;color:#6B6B61;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex-shrink:0")}>{c.sub}</span>
        <span style={S("margin-top:auto;font-size:12px;font-weight:700;color:#14170F;white-space:nowrap;flex-shrink:0")}>Ask why →</span>
      </button>
      {c.showWhy && <Because c={c} />}
    </div>
  );
}

function FindingTile({ c, slot }) {
  return (
    <div style={S(`${slot};background:#fff;border:1px solid #E5E5DA;border-radius:12px;overflow:hidden;display:flex;flex-direction:column;min-width:0;animation:${c.rise}`)}>
      <button onClick={c.open} className="by-h-tint" style={S("flex:1 0 auto;display:flex;flex-direction:column;gap:4px;text-align:left;padding:12px 18px 4px;border:none;background:transparent;font:inherit;color:inherit;min-width:0;overflow:hidden")}>
        {c.climbs && <ClimbRow c={c} />}
        <span style={S("font-size:12.5px;font-weight:700;letter-spacing:-0.01em;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex-shrink:0")}>{c.title}</span>
        <span style={S("display:flex;align-items:baseline;gap:8px;min-width:0;flex-shrink:0")}>
          <span style={S("font-size:26px;font-weight:800;letter-spacing:-0.025em;font-variant-numeric:tabular-nums;line-height:1;flex-shrink:0")}>{c.v}</span>
          <span style={S(`font-size:12px;font-weight:800;font-variant-numeric:tabular-nums;color:${c.dc};white-space:nowrap;flex-shrink:0`)}>{c.delta}</span>
          <span style={S("font-size:10px;color:#6B6B61;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-left:auto")}>{c.foot}</span>
        </span>
        {c.isGraph && (
          <span style={S("flex-shrink:0;display:block;max-height:34px;overflow:hidden")}>
            <CardChart chart={c.chart} title={c.title} height={34} />
          </span>
        )}
      </button>
      {c.showWhy && <Because c={c} />}
    </div>
  );
}

export default function Space({ v }) {
  const slots = slotsFor(v.spaceCurrent);
  return (
    <div style={S("display:flex;flex-direction:column;min-height:100%;animation:byFade 160ms ease-out")}>
      <div style={S("flex:1;min-height:0;display:flex;flex-direction:column;padding:26px 40px 20px")}>

        <div style={S("display:flex;justify-content:flex-end;gap:6px;margin-bottom:14px")}>
          {v.arrangeTabs.map(t => (
            <button key={t.key} onClick={t.pick} aria-pressed={t.cur} className="by-h-ink" style={S(`padding:5px 12px;border-radius:100px;border:1px solid ${t.border};background:${t.bg};font-size:10.5px;font-weight:${t.w};color:${t.fg};white-space:nowrap`)}>{t.label}</button>
          ))}
        </div>

        <div style={S("display:grid;grid-template-columns:repeat(12,1fr);grid-template-rows:minmax(128px,auto) minmax(128px,auto);gap:14px")}>
          <div style={S("grid-column:1/6;grid-row:1/3;background:#14170F;border-radius:12px;padding:22px 24px;display:flex;flex-direction:column;min-width:0;overflow:hidden;animation:byRise 520ms ease-out both")}>
            <span style={S("font-size:26px;font-weight:800;letter-spacing:-0.025em;line-height:1.2;color:#F7F7EF;text-wrap:pretty")}>
              {v.spaceHead} <span style={S("color:#C8F068")}>{v.spaceHeadAccent}</span>
            </span>
            <span style={S("font-size:10.5px;color:rgba(247,247,239,.55);margin-top:12px;font-variant-numeric:tabular-nums")}>{v.spaceKicker} · {v.spaceStamp}</span>
            <button onClick={v.goHome} className="by-cta" style={S("margin-top:auto;align-self:flex-start;padding:9px 18px;border-radius:100px;border:none;background:#C8F068;color:#14170F;font-size:12.5px;font-weight:800;letter-spacing:-0.01em")}>Ask something new →</button>
          </div>

          {v.spaceCurrent.map((c, i) => c.isAlert
            ? <AlertTile key={c.key} c={c} slot={slots[i]} />
            : <FindingTile key={c.key} c={c} slot={slots[i]} />)}
        </div>

        <div style={S("display:grid;grid-template-columns:repeat(12,1fr);grid-template-rows:minmax(146px,auto);gap:14px;margin-top:20px")}>
          {v.spaceStill.map((t, i) => (
            <button key={t.key} onClick={t.open} className="by-h-ink" style={S(`grid-column:${i * 4 + 1}/${i * 4 + 5};text-align:left;border:1px solid #E5E5DA;border-radius:12px;background:#fff;padding:16px 18px 14px;display:flex;flex-direction:column;min-width:0;font:inherit;color:inherit;overflow:hidden;animation:${t.rise}`)}>
              <span style={S("font-size:12.5px;font-weight:700;letter-spacing:-0.01em;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex-shrink:0")}>{t.title}</span>
              <span style={S("display:flex;align-items:baseline;gap:9px;margin-top:6px;flex-shrink:0")}>
                <span style={S("font-size:19px;font-weight:800;letter-spacing:-0.02em;font-variant-numeric:tabular-nums;line-height:1")}>{t.v}</span>
                <span style={S(`font-size:12px;font-weight:800;font-variant-numeric:tabular-nums;color:${t.dc};white-space:nowrap`)}>{t.delta}</span>
              </span>
              <span style={S("display:block;font-size:10px;color:#6B6B61;margin-top:8px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex-shrink:0")}>{t.foot}</span>
            </button>
          ))}
        </div>

        <svg viewBox="0 0 600 14" preserveAspectRatio="none" aria-hidden="true" style={S("display:block;width:calc(100% + 80px);height:16px;margin:20px -40px 0;overflow:visible")}>
          <path d="M2,9 C58,3 96,12 158,7 C220,2 262,11 322,7 C382,3 428,12 486,7 C540,2 572,10 598,6" fill="none" stroke="#A5CE3C" strokeWidth="3" strokeLinecap="round"></path>
        </svg>

        <div style={S("flex:1;min-height:0;margin:0 -40px -20px;padding:18px 40px 24px;background:rgba(159,209,242,.13);display:flex;flex-direction:column")}>
          <div style={S("display:flex;align-items:baseline;flex-wrap:wrap;gap:12px")}>
            <div style={S("font-size:9.5px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#0B2233;opacity:.62")}>{v.deepKicker}</div>
            <div style={S("font-size:10.5px;color:#0B2233;opacity:.5")}>{v.deepNote}</div>
          </div>

          <div style={S("display:grid;grid-template-columns:repeat(12,1fr);grid-template-rows:minmax(128px,auto);gap:14px;margin-top:14px")}>
            {v.spaceDeep.map((d, i) => (
              <button key={d.key} onClick={d.toggle} className="by-h-ink" style={S(`grid-column:${i * 4 + 1}/${i * 4 + 5};text-align:left;border:1px solid rgba(11,34,51,.10);border-radius:12px;background:rgba(255,255,255,.72);padding:14px 16px;display:flex;flex-direction:column;gap:6px;min-width:0;font:inherit;color:inherit;overflow:hidden`)}>
                <span style={S("font-size:13px;font-weight:700;letter-spacing:-0.01em;line-height:1.35;color:#0B2233;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;text-wrap:pretty;flex-shrink:0")}>{d.head}</span>
                <span style={S("font-size:11px;line-height:1.45;color:#6B6B61;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;text-wrap:pretty;flex-shrink:0")}>{d.note}</span>
                <span style={S("display:flex;align-items:center;justify-content:space-between;gap:8px;flex-shrink:0")}>
                  <span style={S("display:flex;align-items:baseline;gap:5px;min-width:0")}>
                    <span style={S("font-size:9px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#0B2233;opacity:.55;white-space:nowrap")}>confidence</span>
                    <span style={S("font-size:13px;font-weight:800;font-variant-numeric:tabular-nums;color:#0B2233;white-space:nowrap")}>{d.conf}</span>
                  </span>
                  <span style={S(`padding:4px 10px;border-radius:100px;border:1px solid ${d.btnBorder};background:${d.btnBg};font-size:9.5px;font-weight:700;color:${d.btnFg};white-space:nowrap;flex-shrink:0`)}>{d.btn}</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={S("flex-shrink:0;padding:12px 44px;border-top:1px solid #E5E5DA;font-size:10.5px;color:#6B6B61")}>
        Nothing here was configured. Every line above says what put it there.
      </div>
    </div>
  );
}
