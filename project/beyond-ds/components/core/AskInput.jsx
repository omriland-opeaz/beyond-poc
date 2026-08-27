import React from "react";

/** The ask box. On the front door it is large with a 16px radius; in a
 *  conversation footer it is smaller and sits on cream. */
export function AskInput({ value, onChange, onSubmit, placeholder = "Ask about the measured market", size = "lg", style }) {
  const lg = size === "lg";
  const [focus, setFocus] = React.useState(false);
  const ready = (value || "").trim().length > 0;
  return (
    <div style={{
      position: "relative", width: "100%",
      background: lg ? "var(--by-paper)" : "var(--by-cream)",
      border: "1.5px solid " + (focus ? "var(--by-ink)" : lg ? "var(--by-line-strong)" : "var(--by-line)"),
      borderRadius: lg ? 16 : "var(--by-radius-input)",
      boxShadow: focus ? "0 0 0 4px var(--by-focus-ring)" : "none",
      transition: "border-color 160ms ease, box-shadow 160ms ease", ...style
    }}>
      <input
        value={value} placeholder={placeholder} aria-label={placeholder}
        onChange={e => onChange && onChange(e.target.value)}
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        onKeyDown={e => { if (e.key === "Enter" && onSubmit) onSubmit(value); }}
        style={{
          width: "100%", background: "transparent", border: "none", outline: "none",
          borderRadius: "inherit", fontFamily: "var(--by-font-sans)", color: "var(--by-ink)",
          padding: lg ? "19px 62px 19px 22px" : "14px 56px 14px 18px", fontSize: lg ? 15 : 13.5
        }} />
      <button onClick={() => onSubmit && onSubmit(value)} aria-label="Ask"
        style={{
          position: "absolute", right: lg ? 9 : 7, top: "50%", transform: "translateY(-50%)",
          width: lg ? 38 : 34, height: lg ? 38 : 34, borderRadius: lg ? 10 : 8, border: "none",
          background: ready ? "var(--by-lime)" : "var(--by-line)", color: "var(--by-ink)",
          display: "grid", placeItems: "center", fontSize: lg ? 15 : 14, fontWeight: 700,
          cursor: ready ? "pointer" : "default"
        }}>→</button>
    </div>
  );
}
