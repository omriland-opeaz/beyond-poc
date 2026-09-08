import { S } from "../css.js";

/* My space, the analyst's morning note laid out as a board. _beyond speaks first. Then
   the board: the one thing to look at, on ink, twice the size of anything beside it;
   three more things it brought, each a figure and the sentence that completes it; and
   the lines you asked it to watch. Under the board, the answers that came back. Last,
   in grey, what did not move. Every figure opens a fresh question. The two marks under
   a card are how you answer _beyond's choice: acknowledged, and nothing else moves. */

const INK = "#14170F", CREAM = "#F7F7EF", LIME = "#C8F068";

/* The four-point star that marks what _beyond did on its own. */
function Star({ color, size = 9, className, delay }) {
  return (
    <svg viewBox="0 0 10 10" aria-hidden="true" className={className} style={S(`width:${size}px;height:${size}px;flex-shrink:0;overflow:visible;${delay == null ? "" : `animation-delay:${delay}ms`}`)}>
      <path d="M5 0 L6.05 3.95 L10 5 L6.05 6.05 L5 10 L3.95 6.05 L0 5 L3.95 3.95 Z" fill={color}></path>
    </svg>
  );
}

function Thumb({ up }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" style={S(`width:13px;height:13px;flex-shrink:0;transform:${up ? "none" : "scale(1,-1)"}`)}>
      <path d="M2.5 7.5 H5 V13.5 H2.5 Z M5 8 L8 2.5 C9.2 2.5 9.6 3.4 9.3 4.4 L8.8 6.6 H12.6 C13.5 6.6 14 7.4 13.8 8.2 L12.7 12.5 C12.5 13.1 12 13.5 11.4 13.5 H5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
    </svg>
  );
}

/* Thin rounded bars. The last one carries the row's colour, the rest recede. */
function Bars({ heights, last, rest, height, width, gap, stretch }) {
  return (
    <span className="by-spark" aria-hidden="true" style={S(`display:flex;align-items:flex-end;gap:${gap}px;height:${height}px;${stretch ? "width:100%" : "flex-shrink:0"}`)}>
      {heights.map((h, i) => <i key={i} style={S(`display:block;${stretch ? "flex:1" : `width:${width}px`};height:${h}%;background:${i === heights.length - 1 ? last : rest};border-radius:${stretch ? "5px" : "100px"};animation-delay:${200 + i * 25}ms`)}></i>)}
    </span>
  );
}

/* The marks under a card: two thumbs until you use one, then three stars and a word. */
function Feedback({ a, onInk }) {
  if (a.fed) {
    return (
      <span style={S(`display:inline-flex;align-items:center;gap:4px;height:26px;font-size:11px;font-weight:700;color:${onInk ? CREAM : "#5F7A12"};animation:byFade 400ms ease-out both`)}>
        <Star className="by-sparkle" size={11} delay={0} color={LIME} />
        <Star className="by-sparkle" size={7} delay={90} color={onInk ? CREAM : "#A5CE3C"} />
        <Star className="by-sparkle" size={9} delay={180} color={LIME} />
        <span style={S("margin-left:4px")}>Got it.</span>
      </span>
    );
  }
  const skin = onInk
    ? `border:1px solid rgba(247,247,239,.35);color:${CREAM};background:transparent;padding:0 11px 0 9px`
    : "border:1px solid #D3D3C4;color:#6B6B61;background:#fff;padding:0";
  const btn = `display:inline-flex;align-items:center;justify-content:center;gap:6px;height:26px;min-width:26px;border-radius:100px;font-size:11px;font-weight:600;${skin}`;
  return (
    <span style={S("display:inline-flex;align-items:center;gap:6px")}>
      <button onClick={a.like} aria-label="More like this" title="More like this" className={onInk ? "by-h-cream" : "by-h-ink"} style={S(btn)}><Thumb up />{onInk && "Yes"}</button>
      <button onClick={a.dislike} aria-label="Less like this" title="Less like this" className={onInk ? "by-h-cream" : "by-h-ink"} style={S(btn)}><Thumb up={false} />{onInk && "Not this"}</button>
    </span>
  );
}

/* The lead: ink, two columns by two rows, the figure in lime, and the last twelve weeks
   drawn across the full width under the sentence. */
