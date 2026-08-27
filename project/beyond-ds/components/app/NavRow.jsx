import React from "react";

/** A sidebar row. Active is ink type on a lime wash with an ink left edge —
 *  never lime type. */
export function NavRow({ label, badge, badgeColor = "var(--by-grey)", active, onClick, style }) {
  return (
    <button onClick={onClick} aria-current={active ? "page" : undefined}
      style={{
        display: "flex", alignItems: "center", gap: 10, width: "100%", textAlign: "left",
        padding: "9px 20px", border: "none",
        borderLeft: "2px solid " + (active ? "var(--by-nav-active-edge)" : "transparent"),
        background: active ? "var(--by-nav-active-bg)" : "transparent",
        fontFamily: "var(--by-font-sans)", fontSize: 13,
        fontWeight: active ? 700 : 500, color: active ? "var(--by-ink)" : "var(--by-nav-inactive)",
        cursor: "pointer", ...style
      }}>
      {label}
      {badge !== undefined && badge !== "" && (
        <span style={{ marginLeft: "auto", fontSize: 10.5, fontWeight: 700, color: badgeColor, fontVariantNumeric: "var(--by-numeric)" }}>{badge}</span>
      )}
    </button>
  );
}
