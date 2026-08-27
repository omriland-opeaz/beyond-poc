import React from "react";
import { Logo } from "../../components/brand/Logo.jsx";
import { Button } from "../../components/core/Button.jsx";
import { NavRow } from "../../components/app/NavRow.jsx";
import { ThreadRow } from "../../components/app/ThreadRow.jsx";

export const THREADS = [
  { group: "Today" },
  { id: "share", q: "Why did Doliv lose share?", meta: "today · 14:02" },
  { id: "cocody", q: "Cocody is falling faster than the market", meta: "asked for you · 2 h ago", askedByBeyond: true },
  { group: "This week" },
  { id: "cover", q: "Stock cover by wholesaler", meta: "Monday · 09:14" },
  { id: "pack", q: "Which pack format is growing?", meta: "Monday · 08:40" }
];

export function Shell({ view, onView, thread, onThread, crumb, children }) {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "250px 1fr", height: "100vh", overflow: "hidden",
      background: "var(--by-paper)", fontFamily: "var(--by-font-sans)", fontSize: 13,
      lineHeight: 1.55, color: "var(--by-ink)"
    }}>
      <aside style={{
        display: "flex", flexDirection: "column", gap: 18, padding: "24px 0 16px",
        background: "var(--by-cream)", borderRight: "1px solid var(--by-line)", overflow: "hidden"
      }}>
        <div style={{ padding: "0 20px" }}><Logo size={22} /></div>
        <div style={{ padding: "0 20px" }}>
          <Button size="md" style={{ width: "100%", justifyContent: "center", display: "flex" }}
            onClick={() => onView("ask")}>Ask</Button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
          <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--by-grey)", padding: "0 20px 8px" }}>Your questions</div>
          <div style={{ flex: 1, minHeight: 0, overflow: "auto", paddingBottom: 8 }}>
            {THREADS.map((t, i) => t.group ? (
              <div key={i} style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--by-grey-light)", padding: "12px 20px 5px" }}>{t.group}</div>
            ) : (
              <ThreadRow key={t.id} question={t.q} meta={t.meta} askedByBeyond={t.askedByBeyond}
                active={view === "chat" && thread === t.id}
                onClick={() => { onThread(t.id); onView("chat"); }} />
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", borderTop: "1px solid var(--by-line)", paddingTop: 10 }}>
          <NavRow label="Cockpit" badge="1" badgeColor="var(--by-broken)" active={view === "cockpit"} onClick={() => onView("cockpit")} />
          <NavRow label="Settings" badge={6} active={view === "connect"} onClick={() => onView("connect")} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "0 20px" }}>
          <span style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--by-ink)", color: "#fff", fontSize: 9, fontWeight: 700, display: "grid", placeItems: "center" }}>TS</span>
          <span style={{ minWidth: 0 }}>
            <span style={{ display: "block", fontSize: 11.5, fontWeight: 600 }}>Tom Smith</span>
            <span style={{ display: "block", fontSize: 10, color: "var(--by-grey)" }}>Norwell Pharma · West Africa</span>
          </span>
        </div>
      </aside>
      <main style={{ display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{
          flexShrink: 0, height: 52, display: "flex", alignItems: "center", gap: 16, padding: "0 40px",
          borderBottom: "1px solid " + (view === "ask" ? "transparent" : "var(--by-line)")
        }}>
          <div style={{ fontSize: 12, fontWeight: 600 }}>{crumb}</div>
        </div>
        <div style={{ flex: 1, overflow: "auto", position: "relative" }}>{children}</div>
      </main>
    </div>
  );
}
