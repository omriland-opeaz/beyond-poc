import React from "react";

/** A proposal waiting on the user. Kind and confidence, the claim, the
 *  reasoning, the evidence in a bordered column at the right, then the
 *  decision. Confidence is always visible. */
export function ApprovalRow({ kind, confidence, head, why, evidence = [], decided, outcome, actions, style }) {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "minmax(0,1.35fr) minmax(0,1fr)", gap: 28,
      alignItems: "start", padding: "22px 0", borderBottom: "1px solid var(--by-line)", ...style
    }}>
      <div>
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--by-waiting)", marginBottom: 8 }}>
          {kind}{confidence ? " · confidence " + confidence : ""}
        </div>
        <div style={{ fontSize: 16.5, fontWeight: 700, letterSpacing: "-0.015em", lineHeight: 1.35, textWrap: "pretty" }}>{head}</div>
        {why && <div style={{ fontSize: 12.5, lineHeight: 1.65, color: "var(--by-grey)", marginTop: 8 }}>{why}</div>}
        {!decided && actions && <div style={{ display: "flex", gap: 10, marginTop: 16 }}>{actions}</div>}
        {decided && (
          <div style={{
            display: "flex", alignItems: "center", flexWrap: "wrap", gap: 10, marginTop: 16,
            padding: "11px 14px", borderRadius: "var(--by-radius-control)",
            background: outcome && outcome.applied ? "#F4FAE3" : "var(--by-cream)",
            border: "1px solid " + (outcome && outcome.applied ? "var(--by-lime)" : "var(--by-line)")
          }}>
            <span style={{ fontSize: 12.5, fontWeight: 700, color: outcome && outcome.applied ? "var(--by-lime-type)" : "var(--by-grey)", whiteSpace: "nowrap" }}>{outcome && outcome.label}</span>
            <span style={{ fontSize: 11.5, lineHeight: 1.5, color: "var(--by-grey)", minWidth: 0 }}>{outcome && outcome.note}</span>
            {actions && <span style={{ marginLeft: "auto" }}>{actions}</span>}
          </div>
        )}
      </div>
      <div style={{ background: "var(--by-cream)", border: "1px solid var(--by-line)", borderRadius: "var(--by-radius-surface)", padding: "14px 16px", display: "flex", flexDirection: "column", gap: 9 }}>
        {evidence.map((e, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "104px 1fr", gap: 10, alignItems: "baseline" }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".04em", textTransform: "uppercase", color: e.color || "var(--by-grey)" }}>{e.label}</div>
            <div style={{ fontSize: 10.5, lineHeight: 1.5, color: "var(--by-ink)", fontVariantNumeric: "var(--by-numeric)" }}>{e.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
