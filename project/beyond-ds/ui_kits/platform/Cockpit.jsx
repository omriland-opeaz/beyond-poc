import React from "react";
import { Kicker } from "../../components/core/Kicker.jsx";
import { AlertBanner } from "../../components/app/AlertBanner.jsx";
import { MetricCard } from "../../components/data/MetricCard.jsx";
import { Sparkline } from "../../components/data/Sparkline.jsx";
import { BarChart } from "../../components/data/BarChart.jsx";
import { Donut } from "../../components/data/Donut.jsx";
import { RankRows } from "../../components/data/RankRows.jsx";

export function Cockpit({ onOpen }) {
  const cards = [
    { badge: "Alert", badgeTone: "broken", when: "2 h ago", title: "Advil share in Cocody", value: "8.9%", delta: "−11.4%", deltaTone: "down",
      foot: "112 pharmacies · week to 24 Aug", why: "You asked to be told below −10 %. Set 12 Aug.", whyTone: "broken",
      chart: <Sparkline height={82} values={[10.4, 10.6, 10.1, 10.3, 9.6, 8.9]} stroke="var(--by-broken)" /> },
    { badge: "Asked for you", when: "this morning", title: "Doliv share of measured units", value: "31.4%", delta: "−2.1 pts", deltaTone: "down",
      foot: "612 pharmacies · 24 months", why: "You have asked about this brand six times since June.",
      chart: <Sparkline height={82} area values={[33.9, 33.5, 33.6, 32.8, 32.1, 31.4]} /> },
    { badge: "Asked for you", when: "this morning", title: "Where the loss sits", value: "2 districts", delta: "of 11", deltaTone: "flat",
      foot: "week to 24 Aug", why: "Raised because the national number hid it.",
      chart: <RankRows size="sm" rows={[
        { label: "Cocody", value: -11.4, display: "−11.4%" },
        { label: "Plateau", value: -3.2, display: "−3.2%" },
        { label: "Yopougon", value: 2.1, display: "+2.1%" },
        { label: "Bouaké", value: 4.8, display: "+4.8%" }
      ]} /> },
    { badge: "Watched", badgeTone: "quiet", when: "nightly", title: "Sell-in vs sell-out gap", value: "14 days", delta: "+3 d", deltaTone: "down",
      foot: "four wholesalers · rolling 12 weeks", why: "You watched this on 4 Aug.",
      chart: <BarChart height={82} values={[9, 10, 11, 10, 12, 14]} axis={["wk 20", "wk 25"]} highlight={5} /> },
    { badge: "Asked for you", when: "yesterday", title: "Share by brand", value: "Top 3 = 68%", 
      foot: "oral analgesics · Côte d'Ivoire", why: "The cut you reach for first, learned from your questions.",
      chart: <Donut size={82} slices={[
        { label: "Doliv", value: 31.4, color: "var(--by-ink)", display: "31.4%" },
        { label: "Rival 1 g", value: 24.8, color: "var(--by-lime)", display: "24.8%" },
        { label: "Panadol", value: 11.8, color: "var(--by-water)", display: "11.8%" },
        { label: "Other", value: 32, color: "var(--by-line)", display: "32.0%" }
      ]} /> },
    { badge: "Coverage", badgeTone: "waiting", when: "nightly", title: "Small towns still unmeasured", value: "38%", delta: "of outlets", deltaTone: "flat",
      foot: "beyond the coastal belt", why: "Flagged because your last three questions were national.",
      chart: <RankRows size="sm" kind="dots" rows={[
        { label: "Abidjan", value: 94, display: "94%", color: "var(--by-confirmed)" },
        { label: "Bouaké", value: 71, display: "71%", color: "var(--by-ink)" },
        { label: "Korhogo", value: 34, display: "34%", color: "var(--by-waiting)" },
        { label: "Man", value: 18, display: "18%", color: "var(--by-waiting)" }
      ]} /> }
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100%", animation: "byFade 160ms ease-out" }}>
      <div style={{ flex: 1, padding: "34px 44px 40px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 24 }}>
          <div style={{ maxWidth: 620 }}>
            <Kicker>Wednesday 26 August 2026</Kicker>
            <h1 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.025em", lineHeight: 1.2, margin: "10px 0 0" }}>
              Six graphs <span style={{ color: "var(--by-lime-type)" }}>you don't have to ask for.</span>
            </h1>
          </div>
          <div style={{ fontSize: 10.5, color: "var(--by-grey)", flexShrink: 0 }}>recomputed 14 min ago</div>
        </div>
        <AlertBanner style={{ marginTop: 24 }} kicker="Alert fired · 2 h ago"
          claim="Advil share in Cocody fell 11.4 % week on week."
          note="you asked to be told below −10 % · set 12 Aug" onClick={onOpen} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 14, marginTop: 20 }}>
          {cards.map((c, i) => (
            <MetricCard key={i} {...c} onClick={onOpen}
              style={{ animation: "byRise 520ms var(--by-ease-out) " + Math.min(i * 60, 360) + "ms both" }}>
              {c.chart}
            </MetricCard>
          ))}
        </div>
      </div>
      <div style={{ flexShrink: 0, padding: "12px 44px", borderTop: "1px solid var(--by-line)", fontSize: 10.5, color: "var(--by-grey)" }}>
        Nothing here was configured. Click any graph to open the conversation it came from.
      </div>
    </div>
  );
}
