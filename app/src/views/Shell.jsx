import { S } from "../css.js";
import Ask from "./Ask.jsx";
import Chat from "./Chat.jsx";
import Space from "./Space.jsx";
import Settings from "./Settings.jsx";

export default function Shell({ v }) {
  return (
    <div style={S("display:grid;grid-template-columns:250px 1fr;height:100vh;overflow:hidden;background:#FFFFFF;font-size:13px;line-height:1.55")}>

      <aside style={S("display:flex;flex-direction:column;gap:18px;padding:24px 0 16px;background:#F7F7EF;border-right:1px solid #E5E5DA;overflow:hidden")}>
        <div style={S("display:flex;align-items:center;gap:9px;padding:0 20px")}>
          <span style={S("width:22px;height:22px;border-radius:6px;background:#C8F068;overflow:hidden;position:relative;flex-shrink:0")}>
            <span style={S("position:absolute;right:-5px;bottom:-5px;width:17px;height:17px;border-radius:50%;background:#14170F")}></span>
          </span>
          <span style={S("font-size:16px;font-family:'Space Grotesk',sans-serif;font-weight:700;letter-spacing:-0.02em")}>_beyond</span>
        </div>

        <div style={S("padding:0 20px")}>
          <button onClick={v.goHome} className="by-h-lime" style={S("display:flex;align-items:center;gap:8px;width:100%;padding:10px 14px;border-radius:100px;border:none;background:#C8F068;color:#14170F;font-size:12.5px;font-weight:800;letter-spacing:-0.01em")}>Ask</button>
        </div>

        <div style={S("display:flex;flex-direction:column;flex:1;min-height:0")}>
          <div style={S("font-size:9.5px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#6B6B61;padding:0 20px 8px")}>Your questions</div>
          <div style={S("flex:1;min-height:0;overflow:auto;padding-bottom:8px")}>
            {v.threads.map((t, i) => (
              <div key={i}>
                {t.isHeader && (t.fold ? (
                  <button onClick={t.toggle} aria-expanded={t.fold === "open"} style={S("display:flex;align-items:center;gap:6px;width:100%;text-align:left;border:none;background:transparent;font-size:9.5px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#A3A399;padding:12px 20px 5px")}>
                    <svg viewBox="0 0 10 10" aria-hidden="true" style={S(`width:7px;height:7px;flex-shrink:0;transform:rotate(${t.fold === "open" ? 90 : 0}deg)`)}>
                      <path d="M2.5 0 L8 5 L2.5 10 Z" fill="#A3A399"></path>
                    </svg>
                    {t.label}
                  </button>
                ) : (
                  <div style={S("font-size:9.5px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#A3A399;padding:12px 20px 5px")}>{t.label}</div>
                ))}
                {t.isRow && (
                  <button className="by-row" onClick={t.open} aria-current={t.cur || undefined} style={S(`display:block;width:100%;text-align:left;padding:8px 20px;border:none;border-left:2px solid ${t.edge};background:${t.bg};font:inherit`)}>
                    <span style={S("display:flex;align-items:center;gap:7px")}>
                      {t.byYou && (
                        <span style={S(`width:5px;height:5px;border-radius:50%;background:${t.dot};flex-shrink:0`)}></span>
                      )}
                      {t.byBeyond && (
                        <svg viewBox="0 0 10 10" aria-hidden="true" style={S("width:9px;height:9px;margin:0 -2px;flex-shrink:0;overflow:visible")}>
                          <path d="M5 0 L6.05 3.95 L10 5 L6.05 6.05 L5 10 L3.95 6.05 L0 5 L3.95 3.95 Z" fill={t.dot}></path>
                        </svg>
                      )}
                      <span style={S(`font-size:12px;font-weight:${t.w};color:${t.fg};overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0`)}>{t.q}</span>
                    </span>
                    <span style={S("display:block;font-size:10px;color:#A3A399;padding-left:12px;margin-top:2px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap")}>{t.meta}</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div style={S("display:flex;flex-direction:column;border-top:1px solid #E5E5DA;padding-top:10px")}>
          <button onClick={v.goSpace} aria-current={v.nav.space.cur || undefined} style={S(`display:flex;align-items:center;gap:10px;width:100%;text-align:left;padding:9px 20px;border:none;background:${v.nav.space.bg};border-left:2px solid ${v.nav.space.edge};font-size:13px;font-weight:${v.nav.space.w};color:${v.nav.space.fg}`)}>
            My space
            <span style={S(`margin-left:auto;font-size:10.5px;color:${v.alertColor};font-weight:700;font-variant-numeric:tabular-nums`)}>{v.alertBadge}</span>
          </button>
          <button onClick={v.goSettings} aria-current={v.nav.settings.cur || undefined} style={S(`display:flex;align-items:center;gap:10px;width:100%;text-align:left;padding:9px 20px;border:none;background:${v.nav.settings.bg};border-left:2px solid ${v.nav.settings.edge};font-size:13px;font-weight:${v.nav.settings.w};color:${v.nav.settings.fg}`)}>
            Settings
            <span style={S("margin-left:auto;font-size:11px;color:#6B6B61;font-variant-numeric:tabular-nums")}>{v.connCount}</span>
          </button>
        </div>

        <div style={S("display:flex;flex-direction:column;gap:12px;padding:0 20px")}>
          <div style={S("display:flex;align-items:center;gap:9px")}>
            <span style={S("width:24px;height:24px;border-radius:50%;background:#14170F;color:#fff;font-size:9px;font-weight:700;display:grid;place-items:center")}>C</span>
            <span style={S("min-width:0")}>
              <span style={S("display:block;font-size:11.5px;font-weight:600")}>Charlotte</span>
              <span style={S("display:block;font-size:10px;color:#6B6B61")}>Ethica Africa</span>
            </span>
          </div>
        </div>
      </aside>

      <main style={S("display:flex;flex-direction:column;overflow:hidden")}>
        <div style={S(`flex-shrink:0;height:52px;display:flex;align-items:center;gap:16px;padding:0 40px;border-bottom:1px solid ${v.topRule}`)}>
          <div style={S("font-size:12px;font-weight:600;color:#14170F")}>{v.crumb}</div>
          {v.isSpace && <div style={S("font-size:11px;color:#A3A399;font-variant-numeric:tabular-nums")}>{v.crumb2}</div>}
        </div>

        <div style={S("flex:1;overflow:auto;position:relative")}>
          {v.isHome && <Ask v={v} />}
          {v.isChat && <Chat v={v} />}
          {v.isSpace && <Space v={v} />}
          {v.isSettings && <Settings v={v} />}
        </div>
      </main>
    </div>
  );
}
