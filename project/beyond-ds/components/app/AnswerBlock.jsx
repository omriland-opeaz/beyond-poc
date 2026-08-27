import React from "react";

/** An answer: the statement first, then the graph, then the method. The method
 *  is part of the answer, not a footnote. */
export function AnswerBlock({ head, accent, body, chartTitle, actions, children, method, style }) {
  return (
    <div style={style}>
      <div style={{ maxWidth: 700 }}>
        <h2 style={{ fontSize: "var(--by-text-answer)", fontWeight: 800, letterSpacing: "var(--by-tracking-title)", lineHeight: 1.2, margin: 0, textWrap: "pretty" }}>
          {head} {accent && <span style={{ color: "var(--by-lime-type)" }}>{accent}</span>}
        </h2>
        {body && <p style={{ fontSize: 13.5, lineHeight: 1.7, color: "var(--by-grey)", margin: "12px 0 24px", textWrap: "pretty" }}>{body}</p>}
      </div>
      <div style={{ borderTop: "2px solid var(--by-ink)", paddingTop: 14 }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 14 }}>
          <div style={{ fontSize: 12.5, fontWeight: 700 }}>{chartTitle}</div>
          {actions && <div style={{ display: "flex", gap: 8 }}>{actions}</div>}
        </div>
        {children}
      </div>
      {method && (
        <div style={{ display: "grid", gridTemplateColumns: "96px 1fr", gap: 18, padding: "14px 0", borderTop: "1px solid var(--by-line)", borderBottom: "1px solid var(--by-line)", marginTop: 22 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--by-grey)" }}>Method</div>
          <div style={{ fontSize: 11.5, lineHeight: 1.6, color: "var(--by-grey)" }}>{method}</div>
        </div>
      )}
    </div>
  );
}
