import React from "react";

/** The small uppercase line above a title. Grey, tracked out, 10–11px. */
export function Kicker({ children, color = "var(--by-grey)", style }) {
  return (
    <div style={{
      fontSize: 10.5, fontWeight: 700, letterSpacing: "var(--by-tracking-kicker-tight)",
      textTransform: "uppercase", color, ...style
    }}>{children}</div>
  );
}