function Hero({ a }) {
  return (
    <article className="by-bento-hero by-hero" style={S(`grid-column:span 2;grid-row:span 2;display:flex;flex-direction:column;gap:20px;padding:28px 30px 24px;background:${INK};border-radius:18px;color:${CREAM};min-width:0`)}>
      <div style={S("display:flex;align-items:center;gap:8px;font-size:11px;font-weight:600;color:rgba(247,247,239,.62)")}>
        <span style={S("width:6px;height:6px;border-radius:50%;background:#E0605A;flex-shrink:0")}></span>
        {a.kind}
        <span style={S("margin-left:auto;font-weight:500;font-variant-numeric:tabular-nums")}>{a.when}</span>
      </div>
      <button onClick={a.open} className="by-open" style={S("display:flex;flex-direction:column;align-items:stretch;gap:16px;text-align:left;padding:0;border:none;background:transparent;color:inherit;font:inherit;min-width:0")}>
        <span style={S(`font-size:92px;font-weight:800;letter-spacing:-0.04em;line-height:.85;color:${LIME};font-variant-numeric:tabular-nums;white-space:nowrap`)}>{a.big}</span>
        <span style={S("font-size:22px;font-weight:800;letter-spacing:-0.02em;line-height:1.25;text-wrap:pretty")}>{a.lead}</span>
        <span style={S("font-size:14.5px;line-height:1.6;color:rgba(247,247,239,.74);text-wrap:pretty")}>
          {a.note} <span style={S(`color:${LIME};font-weight:700;white-space:nowrap`)}>Ask why →</span>
        </span>
        <span style={S("display:flex;flex-direction:column;gap:8px;margin-top:8px")}>
          <Bars heights={a.bars} last={LIME} rest="rgba(247,247,239,.2)" height={72} gap={8} stretch />
          <span style={S("display:flex;justify-content:space-between;font-size:10.5px;color:rgba(247,247,239,.5);font-variant-numeric:tabular-nums")}>
            <span>twelve weeks ago</span><span>this week</span>
          </span>
        </span>
      </button>
      <div style={S("display:flex;align-items:center;gap:8px;margin-top:auto;padding-top:14px;border-top:1px solid rgba(247,247,239,.14)")}>
        <Star color={LIME} />
        <span style={S("font-size:11px;color:rgba(247,247,239,.62)")}>{a.why}</span>
        <span style={S("margin-left:auto;flex-shrink:0")}><Feedback a={a} onInk /></span>
      </div>
    </article>
  );
}

/* One thing _beyond brought: the figure, the sentence that completes it, one more line. */
function Tile({ a }) {
  return (
    <article className="by-tile" style={S("display:flex;flex-direction:column;gap:12px;padding:20px 20px 16px;background:#fff;border:1px solid #E5E5DA;border-radius:12px;min-width:0")}>
      <button onClick={a.open} className="by-open" style={S("display:flex;flex-direction:column;align-items:stretch;gap:8px;text-align:left;padding:0;border:none;background:transparent;color:inherit;font:inherit;min-width:0")}>
        <span style={S("display:flex;align-items:flex-start;justify-content:space-between;gap:10px")}>
          <span style={S(`font-size:34px;font-weight:800;letter-spacing:-0.035em;line-height:.9;color:${a.kc};font-variant-numeric:tabular-nums;white-space:nowrap`)}>{a.big}</span>
          <span style={S(`font-size:10px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${a.kc};padding-top:4px;white-space:nowrap`)}>{a.kind}</span>
        </span>
        {a.bars && <Bars heights={a.bars} last={a.kc} rest="#E5E5DA" height={22} width={5} gap={3} />}
        <span style={S(`font-size:14.5px;font-weight:700;letter-spacing:-0.01em;line-height:1.35;color:${INK};text-wrap:pretty`)}>{a.lead}</span>
        <span style={S("font-size:12.5px;line-height:1.55;color:#6B6B61;text-wrap:pretty")}>{a.note}</span>
      </button>
      <div style={S("display:flex;align-items:center;gap:7px;margin-top:auto;padding-top:12px;border-top:1px solid #F1F1E6")}>
        <Star color="#5F7A12" />
        <span style={S("font-size:11px;color:#6B6B61;line-height:1.35;min-width:0")}>{a.why}</span>
        <span style={S("margin-left:auto;flex-shrink:0")}><Feedback a={a} /></span>
      </div>
    </article>
  );
}

