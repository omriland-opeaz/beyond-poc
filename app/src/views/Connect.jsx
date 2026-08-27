import { S } from "../css.js";
import { Dropbox, GoogleDrive, GoogleSheets, Excel, VerifiedSeal, PopularTag, PlusGlyph } from "./VendorLogos.jsx";

/* Sources on the left, the lake on the right, straight dotted flows between them.
   Every thread leaves at the vertical middle of its card; the lake grows a little
   each time a source is connected. */

export default function Connect({ v }) {
  return (
    <>
      <div style={S("font-size:10.5px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#6B6B61;margin-bottom:18px;animation:byRise 520ms ease-out both")}>
        Connect · <span style={S("font-variant-numeric:tabular-nums")}>{v.connCount}</span> sources · one lake
      </div>

      <div style={S("display:grid;grid-template-columns:264px 1fr 400px;gap:0;align-items:stretch")}>
        <div style={S("display:flex;flex-direction:column;position:relative;z-index:2")}>
          {v.connSources.map((s, i) => (
            <div key={i} style={S(`flex:1;display:flex;align-items:center;padding:5px 0;animation:${s.rise}`)}>
              <div style={S(`width:100%;display:flex;align-items:center;gap:10px;border:1px solid ${s.border};border-left:1px solid ${s.border};border-radius:10px;padding:10px 12px;background:${s.bg}`)}>
                <span style={S(`width:32px;height:32px;border-radius:9px;background:${s.mono};color:${s.ink};display:grid;place-items:center;font-size:11px;font-weight:800;flex-shrink:0`)}>{s.ini}</span>
                <span style={S("min-width:0;flex:1")}>
                  <span style={S("display:block;font-size:12.5px;font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap")}>{s.name}</span>
                  <span style={S(`display:block;font-size:10px;line-height:1.45;color:${s.footColor};text-wrap:pretty`)}>{s.foot}</span>
                </span>
                {s.hasError && (
                  <button style={S("flex-shrink:0;padding:5px 10px;border-radius:6px;border:none;background:#C0473F;color:#fff;font-size:10px;font-weight:700;white-space:nowrap")}>{s.fix}</button>
                )}
                {s.noError && (
                  <span style={S(`flex-shrink:0;width:7px;height:7px;border-radius:50%;background:${s.stColor};animation:${s.anim}`)}></span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div ref={v.flowRef} style={S("position:relative;margin:0 -186px 0 0;min-width:120px")}>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={S("position:absolute;inset:0;width:100%;height:100%;overflow:visible")}>
            {v.flows.map((f, i) => (
              <path key={i} d={f.d} fill="none" stroke={f.stroke} strokeWidth={f.w} vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeDasharray={f.dash} style={S(f.style)}></path>
            ))}
          </svg>
        </div>

        <div style={S("display:flex;align-items:center;justify-content:center;position:relative;z-index:2")}>
          <div style={S("animation:byRise 620ms ease-out 160ms both")}>
            <div style={S("position:relative;width:310px;height:279px")}>
              <svg viewBox="0 0 240 216" style={S(`position:absolute;inset:0;width:100%;height:100%;overflow:visible;transform:scale(${v.lakeScale});transform-origin:50% 52%;transition:transform 1600ms cubic-bezier(.22,1,.36,1)`)}>
                <defs>
                  <linearGradient id="lakeWater" x1="0" y1="0" x2="0.3" y2="1">
                    <stop offset="0" stopColor="#9FD1F2"></stop>
                    <stop offset="1" stopColor="#5B9BD9"></stop>
                  </linearGradient>
                </defs>
                <path d="M20,112 C8,80 30,50 64,42 C90,36 104,16 136,18 C174,21 200,40 214,68 C230,100 226,136 200,160 C174,184 136,198 100,188 C66,178 32,144 20,112 Z" fill="#C8F068" opacity=".34" transform="translate(3,5)"></path>
                <path d="M20,112 C8,80 30,50 64,42 C90,36 104,16 136,18 C174,21 200,40 214,68 C230,100 226,136 200,160 C174,184 136,198 100,188 C66,178 32,144 20,112 Z" fill="url(#lakeWater)" stroke="#C8F068" strokeWidth="3"></path>
                <g fill="none" stroke="rgba(255,255,255,.55)" strokeWidth="1.4" strokeLinecap="round">
                  <path d="M52,146 q9,-7 18,0 t18,0"></path>
                  <path d="M150,54 q9,-7 18,0 t18,0"></path>
                  <path d="M162,150 q9,-7 18,0 t18,0"></path>
                  <path d="M44,86 q9,-7 18,0 t18,0"></path>
                </g>
                <g fill="none" stroke="rgba(255,255,255,.6)" strokeWidth="1.2">
                  <ellipse cx="118" cy="104" rx="34" ry="22" style={S("transform-origin:118px 104px;animation:byRing 3.4s ease-out infinite")}></ellipse>
                  <ellipse cx="118" cy="104" rx="34" ry="22" style={S("transform-origin:118px 104px;animation:byRing 3.4s ease-out infinite 1.7s")}></ellipse>
                </g>
                <path d="M74,166 q10,-9 22,-4 q9,4 20,-2" fill="none" stroke="rgba(255,255,255,.22)" strokeWidth="5" strokeLinecap="round"></path>
              </svg>
              <div style={S("position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;text-align:center;color:#0B2233;padding-top:10px;white-space:nowrap")}>
                <span style={S("font-size:11px;font-weight:700;letter-spacing:0.12em;color:#0B2233")}>THE LAKE</span>
                <span style={S("font-size:46px;font-weight:800;letter-spacing:-0.03em;line-height:1;font-variant-numeric:tabular-nums")}>{v.lakeRows}</span>
                <span style={S("font-size:12.5px;font-weight:500;color:#0B2233")}>rows · read-only</span>
                <span style={S("font-size:11px;color:#0B2233;font-weight:700;margin-top:8px")}>recomputed 14 min ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={S("display:flex;align-items:baseline;gap:18px;padding-bottom:10px;border-bottom:2px solid #14170F;margin-top:36px")}>
        <div style={S("font-size:12.5px;font-weight:700")}>Library</div>
        <div style={S("display:flex;gap:4px;margin-left:8px")}>
          {v.libTabs.map((t, i) => (
            <button key={i} onClick={t.pick} style={S(`padding:5px 12px;border-radius:100px;border:1px solid ${t.border};background:${t.bg};font-size:11px;font-weight:${t.w};color:${t.fg}`)}>{t.label}</button>
          ))}
        </div>
        <div style={S("margin-left:auto;display:flex;align-items:baseline;gap:6px")}>
          <span style={S("font-size:20px;font-weight:800;letter-spacing:-0.02em;font-variant-numeric:tabular-nums;color:#14170F")}>{v.libCount}</span>
          <span style={S("font-size:10.5px;color:#6B6B61")}>available</span>
        </div>
      </div>

      <div style={S("display:grid;grid-template-columns:repeat(auto-fill,minmax(292px,1fr));gap:10px;margin-top:16px")}>
        {v.library.map((l, i) => (
          <div key={l.name} className="by-h-ink" style={S(`border:1px solid #E5E5DA;border-radius:12px;padding:12px 14px;display:flex;align-items:center;gap:12px;min-width:0;animation:${l.rise}`)}>
            <div style={S("display:flex;align-items:center;gap:12px;min-width:0;flex:1")}>
              <span style={S(`width:34px;height:34px;border-radius:9px;background:${l.tint};color:${l.col};display:grid;place-items:center;font-size:11px;font-weight:800;flex-shrink:0;border:1px solid rgba(20,23,15,.08)`)}>
                {l.isIni && <span>{l.ini}</span>}
                {l.isDb && <Dropbox />}
                {l.isGd && <GoogleDrive />}
                {l.isGs && <GoogleSheets />}
                {l.isXl && <Excel />}
              </span>
              <span style={S("min-width:0;display:flex;flex-direction:column;gap:2px")}>
                <span style={S("display:flex;align-items:center;gap:5px;min-width:0")}>
                  <span style={S("font-size:12.5px;font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap")}>{l.name}</span>
                  {l.trusted && <VerifiedSeal />}
                  {l.popular && <PopularTag />}
                </span>
                <span style={S("display:block;font-size:11.5px;line-height:1.45;color:#6B6B61")}>{l.desc}</span>
              </span>
            </div>
            <button onClick={l.connect} title={l.btnTitle} className="by-h-tint" style={S(`flex-shrink:0;width:30px;height:30px;border-radius:8px;border:none;background:${l.btnBg};color:${l.btnFg};font-size:22px;font-weight:400;line-height:1;display:grid;place-items:center;padding:0`)}>
              {l.notAdded && <PlusGlyph />}
              {l.added && <span style={S("font-size:15px;line-height:1")}>✓</span>}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
