import React from "react";

/** A cockpit card: what it is, the number, the shape of it, and why it is
 *  here. Every card says why. */
export function MetricCard({ badge, badgeTone = "lime", when, title, value, delta, deltaTone, foot, why, whyTone = "lime", children, onClick, style }) {
  const [hover, setHover] = React.useState(false);
  const tones = {
    lime: { bg: "rgba(200,240,104,.3)", border: "rgba(20,23,15,.14)", fg: "var(--by-ink)" },
    waiting: { bg: "rgba(154,92,15,.08)", border: "rgba(154,92,15,.3)", fg: "var(--by-waiting)" },
    broken: { bg: "rgba(192,71,63,.06)", border: "rgba(192,71,63,.4)", fg: "var(--by-broken)" },
    quiet: { bg: "var(--by-cream)", border: "var(--by-line)", fg: "var(--by-grey)" }
  };
  const b = tones[badgeTone] || tones.lime;
  const dc = deltaTone === "down" ? "var(--by-broken)" : deltaTone === "up" ? "var(--by-confirmed)" : "var(--by-grey)";
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        textAlign: "left", border: "1px solid " + (hover ? "var(--by-ink)" : "var(--by-line)"),
        borderRadius: "var(--by-radius-card)", background: "var(--by-paper)", padding: "17px 19px 15px",
        display: "flex", flexDirection: "column", minWidth: 0, font: "inherit", color: "inherit",
        cursor: onClick ? "pointer" : "default", transition: "border-color 150ms ease", ...style
      }}>
      <span style={{ display: "flex", alignItems: "center", gap: 8, width: "100%" }}>
        {badge && <span style={{
          display: "inline-flex", alignItems: "center", padding: "0 9px", height: 19,
          borderRadius: 20, background: b.bg, border: "1px solid " + b.border, color: b.fg,
          fontSize: 9, lineHeight: 1, fontWeight: 700, letterSpacing: ".07em", textTransform: "uppercase", whiteSpace: "nowrap"
        }}>{badge}</span>}
        {when && <span style={{ marginLeft: "auto", fontSize: 10, color: "var(--by-grey)", whiteSpace: "nowrap" }}>{when}</span>}
      </span>
      <span style={{ display: "block", fontSize: 13, fontWeight: 700, letterSpacing: "-0.01em", lineHeight: 1.35, marginTop: 11, textWrap: "pretty" }}>{title}</span>
      <span style={{ display: "flex", alignItems: "baseline", gap: 9, marginTop: 7 }}>
        <span style={{ fontSize: 27, fontWeight: 800, letterSpacing: "-0.025em", fontVariantNumeric: "var(--by-numeric)" }}>{value}</span>
        {delta && <span style={{ fontSize: 12, fontWeight: 800, fontVariantNumeric: "var(--by-numeric)", color: dc, whiteSpace: "nowrap" }}>{delta}</span>}
      </span>
      {children && <span style={{ display: "block", marginTop: 12 }}>{children}</span>}
      {foot && <span style={{ display: "block", fontSize: 10, color: "var(--by-grey)", marginTop: 11 }}>{foot}</span>}
      {why && (
        <span style={{ display: "flex", alignItems: "center", gap: 7, marginTop: 11, paddingTop: 10, borderTop: "1px solid var(--by-line-faint)" }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", flexShrink: 0, background: whyTone === "broken" ? "var(--by-broken)" : whyTone === "waiting" ? "var(--by-waiting)" : "var(--by-lime)" }} />
          <span style={{ fontSize: 10.5, color: "var(--by-grey)", minWidth: 0, textWrap: "pretty" }}>{why}</span>
        </span>
      )}
    </button>
  );
}
