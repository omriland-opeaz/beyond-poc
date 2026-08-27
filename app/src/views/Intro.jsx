import { S } from "../css.js";

/* The first-run page. Reachable at ?view=intro.
   The focal moment is the basin filling: the three step panels are revealed by a
   waterline crossing the row left to right, not faded in. */

export default function Intro({ v }) {
  return (
    <div style={S("height:100vh;overflow:auto;background:#F7F7EF;color:#14170F")}>
      <div style={S("max-width:1180px;margin:0 auto;padding:34px 48px 56px;display:flex;flex-direction:column;min-height:100vh")}>

        <div style={S("display:flex;align-items:center;gap:12px;animation:byFadeIn 420ms ease-out both")}>
          <span style={S("width:24px;height:24px;border-radius:7px;background:#C8F068;overflow:hidden;position:relative;flex-shrink:0")}>
            <span style={S("position:absolute;right:-6px;bottom:-6px;width:19px;height:19px;border-radius:50%;background:#14170F")}></span>
          </span>
          <span style={S("font-size:17px;font-family:'Space Grotesk',sans-serif;font-weight:700;letter-spacing:-0.02em")}>_beyond</span>
          <span style={S("display:flex;align-items:center;gap:7px;padding-left:13px;margin-left:2px;border-left:1px solid #D3D3C4")}>
            <span style={S("font-size:10.5px;font-weight:500;color:#6B6B61;letter-spacing:0.02em")}>by</span>
            <span
              style={S("width:48px;height:12.5px;background:#14170F;-webkit-mask:url(/assets/opeaz-wordmark.svg) no-repeat left center/contain;mask:url(/assets/opeaz-wordmark.svg) no-repeat left center/contain")}
              role="img"
              aria-label="Opeaz"
            ></span>
          </span>
        </div>

        <div style={S("margin-top:64px;max-width:820px;animation:byFadeIn 480ms ease-out 60ms both")}>
          <h1 style={S("font-size:56px;font-weight:800;letter-spacing:-0.035em;line-height:1.03;margin:18px 0 0;text-wrap:balance")}>
            Everything you want<br />to know <span style={S("color:#B9E353")}>in one</span>{" "}
            <span style={S("position:relative;display:inline-block;color:rgba(20,23,15,.45)")}>
              place
              <svg viewBox="0 0 120 24" preserveAspectRatio="none" style={S("position:absolute;left:-5%;top:46%;width:110%;height:20px;overflow:visible;pointer-events:none;animation:byPen 620ms cubic-bezier(.16,1,.3,1) 430ms both")}>
                <path d="M2,14 C22,7 44,17 64,10 C82,4 100,13 118,8" fill="none" stroke="#A5CE3C" strokeWidth="3.2" strokeLinecap="round" strokeDasharray="132 8" style={S("animation:byInk 6s ease-in-out 1120ms infinite")}></path>
              </svg>
            </span>{" "}
            <span style={S("color:#B9E353")}>lake.</span>
          </h1>
          <p style={S("font-size:16px;line-height:1.65;color:#6B6B61;margin:18px 0 0;max-width:620px")}>
            Connect whatever you have. <span style={S("font-family:'Space Grotesk',sans-serif;font-weight:700;letter-spacing:-0.02em;color:#14170F")}>_beyond</span> reads it, makes the numbers comparable, and hands you a cockpit you can question. It never writes back to a source.
          </p>
        </div>

        <div style={S("display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:46px")}>

          <div className="by-basin">
            <div style={S("position:relative;overflow:hidden;border-radius:18px;background:#C8F068;padding:26px 26px 24px;min-height:330px;display:flex;flex-direction:column")}>
              <div style={S("display:flex;align-items:flex-start;justify-content:space-between")}>
                <span style={S("font-size:96px;font-weight:800;letter-spacing:-0.05em;line-height:.85;font-variant-numeric:tabular-nums")}>01</span>
                <span style={S("font-size:10px;font-weight:700;letter-spacing:0.12em;padding:5px 11px;border-radius:100px;border:1px solid rgba(20,23,15,.28)")}>CONNECT</span>
              </div>
              <div style={S("margin-top:auto")}>
                <div style={S("font-size:20px;font-weight:800;letter-spacing:-0.02em;line-height:1.2")}>Plug in anything. Really, anything.</div>
                <p style={S("font-size:13px;line-height:1.6;color:rgba(20,23,15,.72);margin:9px 0 0")}>Partner portals, wholesaler feeds, an SFTP folder, your mailbox, a spreadsheet nobody has cleaned, a photo of a delivery note. Nothing is too messy to hand over.</p>
              </div>
            </div>
            <div className="by-veil by-d1" aria-hidden="true"></div>
            <div className="by-crest by-crest-water by-d1" aria-hidden="true"></div>
          </div>

          <div className="by-basin">
            <div style={S("position:relative;overflow:hidden;border-radius:18px;background:linear-gradient(160deg,#9FD1F2,#5B9BD9);color:#0B2233;padding:26px 26px 24px;min-height:330px;display:flex;flex-direction:column")}>
              <svg viewBox="0 0 300 120" preserveAspectRatio="none" style={S("position:absolute;left:0;right:0;bottom:96px;width:100%;height:120px;opacity:.5;animation:byBob 9s ease-in-out infinite")}>
                <g fill="none" stroke="rgba(255,255,255,.7)" strokeWidth="1.6" strokeLinecap="round">
                  <path d="M18,26 q14,-10 28,0 t28,0" style={S("animation:byDrift 11s ease-in-out infinite")}></path>
                  <path d="M120,64 q14,-10 28,0 t28,0" style={S("animation:byDrift 14s ease-in-out infinite -3s")}></path>
                  <path d="M42,92 q14,-10 28,0 t28,0" style={S("animation:byDrift 13s ease-in-out infinite -6s")}></path>
                  <path d="M196,22 q14,-10 28,0 t28,0" style={S("animation:byDrift 15s ease-in-out infinite -2s")}></path>
                  <path d="M212,96 q14,-10 28,0 t28,0" style={S("animation:byDrift 12s ease-in-out infinite -8s")}></path>
                </g>
              </svg>
              <div style={S("position:relative;display:flex;align-items:flex-start;justify-content:space-between")}>
                <span style={S("font-size:96px;font-weight:800;letter-spacing:-0.05em;line-height:.85;font-variant-numeric:tabular-nums;color:#FFFFFF")}>02</span>
                <span style={S("font-size:10px;font-weight:700;letter-spacing:0.12em;padding:5px 11px;border-radius:100px;border:1px solid rgba(255,255,255,.65);color:#FFFFFF")}>DIGEST</span>
              </div>
              <div style={S("position:relative;margin-top:auto")}>
                <div style={S("font-size:20px;font-weight:800;letter-spacing:-0.02em;line-height:1.2")}>We digest it until it compares.</div>
                <p style={S("font-size:13px;line-height:1.6;color:rgba(11,34,51,.82);margin:9px 0 0")}>Four names for one product become one product. Euros become XOF, Paris time becomes Abidjan time. It all lands in <b style={S("color:#FFFFFF;font-weight:700")}>your own lake</b>, one private body of data that only you read from.</p>
              </div>
            </div>
            <div className="by-veil by-d2" aria-hidden="true"></div>
            <div className="by-crest by-crest-lime by-d2" aria-hidden="true"></div>
          </div>

          <div className="by-basin">
            <div style={S("position:relative;overflow:hidden;border-radius:18px;background:#14170F;color:#F7F7EF;padding:26px 26px 24px;min-height:330px;display:flex;flex-direction:column")}>
              <div style={S("display:flex;align-items:flex-start;justify-content:space-between")}>
                <span style={S("font-size:96px;font-weight:800;letter-spacing:-0.05em;line-height:.85;font-variant-numeric:tabular-nums;color:#C8F068")}>03</span>
                <span style={S("font-size:10px;font-weight:700;letter-spacing:0.12em;padding:5px 11px;border-radius:100px;border:1px solid rgba(247,247,239,.35)")}>COCKPIT</span>
              </div>
              <div style={S("margin-top:auto")}>
                <div style={S("font-size:20px;font-weight:800;letter-spacing:-0.02em;line-height:1.2")}>Ask anything. Watch what matters.</div>
                <p style={S("font-size:13px;line-height:1.6;color:rgba(247,247,239,.7);margin:9px 0 0")}>Ask a question in plain language and get the answer with its sources and its method. Keep the ones worth following, and <span style={S("font-family:'Space Grotesk',sans-serif;font-weight:700;letter-spacing:-0.02em;color:#F7F7EF")}>_beyond</span> refreshes them on every import.</p>
              </div>
            </div>
            <div className="by-veil by-d3" aria-hidden="true"></div>
            <div className="by-crest by-crest-lime by-d3" aria-hidden="true"></div>
          </div>

        </div>

        <div style={S("display:flex;flex-wrap:wrap;align-items:center;gap:14px;margin-top:38px;padding-top:24px;border-top:1px solid #E5E5DA;animation:byRise 520ms cubic-bezier(.16,1,.3,1) 1600ms both")}>
          <button onClick={v.goHome} className="by-cta" style={S("padding:14px 26px;border-radius:100px;border:none;background:#C8F068;color:#14170F;font-size:14px;font-weight:800;letter-spacing:-0.01em")}>
            Ask your first question <span className="by-arrow">→</span>
          </button>
          <span style={S("margin-left:auto;font-size:11px;color:#6B6B61;max-width:340px;text-align:right;text-wrap:pretty")}>
            <span style={S('font-family:"Space Grotesk", sans-serif;font-weight:700;letter-spacing:-0.02em;color:rgb(20, 23, 15)')}>_beyond </span>is a registered trademark of Opeaz LTD<br />
          </span>
        </div>

      </div>
    </div>
  );
}
