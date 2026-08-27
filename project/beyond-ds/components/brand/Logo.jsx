import React from "react";

/** The mark plus the wordmark. The mark is a lime rounded square with an ink
 *  circle eclipsing it from the bottom-right. Nothing else. */
export function Logo({ size = 22, wordmark = true, tone = "ink", eclipse, style }) {
  const isInverse = tone === "cream";
  const fg = isInverse ? "var(--by-cream)" : "var(--by-ink)";
  const disc = eclipse || (isInverse ? "var(--by-cream)" : "var(--by-ink)");
  const inner = Math.round(size * 0.79);
  const off = Math.round(size * 0.22);
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: Math.round(size * 0.41), ...style }}>
      <span style={{
        width: size, height: size, borderRadius: Math.round(size * 0.29),
        background: "var(--by-lime)", overflow: "hidden", position: "relative", flexShrink: 0
      }}>
        <span style={{
          position: "absolute", right: -off, bottom: -off, width: inner, height: inner,
          borderRadius: "50%", background: disc
        }} />
      </span>
      {wordmark && (
        <span style={{
          fontFamily: "var(--by-font-sans)", fontWeight: "var(--by-weight-bold)",
          letterSpacing: "var(--by-tracking-wordmark)", fontSize: Math.round(size * 0.73),
          color: fg, whiteSpace: "nowrap"
        }}>_beyond</span>
      )}
    </span>
  );
}
