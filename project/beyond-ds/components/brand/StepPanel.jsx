import React from "react";

const TONES = {
  lime:  { bg: "var(--by-lime)", numeral: "var(--by-ink)", title: "var(--by-ink)",
           body: "rgba(20,23,15,.72)", pill: "var(--by-ink)", pillBorder: "rgba(20,23,15,.28)" },
  water: { bg: "var(--by-water-gradient)", numeral: "#FFFFFF", title: "var(--by-water-ink)",
           body: "rgba(11,34,51,.82)", pill: "#FFFFFF", pillBorder: "rgba(255,255,255,.65)" },
  ink:   { bg: "var(--by-ink)", numeral: "var(--by-lime)", title: "var(--by-cream)",
           body: "rgba(247,247,239,.7)", pill: "var(--by-cream)", pillBorder: "rgba(247,247,239,.35)" }
};

/** A numbered step. The numeral is oversized and tabular, the pill label sits
 *  opposite it, the text block is pinned to the bottom. */
export function StepPanel({ n, label, title, children, tone = "lime", minHeight = 330, style }) {
  const t = TONES[tone] || TONES.lime;
  return (
    <div style={{
      position: "relative", overflow: "hidden", borderRadius: "var(--by-radius-panel)",
      background: t.bg, padding: "26px 26px 24px", minHeight,
      display: "flex", flexDirection: "column", ...style
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <span style={{
          fontSize: "var(--by-text-numeral)", fontWeight: "var(--by-weight-display)",
          letterSpacing: "-0.05em", lineHeight: "var(--by-leading-numeral)",
          fontVariantNumeric: "var(--by-numeric)", color: t.numeral
        }}>{n}</span>
        {label && (
          <span style={{
            fontSize: "var(--by-text-kicker)", fontWeight: "var(--by-weight-bold)",
            letterSpacing: "var(--by-tracking-kicker)", padding: "5px 11px",
            borderRadius: "var(--by-radius-pill)", border: "1px solid " + t.pillBorder, color: t.pill
          }}>{label}</span>
        )}
      </div>
      <div style={{ marginTop: "auto" }}>
        <div style={{
          fontSize: "var(--by-text-card-title)", fontWeight: "var(--by-weight-display)",
          letterSpacing: "var(--by-tracking-wordmark)", lineHeight: 1.2, color: t.title
        }}>{title}</div>
        <p style={{ fontSize: "13px", lineHeight: 1.6, color: t.body, margin: "9px 0 0", textWrap: "pretty" }}>{children}</p>
      </div>
    </div>
  );
}
