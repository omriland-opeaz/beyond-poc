import { S } from "../css.js";

/* The front door. Nothing on this screen competes with the box. */

export default function Ask({ v }) {
  return (
    <div style={S("min-height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:56px 44px 48px;animation:byFade 160ms ease-out")}>
      <div style={S("width:100%;max-width:660px;display:flex;flex-direction:column;align-items:center")}>
        <div style={S("display:flex;align-items:center;gap:16px")}>
          <span style={S("width:44px;height:44px;border-radius:13px;background:#C8F068;overflow:hidden;position:relative;flex-shrink:0")}>
            <span style={S("position:absolute;right:-10px;bottom:-10px;width:34px;height:34px;border-radius:50%;background:#14170F")}></span>
          </span>
          <div style={S("font-size:38px;font-family:'Space Grotesk',sans-serif;font-weight:700;letter-spacing:-0.03em")}>_beyond</div>
        </div>
        <div className="by-box" style={S("position:relative;width:100%;margin-top:30px;background:#fff;border:1.5px solid #D3D3C4;border-radius:16px")}>
          <input
            id="by-ask"
            value={v.draft}
            onChange={v.setDraft}
            onKeyDown={v.askKey}
            placeholder={v.askPlaceholder}
            aria-label="Ask about the measured market"
            style={S("width:100%;background:transparent;border:none;border-radius:16px;padding:19px 62px 19px 22px;font-size:15px;outline:none;color:#14170F")}
          />
          <button onClick={v.askSend} aria-label="Ask" style={S(`position:absolute;right:9px;top:50%;transform:translateY(-50%);width:38px;height:38px;border-radius:10px;background:${v.askBg};border:none;display:grid;place-items:center;color:#14170F;font-size:15px;font-weight:700;cursor:${v.askCursor}`)}>→</button>
        </div>
      </div>
    </div>
  );
}
