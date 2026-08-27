import React from "react";
import { Logo } from "../../components/brand/Logo.jsx";
import { AskInput } from "../../components/core/AskInput.jsx";

export function Ask({ onAsk }) {
  const [q, setQ] = React.useState("");
  return (
    <div style={{
      minHeight: "100%", display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", padding: "56px 44px 48px", animation: "byFade 160ms ease-out"
    }}>
      <div style={{ width: "100%", maxWidth: 660, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Logo size={44} wordmark={false} />
        <div style={{ fontSize: 38, fontWeight: 700, letterSpacing: "-0.03em", marginTop: 16 }}>_beyond</div>
        <AskInput value={q} onChange={setQ} onSubmit={onAsk} style={{ marginTop: 30 }} />
      </div>
    </div>
  );
}
