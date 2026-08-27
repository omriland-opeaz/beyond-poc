import React from "react";

/** _beyond disagrees with the question. Ink head, actions on white below, and
 *  the decision stays the user's. */
export function ChallengeCard({ kicker, head, body, primary, secondary, note, style }) {
  return (
    <div style={{ border: "1px solid var(--by-ink)", borderRadius: "var(--by-radius-card)", overflow: "hidden", ...style }}>
      <div style={{ background: "var(--by-ink)", color: "var(--by-cream)", padding: "15px 20px 16px" }}>
        {kicker && <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--by-lime)" }}>{kicker}</div>}
        <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.3, marginTop: 8, textWrap: "pretty" }}>{head}</div>
        {body && <div style={{ fontSize: 12.5, lineHeight: 1.65, color: "rgba(247,247,239,.74)", marginTop: 8, maxWidth: 600 }}>{body}</div>}
      </div>
      <div style={{ background: "var(--by-paper)", padding: "14px 20px", display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10 }}>
        {primary}{secondary}
        {note && <span style={{ fontSize: 10.5, color: "var(--by-grey-light)", marginLeft: "auto", maxWidth: 320, textAlign: "right", textWrap: "pretty" }}>{note}</span>}
      </div>
    </div>
  );
}
