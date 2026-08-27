import React from "react";

/** A past question in the sidebar. A dot means you asked it; a four-point star
 *  means _beyond asked it for you. */
export function ThreadRow({ question, meta, askedByBeyond, active, onClick, style }) {
  const [hover, setHover] = React.useState(false);
  const mark = askedByBeyond ? "var(--by-lime-type)" : "var(--by-grey-light)";
  return (
    <button onClick={onClick} aria-current={active ? "page" : undefined}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: "block", width: "100%", textAlign: "left", padding: "8px 20px", border: "none",
        borderLeft: "2px solid " + (active ? "var(--by-ink)" : "transparent"),
        background: active ? "var(--by-nav-active-bg)" : hover ? "#F1F1E6" : "transparent",
        font: "inherit", cursor: "pointer", ...style
      }}>
      <span style={{ display: "flex", alignItems: "center", gap: 7 }}>
        {askedByBeyond ? (
          <svg viewBox="0 0 10 10" aria-hidden="true" style={{ width: 9, height: 9, margin: "0 -2px", flexShrink: 0, overflow: "visible" }}>
            <path d="M5 0 L6.05 3.95 L10 5 L6.05 6.05 L5 10 L3.95 6.05 L0 5 L3.95 3.95 Z" fill={mark} />
          </svg>
        ) : (
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: mark, flexShrink: 0 }} />
        )}
        <span style={{
          fontSize: 12, fontWeight: active ? 700 : 500, color: active ? "var(--by-ink)" : "var(--by-grey)",
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", minWidth: 0
        }}>{question}</span>
      </span>
      {meta && <span style={{ display: "block", fontSize: 10, color: "var(--by-grey-light)", paddingLeft: 12, marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{meta}</span>}
    </button>
  );
}
