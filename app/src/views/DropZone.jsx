import { S } from "../css.js";

/* Drop anything. The stone hovers, falls into the lake, the splash crowns, and the
   file is filed — the metaphor is drawn, never explained in words. */

export default function DropZone({ v }) {
  return (
    <div style={S("max-width:760px;margin:0 auto")}>
      <div style={S("text-align:center;margin-top:14px")}>
        <h1 style={S("font-size:24px;font-weight:800;letter-spacing:-0.02em;margin:0")}>Drop anything.</h1>
        <div style={S("font-size:13px;color:#6B6B61;margin-top:8px;text-wrap:pretty")}>A spreadsheet, a PDF, a photo of a delivery note. <span style={S("font-family:'Space Grotesk',sans-serif;font-weight:700;letter-spacing:-0.02em;color:#14170F")}>_beyond</span> reads it, works out what it is, and files it where it belongs in the lake.</div>
      </div>

      <button type="button" onClick={v.startDrop} aria-label="Drop a file, or press Enter to browse" className="by-h-drop" style={S(`position:relative;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;margin-top:26px;width:100%;min-height:344px;padding:24px 22px;border:2px dashed ${v.dzEdge};border-radius:15px;background:${v.dzBg};color:inherit;font:inherit;text-align:center;cursor:pointer`)}>

        <svg width="380" height="210" viewBox="0 0 380 210" aria-hidden="true" focusable="false" style={S("position:relative;overflow:hidden;flex-shrink:0")}>
          <defs>
            <linearGradient id="dzWater" x1="0" y1="0" x2="0.25" y2="1">
              <stop offset="0" stopColor="#9FD1F2"></stop>
              <stop offset="1" stopColor="#5B9BD9"></stop>
            </linearGradient>
          </defs>

          <g style={S(`transform-box:fill-box;transform-origin:center;opacity:${v.dzStoneOp};animation:${v.dzStone}`)}>
            <path d="M163,28 C165,16 177,8 192,9 C208,10 219,18 220,30 C221,42 211,51 194,52 C177,53 164,46 162,36 C161,33 161,30 163,28 Z" fill="#6B6B61" stroke="#6B6B61" strokeWidth="2.4" strokeLinejoin="round"></path>
          </g>

          <path d="M44,168 C39,153 63,142 93,139 C126,135 149,146 182,141 C213,136 248,133 278,139 C314,146 341,157 335,173 C330,188 291,197 235,200 C177,203 116,198 78,189 C55,183 47,175 44,168 Z" fill="url(#dzWater)" stroke="#C8F068" strokeWidth="2.8" strokeLinejoin="round"></path>

          <g fill="none" stroke="rgba(255,255,255,.55)" strokeWidth="1.6" strokeLinecap="round">
            <path d="M76,160 q10,-7 20,0 t20,0"></path>
            <path d="M250,152 q10,-7 20,0 t20,0"></path>
            <path d="M142,184 q10,-7 20,0 t20,0"></path>
          </g>

          <g fill="none" stroke="rgba(255,255,255,.85)" strokeWidth="1.7" style={S(`opacity:${v.dzRippleOp}`)}>
            <ellipse cx="190" cy="143" rx="56" ry="17" style={S(`transform-origin:190px 143px;animation:${v.dzRing1}`)}></ellipse>
            <ellipse cx="190" cy="143" rx="56" ry="17" style={S(`transform-origin:190px 143px;animation:${v.dzRing2}`)}></ellipse>
            <ellipse cx="190" cy="143" rx="56" ry="17" style={S(`transform-origin:190px 143px;animation:${v.dzRing3}`)}></ellipse>
          </g>

          <g style={S(`opacity:${v.dzSplashOp}`)}>
            <g fill="none" stroke="#5B9BD9" strokeWidth="3" strokeLinecap="round" style={S(`transform-origin:190px 142px;animation:${v.dzCrown}`)}>
              <path d="M180,142 C171,134 164,130 156,127"></path>
              <path d="M187,141 C184,131 182,125 180,118"></path>
              <path d="M195,141 C199,131 202,126 205,119"></path>
              <path d="M202,142 C211,135 218,131 226,128"></path>
            </g>
            <circle cx="190" cy="140" r="3.4" fill="#5B9BD9" style={S(`animation:${v.dzDropA}`)}></circle>
            <circle cx="190" cy="140" r="3" fill="#5B9BD9" style={S(`animation:${v.dzDropB}`)}></circle>
            <circle cx="190" cy="140" r="2.6" fill="#7FB8E6" style={S(`animation:${v.dzDropC}`)}></circle>
          </g>
        </svg>

        {v.dzIdle && (
          <>
            <span style={S("position:relative;font-size:14.5px;font-weight:800;letter-spacing:-0.01em")}>Drop a file here, or click to browse</span>
            <span style={S("position:relative;font-size:11px;color:#6B6B61")}>xlsx · csv · pdf · docx · images · anything, really</span>
          </>
        )}
        {v.dzMagic && (
          <>
            <span style={S("position:relative;font-size:15px;font-weight:800;letter-spacing:-0.01em;color:#14170F")}>We're working our magic</span>
            <span style={S("position:relative;font-size:11.5px;color:#5F7A12;font-weight:700;animation:byPulseTxt 1.6s ease-in-out infinite")}>{v.dzStep}</span>
          </>
        )}
        {v.dzDone && (
          <>
            <span style={S("position:relative;display:inline-block;font-size:16px;font-weight:800;padding:3px 16px 5px")}>
              Filed.
              <svg viewBox="0 0 130 46" preserveAspectRatio="none" style={S("position:absolute;left:-12%;top:-24%;width:124%;height:150%;overflow:visible;pointer-events:none")}>
                <path d="M104,11 C88,3 44,1 23,9 C6,16 5,32 22,39 C41,47 90,45 107,36 C120,29 117,14 98,8" fill="none" stroke="#A5CE3C" strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke" strokeDasharray="330" strokeDashoffset="330" style={S("animation:byDraw 760ms ease-out 160ms forwards")}></path>
              </svg>
            </span>
            <span style={S("position:relative;font-size:11.5px;color:#6B6B61")}>Read as sell-in, Bouaké wholesaler · 1 214 rows → sales, June 2026</span>
          </>
        )}
      </button>

      <details style={S("margin-top:14px")}>
        <summary style={S("font-size:12px;font-weight:600;color:#6B6B61;cursor:pointer;list-style:none")}>+ Add a note or instructions <span style={S("color:#6B6B61;font-weight:500")}>(optional)</span></summary>
        <textarea placeholder="e.g. June figures from the Bouaké wholesaler, amounts are per carton" style={S("width:100%;box-sizing:border-box;margin-top:10px;min-height:72px;border:1px solid #E5E5DA;border-radius:10px;padding:12px 14px;font-family:inherit;font-size:12.5px;color:#14170F;resize:vertical;background:#fff")}></textarea>
      </details>

      <div style={S("margin-top:34px")}>
        <div style={S("display:flex;align-items:baseline;justify-content:space-between;border-bottom:2px solid #14170F;padding-bottom:8px")}>
          <div style={S("font-size:13px;font-weight:800")}>Recently dropped</div>
          <div style={S("font-size:10.5px;color:#6B6B61")}>what <span style={S("font-family:'Space Grotesk',sans-serif;font-weight:700;letter-spacing:-0.02em;color:#14170F")}>_beyond</span> made of each file</div>
        </div>
        {v.drops.map((d, i) => (
          <div key={i} style={S("display:grid;grid-template-columns:34px minmax(0,1fr) auto;gap:14px;align-items:center;padding:13px 0;border-bottom:1px solid #E5E5DA")}>
            <span style={S(`width:34px;height:34px;border-radius:9px;background:${d.tint};color:${d.col};display:grid;place-items:center;font-size:9px;font-weight:800`)}>{d.ext}</span>
            <span style={S("min-width:0")}>
              <span style={S("display:block;font-size:12.5px;font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap")}>{d.name}</span>
              <span style={S("display:block;font-size:11px;color:#6B6B61;margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap")}>{d.read}</span>
            </span>
            <span style={S(`font-size:10.5px;font-weight:700;color:${d.stc};white-space:nowrap`)}>{d.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
