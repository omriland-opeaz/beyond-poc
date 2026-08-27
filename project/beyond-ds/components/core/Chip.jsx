import React from "react";

/** A suggested follow-up question. Outline, 20px radius, cream on hover. */
export function Chip({ children, onClick, style }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        padding: "8px 14px", borderRadius: 20,
        border: "1px solid " + (hover ? "var(--by-ink)" : "var(--by-line-strong)"),
        background: hover ? "var(--by-cream)" : "var(--by-paper)",
        fontFamily: "var(--by-font-sans)", fontSize: 12, fontWeight: 500,
        color: "var(--by-ink)", textAlign: "left", cursor: "pointer", ...style
      }}>{children}</button>
  );
}
