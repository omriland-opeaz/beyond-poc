import React from "react";

/** A connected source, feeding the lake. */
export function SourceTile({ name, foot, initials, tint = "#EDEDE2", color = "var(--by-ink)", state = "live", action, style }) {
  const dot = { live: "var(--by-confirmed)", idle: "var(--by-grey-light)", waiting: "var(--by-waiting)", broken: "var(--by-broken)" }[state];
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 10, width: "100%",
      border: "1px solid " + (state === "broken" ? "var(--by-broken)" : "var(--by-line)"),
      borderRadius: "var(--by-radius-surface)", padding: "10px 12px",
      background: state === "broken" ? "rgba(192,71,63,.04)" : "var(--by-paper)", ...style
    }}>
      <span style={{ width: 32, height: 32, borderRadius: 9, background: tint, color, display: "grid", placeItems: "center", fontSize: 11, fontWeight: 800, flexShrink: 0 }}>{initials}</span>
      <span style={{ minWidth: 0, flex: 1 }}>
        <span style={{ display: "block", fontSize: 12.5, fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}</span>
        <span style={{ display: "block", fontSize: 10, lineHeight: 1.45, color: state === "broken" ? "var(--by-broken)" : "var(--by-grey)", textWrap: "pretty" }}>{foot}</span>
      </span>
      {action || <span style={{ flexShrink: 0, width: 7, height: 7, borderRadius: "50%", background: dot, animation: state === "live" ? "byPulse 2.4s ease-in-out infinite" : undefined }} />}
    </div>
  );
}
