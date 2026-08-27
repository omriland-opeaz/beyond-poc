import React from "react";

/** Something _beyond learned about the user, and the button that deletes it. */
export function MemoryRow({ head, note, when, forgotten, onForget, style }) {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "minmax(0,1fr) 120px auto", gap: 18,
      alignItems: "baseline", padding: "14px 0", borderBottom: "1px solid var(--by-line)", ...style
    }}>
      <div style={{ minWidth: 0 }}>
        <div style={{
          fontSize: 13, fontWeight: 600, letterSpacing: "-0.005em", textWrap: "pretty",
          color: forgotten ? "var(--by-grey-light)" : "var(--by-ink)",
          textDecoration: forgotten ? "line-through" : "none"
        }}>{head}</div>
        {note && <div style={{ fontSize: 10.5, color: "var(--by-grey)", marginTop: 4 }}>{note}</div>}
      </div>
      <div style={{ fontSize: 10.5, color: "var(--by-grey)", textAlign: "right" }}>{when}</div>
      <button onClick={onForget}
        style={{
          padding: "5px 12px", borderRadius: "var(--by-radius-pill)", border: "1px solid var(--by-line-strong)",
          background: "var(--by-paper)", fontFamily: "var(--by-font-sans)", fontSize: 10.5, fontWeight: 700,
          color: forgotten ? "var(--by-lime-type)" : "var(--by-grey)", whiteSpace: "nowrap", cursor: "pointer"
        }}>{forgotten ? "Restore" : "Forget"}</button>
    </div>
  );
}
