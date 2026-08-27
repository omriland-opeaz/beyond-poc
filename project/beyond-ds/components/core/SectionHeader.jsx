import React from "react";

/** A section opens with a title, an optional note at the right, and a 2px ink
 *  rule under both. Rules over boxes. */
export function SectionHeader({ title, note, children, weight = "strong", style }) {
  return (
    <div style={{
      display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 18,
      paddingBottom: 10, borderBottom: weight === "strong" ? "2px solid var(--by-ink)" : "1px solid var(--by-line)",
      ...style
    }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 14, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: "-0.01em" }}>{title}</div>
        {children}
      </div>
      {note && <div style={{ fontSize: 11, color: "var(--by-grey)", whiteSpace: "nowrap" }}>{note}</div>}
    </div>
  );
}