/* The lines you asked _beyond to watch, as a small table: name, shape, latest figure. */
function Watchlist({ v }) {
  return (
    <article className="by-tile" style={S("display:flex;flex-direction:column;gap:8px;padding:20px 20px 12px;background:#fff;border:1px solid #E5E5DA;border-radius:12px;min-width:0")}>
      <span style={S(`font-size:14.5px;font-weight:700;letter-spacing:-0.01em;line-height:1.35;color:${INK}`)}>{v.trackLead}</span>
      <div style={S("display:flex;flex-direction:column;flex:1;justify-content:space-evenly")}>
        {v.tracking.map((t, i) => (
          <button key={t.key} onClick={t.open} className="by-row" style={S(`display:grid;grid-template-columns:minmax(0,1fr) auto auto;gap:1px 10px;align-items:center;text-align:left;padding:8px 8px;margin:0 -8px;border:none;border-radius:8px;background:transparent;font:inherit;color:inherit`)}>
            <span style={S(`font-size:12px;font-weight:600;color:${INK};overflow:hidden;text-overflow:ellipsis;white-space:nowrap`)}>{t.title}</span>
            <Bars heights={t.bars} last={t.dc} rest="#E5E5DA" height={16} width={3} gap={2} />
            <span style={S(`font-size:13px;font-weight:800;color:${t.dc};font-variant-numeric:tabular-nums;text-align:right;min-width:50px`)}>{t.v}</span>
            <span style={S("grid-column:1 / -1;font-size:10.5px;color:#6B6B61;font-variant-numeric:tabular-nums;overflow:hidden;text-overflow:ellipsis;white-space:nowrap")}>{t.note}</span>
          </button>
        ))}
      </div>
    </article>
  );
}

export default function Space({ v }) {
  const lead = v.attention[0], rest = v.attention.slice(1);
  return (
    <div style={S("min-height:100%;background:#F7F7EF;padding:40px 40px 96px")}>
      <div style={S("max-width:1180px;margin:0 auto;display:flex;flex-direction:column;gap:40px;animation:byRise 520ms ease-out both")}>

        <header style={S("display:flex;flex-direction:column;gap:10px;max-width:820px")}>
          <h1 style={S(`margin:0;font-size:30px;font-weight:800;letter-spacing:-0.025em;line-height:1.15;color:${INK};text-wrap:balance`)}>
            {v.spaceHead} <span style={S("color:#B9E353")}>{v.spaceHeadAccent}</span>
          </h1>
          <p style={S("margin:0;font-size:15px;color:#6B6B61;line-height:1.6")}>{v.spaceNote}</p>
        </header>

        <section className="by-bento" aria-label="What _beyond brought">
          <Hero a={lead} />
          {rest.map(a => <Tile key={a.key} a={a} />)}
          <Watchlist v={v} />
        </section>

        <section style={S("display:flex;flex-direction:column;gap:14px")}>
          <h2 style={S(`margin:0;font-size:15px;font-weight:700;letter-spacing:-0.01em;color:${INK}`)}>{v.answersLead}</h2>
          <div className="by-bento-half" style={S("display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px")}>
            {v.answered.map(r => (
              <button key={r.key} onClick={r.open} className="by-h-ink" style={S("display:flex;flex-direction:column;gap:8px;text-align:left;padding:18px 20px 16px;border:1px solid #E5E5DA;border-radius:12px;background:#fff;font:inherit;color:inherit;min-width:0")}>
                <span style={S("font-size:12.5px;color:#6B6B61;line-height:1.5")}>{r.ask}</span>
                <span style={S(`font-size:17px;font-weight:800;letter-spacing:-0.015em;line-height:1.3;color:${INK};text-wrap:pretty`)}>{r.head}</span>
                <span style={S("display:flex;align-items:center;gap:8px;margin-top:4px;font-size:11px;color:#A3A399;font-variant-numeric:tabular-nums")}>
                  {r.when}<span style={S("margin-left:auto;font-weight:700;color:#5F7A12")}>Open →</span>
                </span>
              </button>
            ))}
          </div>
        </section>

        <section style={S("display:flex;flex-direction:column;gap:10px;padding-top:22px;border-top:1px solid #E5E5DA")}>
          <h2 style={S("margin:0;font-size:13px;font-weight:600;color:#6B6B61")}>{v.steadyLead}</h2>
          <div style={S("display:flex;flex-wrap:wrap;gap:12px 0")}>
            {v.steady.map((t, i) => (
              <button key={t.key} onClick={t.open} className="by-h-tint" style={S(`display:flex;align-items:baseline;gap:8px;text-align:left;padding:8px 24px 8px ${i ? 24 : 0}px;border:none;border-left:${i ? "1px solid #E5E5DA" : "none"};border-radius:0;background:transparent;font:inherit;color:inherit`)}>
                <span style={S("font-size:17px;font-weight:700;color:#6B6B61;font-variant-numeric:tabular-nums;letter-spacing:-0.01em")}>{t.v}</span>
                <span style={S("font-size:12px;color:#6B6B61")}>{t.unit}</span>
                <span style={S("font-size:11px;color:#A3A399;font-variant-numeric:tabular-nums")}>{t.delta}</span>
              </button>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
