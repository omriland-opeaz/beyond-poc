import React from "react";

/** Pill tabs. The selected tab is ink; the rest are outlines. Counts sit
 *  inside the pill, tabular. */
export function Tabs({ items = [], value, onChange, size = "md", style }) {
  const pad = size === "sm" ? "5px 12px" : "8px 16px";
  const fs = size === "sm" ? 11 : 12;
  return (
    <div style={{ display: "flex", gap: size === "sm" ? 4 : 8, flexWrap: "wrap", ...style }}>
      {items.map(t => {
        const on = t.value === value;
        return (
          <button key={t.value} onClick={() => onChange && onChange(t.value)}
            aria-current={on ? "page" : undefined}
            style={{
              padding: pad, borderRadius: "var(--by-radius-pill)",
              border: "1px solid " + (on ? "var(--by-ink)" : "var(--by-line-strong)"),
              background: on ? "var(--by-ink)" : "var(--by-paper)",
              color: on ? "var(--by-paper)" : "var(--by-grey)",
              fontFamily: "var(--by-font-sans)", fontSize: fs, fontWeight: on ? 700 : 500,
              whiteSpace: "nowrap", cursor: "pointer"
            }}>
            {t.label}
            {t.count !== undefined && t.count !== "" && (
              <span style={{ marginLeft: 7, fontSize: 10.5, fontVariantNumeric: "var(--by-numeric)", color: on ? "rgba(255,255,255,.6)" : "var(--by-grey-light)" }}>{t.count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}
