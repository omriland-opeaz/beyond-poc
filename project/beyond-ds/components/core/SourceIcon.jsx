import React from "react";

/** A rounded-square tile for a source, a file type or a person: initials, or a
 *  vendor glyph dropped in as children. */
export function SourceIcon({ label, size = 32, tint = "var(--by-cream)", color = "var(--by-ink)", children, round, style }) {
  return (
    <span style={{
      width: size, height: size, flexShrink: 0, display: "grid", placeItems: "center",
      borderRadius: round ? "50%" : Math.round(size * 0.28),
      background: tint, color, fontFamily: "var(--by-font-sans)",
      fontSize: Math.max(8, Math.round(size * 0.34)), fontWeight: 800, ...style
    }}>{children || label}</span>
  );
}
