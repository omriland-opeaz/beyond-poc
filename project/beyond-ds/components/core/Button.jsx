import React from "react";

const SIZES = {
  lg: { padding: "14px 26px", fontSize: 14 },
  md: { padding: "10px 18px", fontSize: 12.5 },
  sm: { padding: "5px 12px", fontSize: 11 }
};

/** The one action on a screen is lime. Everything beside it is an outline. */
export function Button({ children, variant = "primary", size = "md", shape = "pill", disabled, onClick, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const s = SIZES[size] || SIZES.md;
  const radius = shape === "pill" ? "var(--by-radius-pill)" : "var(--by-radius-control)";
  const looks = {
    primary: { background: hover ? "var(--by-lime-hover)" : "var(--by-lime)", color: "var(--by-ink)", border: "none", fontWeight: 800 },
    secondary: { background: "var(--by-paper)", color: "var(--by-ink)", border: "1px solid " + (hover ? "var(--by-ink)" : "var(--by-line-strong)"), fontWeight: 600 },
    ink: { background: "var(--by-ink)", color: "var(--by-lime)", border: "none", fontWeight: 700 },
    ghost: { background: "transparent", color: hover ? "var(--by-ink)" : "var(--by-grey)", border: "none", fontWeight: 600 },
    danger: { background: "var(--by-broken)", color: "#fff", border: "none", fontWeight: 700 }
  }[variant];
  return (
    <button
      onClick={onClick} disabled={disabled}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        ...s, ...looks, borderRadius: radius, fontFamily: "var(--by-font-sans)",
        letterSpacing: "-0.01em", whiteSpace: "nowrap", cursor: disabled ? "default" : "pointer",
        opacity: disabled ? 0.45 : 1,
        transition: "background 150ms ease, border-color 150ms ease, transform 160ms var(--by-ease-out)",
        transform: hover && variant === "primary" && !disabled ? "translateY(-1px)" : "none",
        ...style
      }} {...rest}>{children}</button>
  );
}
