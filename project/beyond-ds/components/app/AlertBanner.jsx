import React from "react";

/** A fired alert. Red rule, the claim in the middle, the threshold the user set
 *  beside it, and a way in. */
export function AlertBanner({ kicker, claim, note, action = "why →", onClick, style }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: "flex", flexWrap: "wrap", alignItems: "center", gap: 14, width: "100%",
        textAlign: "left", padding: "15px 18px", borderRadius: "var(--by-radius-surface)",
        border: "1px solid var(--by-broken)",
        background: hover ? "rgba(192,71,63,.08)" : "rgba(192,71,63,.04)",
        font: "inherit", color: "inherit", cursor: "pointer", ...style
      }}>
      {kicker && <span style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--by-broken)", whiteSpace: "nowrap" }}>{kicker}</span>}
      <span style={{ fontSize: 13.5, fontWeight: 700, letterSpacing: "-0.01em", minWidth: 0 }}>{claim}</span>
      {note && <span style={{ fontSize: 11.5, color: "var(--by-grey)" }}>{note}</span>}
      <span style={{ marginLeft: "auto", fontSize: 12, fontWeight: 700, color: "var(--by-ink)", whiteSpace: "nowrap" }}>{action}</span>
    </button>
  );
}
