import React from "react";

/** A source you could connect. */
export function LibraryCard({ name, sub, description, mode, trusted, icon, tint = "var(--by-cream)", color = "var(--by-ink)", action, style }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        border: "1px solid " + (hover ? "var(--by-ink)" : "var(--by-line)"), borderRadius: "var(--by-radius-surface)",
        padding: "14px 16px", display: "flex", flexDirection: "column", gap: 8, minWidth: 0,
        background: "var(--by-paper)", transition: "border-color 150ms ease", ...style
      }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
        <span style={{ width: 26, height: 26, borderRadius: 7, background: tint, color, display: "grid", placeItems: "center", fontSize: 10, fontWeight: 800, flexShrink: 0, border: "1px solid rgba(20,23,15,.08)" }}>{icon || (name || "").slice(0, 2).toUpperCase()}</span>
        <span style={{ minWidth: 0 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 5, minWidth: 0 }}>
            <span style={{ fontSize: 12.5, fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}</span>
            {trusted && <span title="Verified by _beyond" style={{ flexShrink: 0, width: 12, height: 12, borderRadius: "50%", background: "var(--by-ink)", color: "var(--by-cream)", display: "grid", placeItems: "center", fontSize: 7.5, fontWeight: 800, lineHeight: 1 }}>✓</span>}
          </span>
          <span style={{ display: "block", fontSize: 10, color: "var(--by-grey)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{sub}</span>
        </span>
      </div>
      <div style={{ fontSize: 11, lineHeight: 1.5, color: "var(--by-grey)", flex: 1 }}>{description}</div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
        <span style={{ fontSize: 8.5, color: "var(--by-grey)", letterSpacing: ".05em" }}>{mode}</span>
        {action}
      </div>
    </div>
  );
}
