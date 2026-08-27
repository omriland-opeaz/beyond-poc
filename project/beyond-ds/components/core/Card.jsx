import React from "react";

/** A white surface with a 1px rule and a 14px radius. No shadow. */
export function Card({ children, tone = "paper", interactive, onClick, style }) {
  const [hover, setHover] = React.useState(false);
  const looks = {
    paper: { background: "var(--by-paper)", border: "1px solid var(--by-line)" },
    sunken: { background: "var(--by-cream)", border: "1px solid var(--by-line)" },
    lime: { background: "var(--by-lime-tint)", border: "1px solid var(--by-lime)" },
    ink: { background: "var(--by-ink)", border: "1px solid var(--by-ink)", color: "var(--by-cream)" },
    alert: { background: "rgba(192,71,63,.04)", border: "1px solid var(--by-broken)" }
  }[tone];
  const Tag = onClick ? "button" : "div";
  return (
    <Tag onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        ...looks, borderRadius: "var(--by-radius-card)", padding: "17px 19px",
        display: "flex", flexDirection: "column", minWidth: 0, textAlign: "left",
        font: "inherit", cursor: onClick ? "pointer" : "default",
        borderColor: (interactive || onClick) && hover ? "var(--by-ink)" : undefined,
        transition: "border-color 150ms ease", ...style
      }}>{children}</Tag>
  );
}
