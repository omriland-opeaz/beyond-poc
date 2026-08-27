import React from "react";
import { Tabs } from "../../components/core/Tabs.jsx";
import { Button } from "../../components/core/Button.jsx";
import { SectionHeader } from "../../components/core/SectionHeader.jsx";
import { SourceTile } from "../../components/app/SourceTile.jsx";
import { LibraryCard } from "../../components/app/LibraryCard.jsx";
import { Lake } from "../../components/brand/Lake.jsx";

const SOURCES = [
  { initials: "TP", name: "Tedis Pharma", foot: "sell-in · 1 214 rows · 14 min ago", state: "live" },
  { initials: "LB", name: "Laborex portal", foot: "sell-out · nightly · 03:10", state: "live" },
  { initials: "SF", name: "SFTP · Bouaké", foot: "no file since 9 Aug", state: "broken" },
  { initials: "MB", name: "Mailbox · reports@", foot: "12 attachments read this month", state: "live" },
  { initials: "XL", name: "Field survey.xlsx", foot: "uploaded 4 Aug · 2 108 rows", state: "idle" },
  { initials: "GD", name: "Google Drive", foot: "38 files watched", state: "live" }
];

const V = "../../assets/";
const glyph = (file, size) => <img src={V + file} width={size || 17} height={size || 17} alt="" style={{ display: "block" }} />;

const LIBRARY = [
  { name: "Google Drive", sub: "General", trusted: true, mode: "read-only · nightly", description: "A folder of spreadsheets and PDFs, read as they land.", icon: glyph("vendor-drive.svg"), tint: "var(--by-paper)" },
  { name: "Dropbox", sub: "General", trusted: true, mode: "read-only · nightly", description: "Same as Drive, for teams who file there instead.", icon: glyph("vendor-dropbox.svg", 15), tint: "var(--by-paper)" },
  { name: "Laborex portal", sub: "Wholesalers", trusted: true, mode: "read-only · nightly", description: "Sell-out by outlet, where your account allows it." },
  { name: "Tedis Pharma", sub: "shared by Tedis Pharma", mode: "shared feed · weekly", description: "Delivery routes and sell-in, shared with your permission." },
  { name: "IQVIA extract", sub: "Public info", mode: "manual upload", description: "Whatever your licence lets you export, read as a file.", icon: glyph("vendor-excel.svg", 19), tint: "var(--by-paper)" },
  { name: "Ministry price list", sub: "Public info", trusted: true, mode: "read-only · monthly", description: "Reference prices, used to sanity-check invoice amounts." },
  { name: "Pharmacy census", sub: "Community", mode: "read-only", description: "Outlet counts by district, maintained by the community.", icon: glyph("vendor-sheets.svg", 19), tint: "var(--by-paper)" },
  { name: "Your own mailbox", sub: "General", trusted: true, mode: "read-only · continuous", description: "Attachments are read; nothing is ever sent or replied to." }
];

export function Connect() {
  const [tab, setTab] = React.useState("connect");
  const [cat, setCat] = React.useState("All");
  const cats = ["All", "General", "Wholesalers", "Public info", "Community"];
  const shown = LIBRARY.filter(l => cat === "All" || l.sub === cat || (l.sub || "").startsWith("shared") && cat === "Community");
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100%", animation: "byFade 160ms ease-out" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "16px 44px 0" }}>
        <Tabs value={tab} onChange={setTab} items={[
          { value: "connect", label: "Connect", count: 6 },
          { value: "digest", label: "Digest", count: 2 },
          { value: "memory", label: "Memory", count: 11 }
        ]} />
        <span style={{ marginLeft: "auto", fontSize: 10.5, color: "var(--by-grey-light)" }}>the machine room · not where the decision maker works</span>
      </div>
      <div style={{ flex: 1, padding: "30px 44px 36px" }}>
        <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--by-grey)", marginBottom: 18 }}>
          Connect · <span style={{ fontVariantNumeric: "var(--by-numeric)" }}>6</span> sources · one lake
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "264px 1fr 400px", alignItems: "stretch" }}>
          <div style={{ display: "flex", flexDirection: "column", position: "relative", zIndex: 2 }}>
            {SOURCES.map((s, i) => (
              <div key={s.name} style={{ flex: 1, display: "flex", alignItems: "center", padding: "5px 0", animation: "byRise 520ms var(--by-ease-out) " + i * 60 + "ms both" }}>
                <SourceTile {...s} action={s.state === "broken" ? <Button variant="danger" size="sm">Reconnect</Button> : undefined} />
              </div>
            ))}
          </div>
          <div style={{ position: "relative", margin: "0 -186px 0 0", minWidth: 120 }}>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}>
              {SOURCES.map((s, i) => {
                const y = (i + 0.5) * (100 / SOURCES.length);
                const stroke = s.state === "broken" ? "rgba(192,71,63,.55)" : s.state === "idle" ? "rgba(20,23,15,.28)" : "var(--by-water)";
                return <path key={i} d={"M0," + y + " L100,50"} fill="none" stroke={stroke} strokeWidth="1.6"
                  vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeDasharray="7 6"
                  style={s.state === "live" ? { animation: "byFlow 1s linear infinite" } : undefined} />;
              })}
            </svg>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 2 }}>
            <Lake width={310} rows="3.1M" foot="recomputed 14 min ago" />
          </div>
        </div>

        <SectionHeader style={{ marginTop: 36 }} title="Library" note="24 available">
          <Tabs size="sm" value={cat} onChange={setCat} items={cats.map(c => ({ value: c, label: c }))} />
        </SectionHeader>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 12, marginTop: 16 }}>
          {shown.map((l, i) => (
            <LibraryCard key={l.name} {...l}
              style={{ animation: "byRise 520ms var(--by-ease-out) " + Math.min(i * 50, 300) + "ms both" }}
              action={<Button variant="secondary" size="sm">+ Connect</Button>} />
          ))}
        </div>
      </div>
    </div>
  );
}
