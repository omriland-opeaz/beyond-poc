import React from "react";

/** A small outlined or filled label: uppercase step labels, status badges,
 *  category tags. */
export function Pill({ children, tone = "outline", style }) {
  const looks = {
    outline: { background: "transparent", color: "var(--by-ink)", border: "1px solid rgba(20,23,15,.28)" },
    cream: { background: "transparent", color: "var(--by-cream)", border: "1px solid rgba(247,247,239,.35)" },
    lime: { background: "var(--by-lime)", color: "var(--by-ink)", border: "1px solid var(--by-lime)" },
    ink: { background: "var(--by-ink)", color: "var(--by-cream)", border: "1px solid var(--by-ink)" },
    waiting: { background: "rgba(154,92,15,.08)", color: "var(--by-waiting)", border: "1px solid rgba(154,92,15,.3)" },
    broken: { background: "rgba(192,71,63,.06)", color: "var(--by-broken)", border: "1px solid rgba(192,71,63,.4)" },
    confirmed: { background: "rgba(2,155,130,.07)", color: "var(--by-confirmed)", border: "1px solid rgba(2,155,130,.35)" }
  }[tone];
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5, padding: "0 9px", height: 19,
      borderRadius: "var(--by-radius-pill)", fontSize: 9, lineHeight: 1, fontWeight: 700,
      letterSpacing: "0.07em", textTransform: "uppercase", whiteSpace: "nowrap", ...looks, ...style
    }}>{children}</span>
  );
}
