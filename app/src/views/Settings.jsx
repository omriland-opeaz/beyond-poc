import { S } from "../css.js";
import Connect from "./Connect.jsx";
import DropZone from "./DropZone.jsx";
import Digest from "./Digest.jsx";
import Memory from "./Memory.jsx";

/* The machine room — not where the decision maker works. */

export default function Settings({ v }) {
  return (
    <div style={S("display:flex;flex-direction:column;min-height:100%;animation:byFade 160ms ease-out")}>
      <div style={S("flex-shrink:0;display:flex;align-items:center;gap:8px;padding:16px 44px 0")}>
        {v.setTabs.map((t, i) => (
          <button key={i} onClick={t.pick} aria-current={t.cur || undefined} style={S(`padding:8px 16px;border-radius:100px;border:1px solid ${t.border};background:${t.bg};font-size:12px;font-weight:${t.w};color:${t.fg};white-space:nowrap`)}>
            {t.label}
            <span style={S(`margin-left:7px;font-size:10.5px;color:${t.countFg};font-variant-numeric:tabular-nums`)}>{t.count}</span>
          </button>
        ))}
        <span style={S("margin-left:auto;font-size:10.5px;color:#A3A399")}>the machine room · not where the decision maker works</span>
      </div>

      {v.isConnectTab && (
        <>
          <div style={S("flex-shrink:0;display:flex;align-items:center;gap:7px;padding:14px 44px 0")}>
            <button onClick={v.pickSourcesTab} style={S(`padding:6px 13px;border-radius:100px;border:1px solid ${v.subSourcesBorder};background:#fff;font-size:11.5px;font-weight:${v.tabSourcesW};color:${v.tabSourcesFg}`)}>Sources</button>
            <button onClick={v.pickDropTab} style={S(`padding:6px 13px;border-radius:100px;border:1px solid ${v.subDropBorder};background:#fff;font-size:11.5px;font-weight:${v.tabDropW};color:${v.tabDropFg}`)}>Drop zone</button>
          </div>
          <div style={S("display:flex;flex-direction:column;min-height:100%;animation:byFade 160ms ease-out")}>
            <div style={S("flex:1;padding:38px 44px 36px")}>
              {v.isDropTab && <DropZone v={v} />}
              {v.isSourcesTab && <Connect v={v} />}
            </div>
          </div>
        </>
      )}

      {v.isDigestTab && <Digest v={v} />}
      {v.isMemoryTab && <Memory v={v} />}
    </div>
  );
}
