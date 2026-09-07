import React from "react";
import Intro from "./views/Intro.jsx";
import Shell from "./views/Shell.jsx";

/* Ported from `source/Beyond Platform v3 - Final.dc.html`. The logic below is the
   prototype's own class, unchanged apart from extending React.Component instead of
   the design-canvas DCLogic base. renderVals() is still the single seam between the
   logic and the views. */

export default class BeyondPlatform extends React.Component {
  state = { view: null, step: null, question: null, digestDone: {}, memOff: {}, lib: "All", watching: false, alerting: false, spaceId: "advil", arranger: "beyond", deepOn: {},
            connTab: "sources", setTab: null, dz: "idle", dzStepI: 0, added: {}, asked: 0, draft: "" };

  get view() {
    const v = this.state.view || this.props.startView || "home";
    /* cockpit and spaces are the two names this screen used to have. Old links keep working. */
    return (v === "cockpit" || v === "spaces") ? "space" : v;
  }

  wm(s, ink) {
    if (typeof s !== "string" || s.indexOf("_beyond") < 0) return s;
    const out = [];
    s.split("_beyond").forEach((part, i) => {
      if (i) out.push(React.createElement("span", { key: "w" + i, style: { fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, letterSpacing: "-0.02em", color: ink || "#14170F" } }, "_beyond"));
      if (part) out.push(part);
    });
    return out;
  }

  ns(id) {
    const a = this.view === id;
    return a
      ? { bg: "linear-gradient(90deg,rgba(200,240,104,.42),transparent)", fg: "#14170F", edge: "#14170F", w: "700", on: true, cur: "page" }
      : { bg: "transparent", fg: "#6B6B61", edge: "transparent", w: "500", on: false, cur: null };
  }

  addedCount() {
    const a = this.state.added || {};
    return Object.keys(a).filter(k => a[k]).length;
  }

  lakeScaleNow() { return 1 + Math.min(this.addedCount(), 6) * 0.037; }

  measureFlow() {
    if (this.__mt) clearTimeout(this.__mt);
    this.__mt = setTimeout(() => {
      const h = this.flowEl ? this.flowEl.getBoundingClientRect().height : 0;
      if (h && Math.abs(h - (this.state.colH || 0)) > 2) this.setState({ colH: h });
    }, 60);
  }

  connected() {
    const bars = (arr, err) => arr.map((h, i) => ({ h: h + "%", c: err && i >= arr.length - 3 ? "#E5B8B4" : h > 0 ? "#D8EBA0" : "#EFEFE4" }));
    const extra = this.libraryItems()
      .filter(l => this.state.added[l.name])
      .map(l => ({ ini: l.ini.slice(0, 2).toUpperCase(), mono: "#14170F", name: l.name, kind: l.cat,
        status: "SYNCING", stColor: "#9A5C0F", anim: "byPulse 1.4s ease-in-out infinite",
        border: "#E5E5DA", bg: "#fff", fresh: "First import running", vol: "—",
        hist: bars([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), hasError: false }));
    return extra.concat([
      { ini: "PP", mono: "#5F7A12", name: "Pharmacy panel", kind: "What 612 pharmacies sell", status: "LIVE", stColor: "#029B82", anim: "byPulse 2.2s ease-in-out infinite", border: "#E5E5DA", bg: "#fff", fresh: "Imported 2 h ago", vol: "48,210 rows/mo", hist: bars([55, 60, 58, 64, 62, 70, 66, 72, 68, 74, 76, 80]), hasError: false },
      { ini: "SV", mono: "#14170F", name: "Sivop wholesale", kind: "Monthly file, dropped by SFTP", status: "ERROR", stColor: "#C0473F", anim: "none", border: "rgba(192,71,63,.35)", bg: "rgba(192,71,63,.03)", fresh: "Last good import 9 days ago", vol: "21,887 rows/mo", hist: bars([60, 62, 58, 64, 66, 62, 68, 64, 60, 0, 0, 0], true), hasError: true, error: "Credential expired · 3 imports failed", fix: "Renew" },
      { ini: "AD", mono: "#029B82", name: "Norwell internal", kind: "Your own sales, every night", status: "LIVE", stColor: "#029B82", anim: "byPulse 2.2s ease-in-out infinite", border: "#E5E5DA", bg: "#fff", fresh: "Imported 04:12 today", vol: "9,044 rows/mo", hist: bars([40, 42, 44, 40, 46, 44, 48, 46, 50, 48, 52, 50]), hasError: false },
      { ini: "WH", mono: "#F67748", name: "Wholesaler orders", kind: "What wholesalers ship · API", status: "LIVE", stColor: "#029B82", anim: "byPulse 2.2s ease-in-out infinite", border: "#E5E5DA", bg: "#fff", fresh: "Imported yesterday", vol: "8,331 rows/mo", hist: bars([30, 34, 32, 38, 36, 40, 42, 44, 40, 46, 48, 50]), hasError: false },
      { ini: "PL", mono: "#9A5C0F", name: "Official price list", kind: "Public · PDF each quarter", status: "IDLE", stColor: "#6B6B61", anim: "none", border: "#E5E5DA", bg: "#fff", fresh: "Next issue Oct 2026", vol: "12 rows/quarter", hist: bars([0, 0, 60, 0, 0, 60, 0, 0, 62, 0, 0, 0]), hasError: false },
      { ini: "PO", mono: "#8AA31E", name: "Population data", kind: "Public · open data", status: "IDLE", stColor: "#6B6B61", anim: "none", border: "#E5E5DA", bg: "#fff", fresh: "2025 census, stable", vol: "static reference", hist: bars([50, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), hasError: false }
    ]);
  }

  libraryItems() {
    return [
      { ini: "CSV", name: "File upload", cat: "General", desc: "Drop PDF, CSV, Excel, Word or images by hand", mode: "MANUAL", popular: true },
      { ini: "@", name: "Custom dedicated inbox", cat: "General", desc: "Forward anything to your own _beyond address", mode: "SCHEDULED" },
      { ini: "YM", name: "Your mailbox", cat: "General", desc: "Read the reports already sitting in Gmail or Outlook", mode: "ON YOUR BEHALF", popular: true },
      { ini: "DB", logo: "db", tintOverride: "#0061FF", name: "Dropbox", cat: "General", desc: "Watch a folder your team already drops files in", mode: "SCHEDULED" },
      { ini: "GD", logo: "gd", tintOverride: "#FFFFFF", name: "Google Drive", cat: "General", desc: "Watch a shared drive folder for new files", mode: "SCHEDULED", popular: true },
      { ini: "API", name: "REST API", cat: "General", desc: "Call your endpoint with credentials you scope", mode: "SCHEDULED" },
      { ini: "MC", name: "MCP server", cat: "General", desc: "Read a live tool like any other source", mode: "LIVE" },
      { ini: "GS", logo: "gs", tintOverride: "#FFFFFF", name: "Google Sheets", cat: "General", desc: "Read the hand-kept spreadsheet where it lives", mode: "LIVE", popular: true },
      { ini: "XL", logo: "xl", tintOverride: "#FFFFFF", name: "Excel Online", cat: "General", desc: "Workbooks on SharePoint or OneDrive", mode: "LIVE" },

      { ini: "L'O", logo: "loreal", tintOverride: "#FFFFFF", name: "L'Oréal portal", cat: "Brand portals", desc: "Your sell-in reports, pulled with your own login", mode: "ON YOUR BEHALF", trusted: true, popular: true },
      { ini: "SAN", logo: "sanofi", tintOverride: "#FFFFFF", name: "Sanofi partner portal", cat: "Brand portals", desc: "Orders, rebates and claims", mode: "ON YOUR BEHALF", trusted: true },
      { ini: "BAY", logo: "bayer", tintOverride: "#FFFFFF", name: "Bayer wholesaler portal", cat: "Brand portals", desc: "Monthly statements and price letters", mode: "ON YOUR BEHALF", trusted: true },
      { ini: "PFE", logo: "pfizer", tintOverride: "#FFFFFF", name: "Pfizer distributor hub", cat: "Brand portals", desc: "Allocation and shipment reports", mode: "ON YOUR BEHALF", trusted: true },
      { ini: "HAL", logo: "haleon", tintOverride: "#FFFFFF", name: "Haleon trade portal", cat: "Brand portals", desc: "Consumer health orders, promotions, credit notes", mode: "ON YOUR BEHALF", trusted: true },
      { ini: "OP", logo: "opeaz", tintOverride: "#FFFFFF", name: "Opeaz execution", cat: "Brand portals", desc: "Trade execution data, read-only", mode: "LIVE", trusted: true },

      { ini: "UB", name: "Ubipharm", cat: "Wholesalers", desc: "Wholesaler flows for 8 West African markets", mode: "SCHEDULED", trusted: true, popular: true },
      { ini: "CP", name: "Copharmed", cat: "Wholesalers", desc: "Côte d'Ivoire interior coverage", mode: "SCHEDULED", trusted: true },
      { ini: "TD", name: "Tedis Pharma", cat: "Wholesalers", desc: "Francophone Africa distribution flows", mode: "LIVE", trusted: true },
      { ini: "WP", name: "Winpharma exports", cat: "Wholesalers", desc: "Pharmacy till exports, where contributors run it", mode: "SCHEDULED", trusted: true },

      { ini: "PN", name: "Pharmacy panel · Senegal", cat: "Public info", desc: "The same sell-out panel, 380 pharmacies", mode: "LIVE", trusted: true },
      { ini: "OM", logo: "who", tintOverride: "#FFFFFF", name: "WHO health stats", cat: "Public info", desc: "Epidemiology baselines for seasonality", mode: "SCHEDULED", trusted: true, popular: true },
      { ini: "DN", name: "Customs imports", cat: "Public info", desc: "What crossed the border, upstream of wholesalers", mode: "SCHEDULED", trusted: true },
      { ini: "PS", name: "Price list · Senegal", cat: "Public info", desc: "Published prices, next market over", mode: "SCHEDULED", trusted: true },
      { ini: "HF", name: "Health facilities", cat: "Public info", desc: "Clinics and hospitals per district", mode: "SCHEDULED", trusted: true },

      { ini: "PR", name: "Pharmacy register", cat: "Community", by: "Ordre des Pharmaciens", desc: "Licensed outlets, shared by Ordre des Pharmaciens", mode: "SHARED", trusted: true, popular: true },
      { ini: "CI", name: "District population", cat: "Community", by: "Omri Landman", desc: "Counted by hand, shared by Omri Landman", mode: "SHARED" },
      { ini: "GX", name: "Shelf price survey", cat: "Community", by: "Kea Santé", desc: "40 generics in Abidjan, shared by Kea Santé", mode: "SHARED" },
      { ini: "RD", name: "Delivery routes", cat: "Community", by: "Tedis Pharma", desc: "Serving days per outlet, shared by Tedis Pharma", mode: "SHARED" }
    ];
  }

  chartHbars(rows, lo, hi) {
    const span = hi - lo, zero = (0 - lo) / span;
    const signed = rows.some(r => r.pts < 0);
    return { kind: "hbars", zeroAt: (zero * 100).toFixed(1) + "%", showZero: signed, rows: rows.map(r => ({
      name: r.name, note: r.note, color: r.color,
      v: (signed ? (r.pts > 0 ? "+" : r.pts < 0 ? "−" : "") : "") + Math.abs(r.pts).toFixed(r.dp === 0 ? 0 : 1),
      left: (((r.pts < 0 ? r.pts : 0) - lo) / span * 100).toFixed(1) + "%",
      w: (Math.abs(r.pts) / span * 100).toFixed(1) + "%" })) };
  }

  chartBars(vals, labels, col, last) {
    const max = Math.max.apply(null, vals) * 1.08, step = 100 / vals.length, w = step * 0.58;
    return { kind: "bars", vals: vals, axis: labels.map(t => ({ t: t })), bars: vals.map((v, i) => {
      const h = (v / max) * 44;
      return { x: (i * step + step * 0.21).toFixed(2), w: w.toFixed(2), h: h.toFixed(2), y: (44 - h).toFixed(2),
        c: i === vals.length - 1 ? (last || col) : col };
    }) };
  }

  chartRing(parts) {
    const C = 100.53, tot = parts.reduce((s, p) => s + p.v, 0);
    let cum = 0;
    return { kind: "donut", vals: parts.map(p => p.v), ring: parts.map(p => {
      const len = (p.v / tot) * C, seg = { c: p.c, dash: len.toFixed(2) + " " + (C - len).toFixed(2), off: (-cum).toFixed(2) };
      cum += len; return seg;
    }), legend: parts.map(p => ({ c: p.c, t: p.n, v: p.v.toFixed(1) + "%" })) };
  }

  chartCurve(vals, labels, col, fill) {
    const max = Math.max.apply(null, vals) * 1.1;
    const pts = vals.map((v, i) => ((i / (vals.length - 1)) * 100).toFixed(1) + "," + (44 - (v / max) * 42).toFixed(1));
    return { kind: fill ? "area" : "line", vals: vals, stroke: col, fill: fill, pts: pts.join(" "),
      fillD: "M0,44 L" + pts.join(" L") + " L100,44 Z", axis: labels.map(t => ({ t: t })) };
  }

  chartDots(rows, hi) {
    return { kind: "dots", rows: rows.map(r => ({ name: r.name, note: r.note, color: r.color,
      v: String(r.pts), left: ((r.pts / hi) * 100).toFixed(1) + "%" })) };
  }

  answers() {
    const months = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
    return [
      { id: "national", origin: "you", when: "asked today",
        q: "How is Advil doing in Côte d'Ivoire?",
        title: "Advil, nationally",
        v: "48 210", delta: "+1.2%", dc: "#029B82", foot: "units · July · every district",
        head: "48 210 units in July.",
        headAccent: "Nationally, Advil is flat.",
        body: "Volume is 1.2 % above June and 8 % above the twelve-month average. Nothing in the national line is large enough to explain what your reps are reporting from the field.",
        chartTitle: "Units sold, by month",
        method: "Sell-out from the 612 panel pharmacies, weighted by district and outlet size. Confirmed identities only. Figures are illustrative.",
        crumb: "Advil nationally, twelve months",
        trace: ["read question · one brand, one country, over time", "resolved Advil to 4 confirmed identities", "queried lake · 612 outlets × 12 months"],
        chart: this.chartBars([41.2, 42.8, 39.9, 43.1, 42.4, 40.6, 43.9, 44.8, 46.1, 46.9, 47.6, 48.2], months, "#D8EBA0", "#5F7A12") },

      { id: "citysize", origin: "you", when: "asked today",
        q: "Split it by city size.",
        title: "Advil by city size",
        v: "+3.1 pts", delta: "small towns", dc: "#029B82", foot: "share points · three months · by city size",
        head: "The flat line is two lines.",
        headAccent: "Cities are losing, small towns are gaining.",
        body: "Abidjan gave up 2.4 share points over three months and the other large towns 0.6. Towns under 50 000 gained 3.1. The national number is flat because the two cancel each other out.",
        chartTitle: "Share points, three months, by city size",
        method: "Share on confirmed identities. Abidjan and the large towns clear the threshold of 3 contributors and 40 units. Towns under 50 000 do not: 2 contributors, 31 units, so that line is directional. Figures are illustrative.",
        crumb: "Advil by city size, three months",
        trace: ["read question · same brand, a cut you have never used", "grouped 43 towns into three bands by population", "queried lake · 612 outlets × 4 months", "checked threshold per band · 2 of 3 pass"],
        chart: this.chartHbars([
          { name: "Abidjan", pts: -2.4, note: "four districts · measured", color: "#C0473F" },
          { name: "Large towns", pts: -0.6, note: "over 50 000 · measured", color: "#F67748" },
          { name: "Small towns", pts: 3.1, note: "under 50 000 · directional, 2 contributors", color: "#9A5C0F" }], -2.6, 3.3) },

      { id: "citysize2", origin: "you", when: "widened today",
        q: "Small towns, measured.",
        title: "Advil by city size, widened",
        v: "+2.7 pts", delta: "measured", dc: "#029B82", foot: "share points · three months · after widening",
        head: "Small towns are up 2.7 points.",
        headAccent: "Measured now, not directional.",
        body: "With the interior wholesaler in the lake, towns under 50 000 rest on 4 contributors and 61 units, which clears the threshold. The gain is 2.7 points, slightly below the directional estimate. Abidjan and the large towns have not moved.",
        chartTitle: "Share points, three months, by city size",
        method: "Share on confirmed identities. All three bands now clear the threshold of 3 contributors and 40 units. The survey of 40 small-town pharmacies is queued and will widen this again in five days. Figures are illustrative.",
        crumb: "Advil by city size, widened",
        trace: ["added source · Copharmed interior feed · 14 towns", "re-resolved outlet identities · 41 new matches", "recomputed lake · 626 outlets × 4 months", "checked threshold per band · 3 of 3 pass"],
        chart: this.chartHbars([
          { name: "Abidjan", pts: -2.4, note: "four districts · measured", color: "#C0473F" },
          { name: "Large towns", pts: -0.6, note: "over 50 000 · measured", color: "#F67748" },
          { name: "Small towns", pts: 2.7, note: "under 50 000 · 4 contributors · 61 units", color: "#5F7A12" }], -2.6, 3.3) },

      { id: "units", origin: "you", when: "asked 2 Aug",
        q: "How many units did we sell each month?",
        title: "Units sold, month by month",
        v: "48 210", delta: "+1.2%", dc: "#029B82", foot: "twelve months · all districts",
        head: "48 210 units in July.",
        headAccent: "The best month of the twelve.",
        body: "Volume has climbed every month since February. July is 8 % above the twelve-month average, and the two weakest months, October and January, are the two shortest selling months of the year.",
        chartTitle: "Units sold, by month",
        method: "Sell-out from the 612 panel pharmacies, weighted by district and outlet size. Confirmed outlet identities only.",
        crumb: "units sold, twelve months",
        trace: ["read question · volume over time", "resolved Advil to 4 confirmed identities", "queried lake · 612 outlets × 12 months"],
        chart: this.chartBars([41.2, 42.8, 39.9, 43.1, 42.4, 40.6, 43.9, 44.8, 46.1, 46.9, 47.6, 48.2], months, "#D8EBA0", "#5F7A12") },

      { id: "share", origin: "you", when: "asked 2 Aug",
        q: "How is the analgesics category split between brands?",
        title: "Share of the analgesics category",
        v: "31.4%", delta: "−2.1 pts", dc: "#C0473F", foot: "units · July · five brands",
        trend: [33.5, 33.6, 33.4, 33.2, 33.0, 32.9, 32.6, 32.3, 32.1, 31.8, 31.6, 31.4],
        head: "Advil holds 31.4 % of units.",
        headAccent: "Nurofen is at 23.8 % and rising.",
        body: "Advil is still first, but the lead over Nurofen is 7.6 points, down from 14.2 a year ago. Doliprane and Panadol are flat. The rest is spread across ten smaller brands, none above 5 %.",
        chartTitle: "Category share, by brand",
        method: "Units, July 2026, confirmed identities only. Brands under 5 % grouped as others.",
        crumb: "category share, July 2026",
        trace: ["read question · category split", "resolved 14 brands · 10 grouped", "queried lake · 612 outlets × 1 month"],
        chart: this.chartRing([
          { n: "Advil 200 mg", v: 31.4, c: "#5F7A12" },
          { n: "Nurofen", v: 23.8, c: "#F67748" },
          { n: "Doliprane", v: 12.1, c: "#9A5C0F" },
          { n: "Panadol", v: 8.5, c: "#A3A399" },
          { n: "Ten others", v: 24.2, c: "#E5E5DA" }]) },

      { id: "value", origin: "you", when: "asked 12 May",
        q: "What is our sell-out value month by month?",
        title: "Sell-out value in XOF",
        v: "60.3M", delta: "+0.8%", dc: "#029B82", foot: "XOF · twelve months · list prices",
        head: "60.3 million XOF in July.",
        headAccent: "Value grew slower than volume.",
        body: "Volume rose 1.2 % and value 0.8 %. The gap is the promotional discount running in Abidjan since April: more units, slightly less per unit.",
        chartTitle: "Sell-out value, by month",
        method: "Units multiplied by the official list price for the month. Discounts applied where the source records them.",
        crumb: "sell-out value, twelve months",
        trace: ["read question · value over time", "joined units to the official price list", "queried lake · 612 outlets × 12 months"],
        chart: this.chartCurve([52.1, 53.4, 50.2, 54.1, 53.6, 51.4, 55.2, 56.4, 58.0, 59.1, 59.8, 60.3], months, "#A5CE3C", "rgba(200,240,104,.30)") },

      { id: "coef", origin: "you", when: "asked today",
        q: "What is the coefficient between consumer price and ex-factory price for dermocosmetics?",
        title: "Ex-factory to consumer, by category",
        v: "3.4×", delta: "dermocosmetics", dc: "#5F7A12", foot: "consumer price ÷ ex-factory price · July",
        head: "Dermocosmetics runs at 3.4×.",
        headAccent: "Not 5×, and never 2×.",
        body: "A tube that leaves the factory at 1 000 XOF reaches the counter at 3 400. The importer takes 1.42×, the wholesaler 1.18×, the pharmacy 1.35×, and import duty plus VAT carry the rest. Regulated medicines sit far lower, because the price decree caps them: antibiotics at 1.9 and chronic treatments at 1.8.",
        chartTitle: "Consumer price ÷ ex-factory price, by category",
        method: "Matched pairs only: 1 214 products where an ex-factory price from the wholesaler feed and a consumer price from the official list or the shelf survey exist in the same month. The coefficient is the median per category, July 2026, not a modelled markup chain. Figures are illustrative.",
        crumb: "price coefficient by category",
        trace: ["read question · a ratio, not a formula", "paired ex-factory to consumer prices · 1 214 products", "took the median per category · 5 categories", "checked threshold per category · 5 of 5 pass"],
        chart: this.chartHbars([
          { name: "Food supplements", pts: 3.8, note: "free price · 214 products", color: "#9A5C0F" },
          { name: "Dermocosmetics", pts: 3.4, note: "free price · 386 products", color: "#5F7A12" },
          { name: "OTC analgesics", pts: 2.6, note: "free price · 178 products", color: "#F67748" },
          { name: "Antibiotics", pts: 1.9, note: "capped by decree · 203 products", color: "#5B9BD9" },
          { name: "Chronic treatments", pts: 1.8, note: "capped by decree · 233 products", color: "#5B9BD9" }], 0, 4.1) },

      { id: "loss", origin: "beyond", when: "for you · today",
        q: "Where did Advil lose share last quarter, and to whom?",
        why: "Your share fell for the third month running and nobody had asked where it was going. So _beyond asked.",
        title: "Where the share went",
        v: "−2.1 pts", delta: "3 months", dc: "#C0473F", foot: "share points lost, by district",
        head: "Advil lost 2.1 points.",
        headAccent: "Three quarters of it went to Nurofen, in Abidjan.",
        body: "Cocody and Yopougon account for 1.6 of the 2.1 points. Nurofen took 1.3 of those, entirely in the 400 mg sachet format, which entered 214 of the 612 panel pharmacies over the same window. Outside Abidjan the share is flat.",
        chartTitle: "Share points lost, by district",
        method: "Share computed on confirmed identities only. Cocody and Yopougon each clear the threshold of 3 contributors and 40 units. Treichville is reported as directional: 2 contributors.",
        crumb: "share loss, Q2 2026",
        trace: ["noticed · share down 3 months, no question asked", "wrote the question · share loss, one brand, one quarter", "queried lake · 612 outlets × 4 months", "checked threshold per district · 8 of 9 pass"],
        chart: this.chartHbars([
          { name: "Cocody", pts: -0.9, note: "to Nurofen", color: "#C0473F" },
          { name: "Yopougon", pts: -0.7, note: "to Nurofen", color: "#C0473F" },
          { name: "Plateau", pts: -0.3, note: "to others", color: "#F67748" },
          { name: "Treichville", pts: -0.2, note: "to others · directional", color: "#F67748" },
          { name: "Bouaké", pts: 0.1, note: "gained", color: "#029B82" }], -1.0, 0.1) },

      { id: "rival", origin: "beyond", when: "for you · today",
        q: "How fast is Nurofen 400 mg spreading through the panel?",
        why: "A format that did not exist in your panel seven months ago is now in a third of it. _beyond thought you would want the curve.",
        title: "Pharmacies stocking Nurofen 400 mg",
        v: "214", delta: "+9 this wk", dc: "#C0473F", foot: "of 612 panel pharmacies · weekly",
        head: "From zero to 214 in seven months.",
        headAccent: "The curve has not flattened.",
        body: "The 400 mg sachet entered the panel in January and has added outlets every week since. It is now in 35 % of the panel, and 20 of the 25 pharmacies that dropped Advil stock it.",
        chartTitle: "Pharmacies stocking Nurofen 400 mg",
        method: "Counted weekly on confirmed outlet identities. A pharmacy counts as stocking from its first recorded sale.",
        crumb: "competitor spread, 7 months",
        trace: ["noticed · new format, 7 straight months of growth", "wrote the question · how fast, how far", "queried lake · 612 outlets × 30 weeks"],
        chart: this.chartCurve([0, 4, 18, 47, 96, 148, 190, 214], ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "now"], "#C0473F") },

      { id: "stopped", origin: "beyond", when: "for you · yesterday",
        q: "Which pharmacies stopped stocking Advil?",
        why: "Twenty-five pharmacies quietly dropped Advil over four months. That reads better before the next quarter than after it.",
        title: "Pharmacies that stopped stocking Advil",
        v: "25", delta: "of 612", dc: "#6B6B61", foot: "four months · by district",
        head: "25 pharmacies stopped.",
        headAccent: "Twenty-one of them are in Cocody and Yopougon.",
        body: "587 of the 612 panel pharmacies sold Advil in July, down from 612 in March. The 25 that stopped sit in the two districts the 400 mg sachet entered first, and 20 of them now stock Nurofen. The named list is available to export.",
        chartTitle: "Pharmacies that stopped, by district",
        method: "Counted on confirmed outlet identities only, over four months. Bouaké and Treichville are reported as directional: each is below the threshold of 3 contributors.",
        crumb: "outlets lost, Q2 2026",
        trace: ["noticed · 25 outlets stopped, no question asked", "wrote the question · outlet churn, one brand", "queried lake · 612 outlets × 4 months", "checked threshold per district · 3 of 5 pass"],
        chart: this.chartDots([
          { name: "Cocody", pts: 11, note: "9 now stock Nurofen", color: "#C0473F" },
          { name: "Yopougon", pts: 10, note: "10 now stock Nurofen", color: "#C0473F" },
          { name: "Plateau", pts: 2, note: "1 now stocks Nurofen", color: "#F67748" },
          { name: "Treichville", pts: 1, note: "directional · 2 contributors", color: "#F67748" },
          { name: "Bouaké", pts: 1, note: "below threshold", color: "#F67748" }], 12) }
    ];
  }

  answerFor(q) {
    const t = (q || this.answers()[0].q).toLowerCase();
    const words = t.split(/[^a-z0-9à-ÿ]+/).filter(w => w.length > 3);
    return this.answers().find(a => a.q.toLowerCase() === t)
      || this.answers().find(a => {
        const hay = (a.q + " " + a.title).toLowerCase();
        return words.length > 1 && words.filter(w => hay.indexOf(w) > -1).length >= Math.min(2, words.length);
      }) || null;
  }

  ask(q) {
    const t = (q || "").trim();
    if (!t) return;
    const a = this.answerFor(t) || {};
    if (a.id === "citysize") { this.setState({ view: "chat", question: this.A("national").q, step: 1, draft: "" }); return; }
    if (a.id === "citysize2") { this.setState({ view: "chat", question: this.A("national").q, step: 2, draft: "" }); return; }
    this.setState({ view: "chat", question: t, step: 0, draft: "", asked: (this.state.asked || 0) + 1 });
  }

  componentDidMount() {
    this.measureFlow();
    window.addEventListener("resize", this.__rz = () => this.measureFlow());
    this._hotkey = e => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        this.setState({ view: "home" });
        setTimeout(() => { const el = document.getElementById("by-ask"); if (el) el.focus(); }, 60);
      }
    };
    window.addEventListener("keydown", this._hotkey);
    this.phTick();
  }

  phList() {
    return [
      "How is Advil doing in Côte d'Ivoire?",
      "Split my sell-out by city size.",
      "What is the price coefficient for dermocosmetics?",
      "Which pharmacies stopped stocking Advil?",
      "Where did I lose share last quarter, and to whom?"
    ];
  }

  phTick() {
    if (this.view !== "home" || (this.state.draft || "").length) {
      this._phT = setTimeout(() => this.phTick(), 500);
      return;
    }
    const list = this.phList();
    let i = this.state.phI || 0, n = this.state.phN || 0, del = !!this.state.phDel, wait;
    const full = list[i % list.length];
    if (!del) {
      if (n < full.length) { n += 1; wait = 38 + Math.random() * 40; }
      else { del = true; wait = 2200; }
    } else if (n > 0) { n = Math.max(0, n - 2); wait = 20; }
    else { del = false; i = (i + 1) % list.length; wait = 340; }
    this.setState({ phI: i, phN: n, phDel: del });
    this._phT = setTimeout(() => this.phTick(), wait);
  }

  componentDidUpdate() { this.measureFlow(); }

  componentWillUnmount() {
    window.removeEventListener("resize", this.__rz);
    window.removeEventListener("keydown", this._hotkey);
    if (this._phT) clearTimeout(this._phT);
    if (this.__mt) clearTimeout(this.__mt);
    clearInterval(this._dzInt);
  }

  digestPending() {
    return [
      { kind: "SAME PHARMACY", conf: "94%",
        head: "Two names, one pharmacy. _beyond believes these are the same shop.",
        why: "Same street address, same licence number. One file writes it in capitals, the other the short way. Approving merges them, and 1 204 sales stop being split across two pharmacies that do not both exist.",
        no: "Different shops",
        onYes: "Merged into one pharmacy · 1 204 sales joined up · logged 14:31",
        onNo: "Kept apart. _beyond will not raise this pair again.",
        rows: [
          { s: "Panel file", v: "PHARMACIE DU PLATEAU", c: "#6B6B61" },
          { s: "Wholesaler file", v: "Pharmacie Plateau", c: "#6B6B61" },
          { s: "If approved", v: "one pharmacy · 1 204 sales joined", c: "#5F7A12" }] },
      { kind: "SAME DATA TWICE", conf: "81%",
        head: "July arrived twice. _beyond believes the new feed and the monthly spreadsheet are the same numbers.",
        why: "Both carry July, line for line. Approving keeps the feed, files the spreadsheet away, and July stops being counted twice.",
        no: "Keep both",
        onYes: "Feed is now the source · spreadsheet filed away · nothing counted twice",
        onNo: "Both kept. July stays counted twice until you decide.",
        rows: [
          { s: "Monthly spreadsheet", v: "21 887 rows · July", c: "#6B6B61" },
          { s: "New feed", v: "21 887 rows · July · same numbers", c: "#6B6B61" },
          { s: "If approved", v: "feed becomes the source · spreadsheet filed away", c: "#5F7A12" }] }
    ];
  }

  A(id) { return this.answers().find(a => a.id === id) || {}; }

  get step() { return this.state.step == null ? Number(this.props.startStep || 0) : this.state.step; }

  get tab() { return this.state.setTab || this.props.startTab || "connect"; }

  whyFor(id) {
    return {
      citysize2: { t: "on screen because city size is how you read this brand now", dot: "#5F7A12", kind: "you asked" },
      units:     { t: "watching since 12 Aug · tell me if it falls below −10 %", dot: "#C0473F", kind: "watching" },
      share:     { t: "on screen because you have asked for it three times this quarter", dot: "#5F7A12", kind: "you asked" },
      loss:      { t: "share fell three months running and nobody had asked", dot: "#14170F", kind: "asked for you" },
      rival:     { t: "a format that did not exist in your panel in January", dot: "#14170F", kind: "asked for you" },
      stopped:   { t: "25 outlets stopped stocking you and none of them said so", dot: "#14170F", kind: "asked for you" }
    }[id] || { t: "", dot: "#E5E5DA", kind: "you asked" };
  }

  /* ---- your space ---------------------------------------------------------
     A cross-section of the lake, read top to bottom. Above the water is what
     surfaced since Monday. The waterline is the level you keep. Below the
     surface is what _beyond is still measuring and will not bring up yet.

     Nothing here is a saved conversation. It is what _beyond drew out of the
     lake using what it learned from them, so each card carries the memory that
     put it there — and that line opens Memory, where you delete it.

     Cards are declared in the order you would have kept them; rank is the order
     _beyond argues for. The one whose rank differs carries moved, and that is
     the card that climbs on arrival.                                          */

  spaceDeep() {
    return [
      { k: "sivop", head: "Whether the September gap in the Sivop file was a fall or a late delivery.",
        note: "Two more arrivals settle it. Until then _beyond will not read that gap as a drop.",
        conf: "48%", tag: "two months" },
      { k: "survey", head: "Whether the small-town line holds once 40 pharmacies have been walked.",
        note: "The survey is drafted. Twelve questions are waiting for you to approve them.",
        conf: "not yet", tag: "5 days" },
      { k: "spread", head: "Whether Nurofen has stopped spreading outside Abidjan.",
        note: "Three of the five interior districts sit below the threshold of 3 contributors.",
        conf: "61%", tag: "shallow" }
    ];
  }

  spaceList() {
    /* Share of units by district, twelve months. Illustrative. The focus series is lime
       and fills; the other two are grey strokes, per the ranked-series rule. */
    const months = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
    const districts = {
      title: "Where the share went", sub: "share of units by district · twelve months", q: this.A("loss").q,
      labels: months,
      series: [
        { name: "Cocody",   color: "#5F7A12", vals: [33.8, 33.5, 33.9, 33.2, 32.8, 32.9, 32.4, 31.9, 31.6, 31.0, 30.4, 29.7] },
        { name: "Yopougon", color: "#6B6B61", vals: [29.1, 29.3, 28.8, 28.9, 28.4, 28.6, 28.1, 27.8, 27.4, 27.0, 26.6, 26.2] },
        { name: "Plateau",  color: "#A3A399", vals: [22.4, 22.6, 22.2, 22.5, 22.3, 22.1, 22.4, 22.0, 21.9, 21.8, 21.6, 21.5] }],
      rows: [
        { name: "Cocody",      v: "−0.9 pts", up: false },
        { name: "Yopougon",    v: "−0.7 pts", up: false },
        { name: "Plateau",     v: "−0.3 pts", up: false },
        { name: "Bouaké",      v: "+0.1 pts", up: true }],
      because: "share fell three months running and nobody had asked", when: "noticed today" };

    return [
      { id: "advil", name: "Advil · Côte d'Ivoire",
        head: "Since you looked on Monday,", headAccent: "three things broke the surface.",
        tag: "Market · Côte d'Ivoire", lead: "Since you looked on Monday", n: "3", nLabel: "things broke the surface.",
        /* The competitor's spread as a narrowing: the panel, the outlets that stock it, the
           ones that keep reordering, the ones that now rank it first. Stages past the
           first two are illustrative. */
        funnel: { title: "Nurofen 400 mg through the panel", sub: "seven months, from zero", q: this.A("rival").q,
          stages: [
            { label: "panel pharmacies", value: 612, display: "612" },
            { label: "stock it", value: 214, display: "214" },
            { label: "reordered in July", value: 131, display: "131" },
            { label: "rank it above Advil", value: 47, display: "47" }],
          because: "a funnel, because you watch Advil against Nurofen", mem: "brand", when: "learned from 23 questions" },
        series: Object.assign({}, districts, { moved: "_beyond moved this up · a third month of decline" }),
        spot: { q: this.A("loss").q, kicker: "Alert fired · 2 h ago", big: "−11.4%", up: false,
          head: "Advil share in Cocody fell week on week.", sub: "you asked to be told below −10% · set 12 Aug",
          moved: "_beyond moved this up 2 h ago",
          because: "first, because Cocody and Yopougon are where you act", mem: "act", when: "learned 12 Aug" } },

      { id: "week", name: "This week",
        head: "A flat line", headAccent: "with two currents running under it.",
        tag: "Week 35 · all brands", lead: "This week", n: "2", nLabel: "currents running under a flat line.",
        /* Where Advil left the shelf: the panel, the outlets still stocking, the ones that
           stopped, and how many of those now stock the rival. The last figure is from the
           rival answer; the rest are the panel counts. */
        funnel: { title: "Where Advil left the shelf", sub: "four months, by outlet", q: this.A("stopped").q,
          stages: [
            { label: "panel pharmacies", value: 612, display: "612" },
            { label: "sold Advil this week", value: 340, display: "340" },
            { label: "cut their order", value: 96, display: "96" },
            { label: "stopped this year", value: 25, display: "25" }],
          because: "a funnel, because Cocody and Yopougon are where you act", mem: "act", when: "learned 12 Aug" },
        series: districts,
        spot: { q: this.A("citysize2").q, kicker: "Widened today", big: "+2.7 pts", up: true,
          head: "Small towns carry the gain after widening the cut.", sub: "share points · three months · Abidjan −2.4",
          moved: "",
          because: "a graph, because you read this brand by city size", mem: "cut", when: "learned today" } }
    ];
  }

  /* Below the surface, quantified: the numbers behind what is still being measured. */
  spaceDeepFacts() {
    return [
      { v: "2",  d: "two months", label: "arrivals still to come before the Sivop gap can be read" },
      { v: "12", d: "5 days",     label: "survey questions waiting for your approval" },
      { v: "3",  d: "shallow",    label: "interior districts under the 3-contributor line" },
      { v: "40", d: "drafted",    label: "pharmacies still to be walked for the small-town line" }
    ];
  }

  /* ---- the thread ---------------------------------------------------------
     One conversation, four beats: the question, the answer, _beyond arguing
     with the cut, and the moment it admits the data is too thin and asks to
     widen it. The memory card is the fourth beat: the agent writes down what
     it learned, in the open, where you can delete it.                       */

  mUser(t) { return { isUser: true, text: t }; }

  mAsk(a) { return { isBeyondAsk: true, text: a.q, why: this.wm(a.why || "", "#C8F068") }; }

  mTrace(a) { return { isTrace: true, lines: (a.trace || []).map(l => ({ l: l })) }; }

  mAns(a) {
    const ch = a.chart || {};
    return { isAnswer: true, head: a.head, headAccent: a.headAccent, body: a.body,
      chartTitle: a.chartTitle, method: a.method,
      chart: Object.assign({}, ch, { isBars: ch.kind === "bars", isDonut: ch.kind === "donut",
        isLine: ch.kind === "line", isArea: ch.kind === "area", isHbars: ch.kind === "hbars", isDots: ch.kind === "dots" }) };
  }

  memoryNew() {
    return [
      { k: "cut", head: "You read this brand by city size, not by district.",
        note: "learned from this conversation · applied to every Advil question from here" },
      { k: "thin", head: "Never lead with a directional number. Offer to widen the data first.",
        note: "learned when you said yes · applies to any cut below the threshold" },
      { k: "src", head: "The interior wholesaler and the delivery routes belong in the lake.",
        note: "learned from the two sources you accepted" }
    ];
  }

  memoryAll() {
    return [
      { title: "What you care about", note: "learned from 23 questions", rows: [
        { k: "brand", head: "Advil 200 mg against Nurofen, oral analgesics, Côte d'Ivoire.", note: "learned from 23 questions", when: "since 2 Aug" },
        { k: "cut", head: "You read this brand by city size, not by district.", note: "learned from your question today", when: "today" },
        { k: "act", head: "Cocody and Yopougon are where you act first.", note: "learned from what you opened after each answer", when: "12 Aug" }] },
      { title: "How you want answers", note: "learned from how you read them", rows: [
        { k: "thin", head: "Never lead with a directional number. Offer to widen the data first.", note: "learned when you said yes today", when: "today" },
        { k: "units", head: "Units first, value second. You ask for value second every time.", note: "learned from the order of your questions", when: "2 Aug" },
        { k: "method", head: "Keep the method visible. You open it on every answer.", note: "learned from 19 of 21 answers", when: "5 Aug" }] },
      { title: "What _beyond learned about your data", note: "held per source, never shared", rows: [
        { k: "src", head: "The interior wholesaler and the delivery routes belong in the lake.", note: "learned from the two sources you accepted", when: "today" },
        { k: "late", head: "The Sivop file arrives late every month. A gap is not a fall.", note: "learned after the September gap read as a drop", when: "19 Aug" },
        { k: "codes", head: "Four product codes are one product: Advil 200 mg, 20 tabs.", note: "learned in Digest, confirmed by you", when: "12 Aug" }] }
    ];
  }

  scriptedThread() {
    const step = this.step;
    const nat = this.A("national"), cs = this.A("citysize"), cs2 = this.A("citysize2");
    const out = [this.mUser(nat.q), this.mTrace(nat), this.mAns(nat)];

    out.push({ isChallenge: true,
      kicker: "_beyond would ask this differently",
      head: this.wm("You asked a national question. The answer is not national.", "#F7F7EF"),
      body: this.wm("Every question you have asked this month has been national or by district. City size has never been one of your cuts, and on this brand it is the cut that moves. Ask it that way and the flat line separates into two.", "#F7F7EF"),
      ctaLabel: "Split it by city size", altLabel: "Keep the national view",
      note: "you decide, not _beyond",
      cta: () => this.setState({ step: 1 }), alt: () => {} });

    if (step >= 1) {
      out.push(this.mUser("Split it by city size."));
      out.push(this.mTrace(cs));
      out.push(this.mAns(cs));
      out.push({ isExpand: true,
        kicker: "confidence · one of those lines is directional",
        head: this.wm("One of those three lines is not measured."),
        body: this.wm("Towns under 50 000 rest on 2 contributors and 31 units, below the threshold of 3 contributors and 40 units. _beyond will not let you act on that as though it were measured. It can widen the data first."),
        rows: [
          { n: "01", head: "Add the interior wholesaler already in your library", note: "Copharmed, on contributor terms, read-only. Covers 14 towns under 50 000, Bouaké among them.", tag: "6 min", tagFg: "#5F7A12" },
          { n: "02", head: "Add the delivery routes a contributor shares", note: "Which outlets are served on which days beyond the coastal belt. Shared by Tedis Pharma.", tag: "shared", tagFg: "#5F7A12" },
          { n: "03", head: "Walk a short survey in 40 small-town pharmacies", note: "Twelve questions, walked by the Opeaz field team. You approve the questions before anyone leaves.", tag: "5 days", tagFg: "#9A5C0F" }],
        ctaLabel: "Yes, widen it", altLabel: "Answer with what we have",
        note: "_beyond reads and asks. It writes nothing back to any source.",
        cta: () => this.setState({ step: 2 }), alt: () => {} });
    }

    if (step >= 2) {
      out.push(this.mUser("Yes, widen it."));
      out.push({ isExpanded: true, kicker: "widened · 6 min",
        rows: [
          { head: this.wm("Interior wholesaler connected · 14 towns · 3 214 rows"), tag: "live", tagFg: "#029B82" },
          { head: this.wm("Delivery routes added · 212 outlets mapped"), tag: "shared", tagFg: "#029B82" },
          { head: this.wm("Survey drafted · 40 pharmacies · 12 questions waiting for you"), tag: "queued", tagFg: "#9A5C0F" },
          { head: this.wm("41 new outlet identities resolved · one pair sent to you"), tag: "1 approval", tagFg: "#F67748" }],
        foot: this.wm("Towns under 50 000 now rest on 4 contributors and 61 units. That clears the threshold, so the line below is measured rather than directional.") });
      out.push(this.mAns(cs2));
      out.push({ isMemory: true, kicker: "memory updated", when: "just now",
        head: this.wm("_beyond wrote three things down. They change what it reaches for next time."),
        rows: this.memoryNew().map(r => {
          const off = !!this.state.memOff[r.k];
          return { head: this.wm(r.head), note: r.note,
            btn: off ? "Forgotten" : "Forget", btnFg: off ? "#A3A399" : "#14170F",
            forget: () => this.setState(s => {
              const n = Object.assign({}, s.memOff);
              if (n[r.k]) { delete n[r.k]; } else { n[r.k] = true; }
              return { memOff: n };
            }) };
        }),
        foot: this.wm("Memory lives in Settings, where you can read all of it and delete any of it. It never leaves your lake and is never sent to a source.") });
    }
    return out;
  }

  threadRows() {
    return [
      { h: "Today" },
      { id: "national", q: "How is Advil doing in Côte d'Ivoire?", meta: "you · three follow-ups", dot: "#5F7A12" },
      { id: "coef", q: "What is the coefficient between consumer price and ex-factory price for dermocosmetics?", meta: "you · asked today", dot: "#5F7A12" },
      { id: "loss", q: "Where did Advil lose share last quarter, and to whom?", meta: "asked for you", dot: "#14170F" },
      { id: "stopped", q: "Which pharmacies stopped stocking Advil?", meta: "asked for you", dot: "#14170F" },
      { h: "Earlier" },
      { id: "rival", q: "How fast is Nurofen 400 mg spreading through the panel?", meta: "asked for you · yesterday", dot: "#14170F" },
      { id: "units", q: "How many units did we sell each month?", meta: "you · 2 Aug · watching", dot: "#5F7A12" },
      { id: "share", q: "How is the analgesics category split between brands?", meta: "you · 2 Aug", dot: "#5F7A12" },
      { id: "value", q: "What is our sell-out value month by month?", meta: "you · 12 May", dot: "#5F7A12" }
    ];
  }

  renderVals() {
    const v = this.view, tab = this.tab, step = this.step;
    const pendLeft = this.digestPending().filter((p, i) => !this.state.digestDone[i]).length;
    const memLeft = this.memoryAll().reduce((n, g) => n + g.rows.filter(r => !this.state.memOff[r.k]).length, 0);
    const cur = this.state.question;
    const scripted = !cur || cur === this.A("national").q;
    const spaces = this.spaceList();
    const space = spaces.find(sp => sp.id === this.state.spaceId) || spaces[0];
    const arranged = this.state.arranger !== "you";
    const crumbs = {
      home: ["", ""],
      chat: ["Ask", (this.answerFor(cur) || { crumb: "a question with its method" }).crumb],
      space: [space.name, space.head + " " + space.headAccent],
      settings: ["Settings", tab === "connect" ? (this.state.connTab === "drop" ? "connect · drop zone" : "connect · sources and coverage")
                 : tab === "digest" ? "digest · " + (pendLeft === 0 ? "all approvals cleared" : pendLeft === 1 ? "1 approval waiting" : pendLeft + " approvals waiting")
                 : "memory · " + memLeft + " things remembered"]
    }[v] || ["", ""];

    return {
      /* ---- shell ---- */
      isIntro: v === "intro", isApp: v !== "intro",
      isHome: v === "home", isChat: v === "chat", isSpace: v === "space", isSettings: v === "settings",
      crumb: crumbs[0], crumb2: crumbs[1],
      topRule: v === "home" ? "transparent" : "#E5E5DA",
      goHome: () => this.setState({ view: "home", question: null, step: 0, draft: "" }),
      goSpace: () => this.setState({ view: "space" }),
      goSettings: () => this.setState({ view: "settings" }),
      nav: { space: this.ns("space"), settings: this.ns("settings") },
      alertBadge: "1", alertColor: "#C0473F",
      methodNotes: this.props.methodNotes !== false,
      showTrace: this.props.showTrace !== false,

      /* ---- history ---- */
      threads: this.threadRows().map(r => {
        if (r.h) return { isHeader: true, isRow: false, label: r.h };
        const on = r.id === "national" ? (v === "chat" && scripted) : (v === "chat" && cur === r.q);
        const forYou = (r.meta || "").indexOf("asked for you") > -1;
        return { isHeader: false, isRow: true, q: r.q, meta: r.meta, byYou: !forYou, byBeyond: forYou,
          dot: forYou ? (on ? "#14170F" : "#6B6B61") : r.dot,
          bg: on ? "linear-gradient(90deg,rgba(200,240,104,.42),transparent)" : "transparent",
          edge: on ? "#14170F" : "transparent", fg: on ? "#14170F" : "#6B6B61", w: on ? "700" : "500",
          cur: on ? "page" : null,
          open: () => this.setState({ view: "chat", question: this.A(r.id).q, step: r.id === "national" ? 0 : 0, draft: "" }) };
      }),

      /* ---- the ask screen ---- */
      openAlert: () => this.setState({ view: "chat", question: this.A("loss").q, draft: "" }),

      /* ---- the conversation ---- */
      thread: (() => {
        if (scripted) return this.scriptedThread();
        const a = this.answerFor(cur);
        if (!a) return [this.mUser(cur), { isNone: true }];
        if (a.origin === "beyond") return [this.mAsk(a), this.mTrace(a), this.mAns(a)];
        return [this.mUser(a.q), this.mTrace(a), this.mAns(a)];
      })(),
      chatSources: [
        { n: "Pharmacy panel · 612 outlets", dot: "#5F7A12" },
        { n: "Interior wholesaler", dot: "#F67748" },
        { n: "Norwell internal", dot: "#029B82" },
        { n: "Reference model · 4 identities", dot: "#14170F" }],
      followUps: (scripted && step >= 2
        ? ["Which small towns moved most?", "Compare with sell-in over the same window", "Watch this cut every month"]
        : scripted
          ? ["Where did Advil lose share last quarter, and to whom?", "Compare with sell-in over the same window", "How many units did we sell each month?"]
          : ["How is Advil doing in Côte d'Ivoire?", "Split it by city size.", "Compare with sell-in over the same window"]
        ).map(t => ({ t: t, ask: () => this.ask(t) })),

      draft: this.state.draft,
      setDraft: e => this.setState({ draft: e.target.value }),
      askKey: e => { if (e.key === "Enter") { e.preventDefault(); this.ask(this.state.draft || this.A("national").q); } },
      askSend: () => this.ask(this.state.draft || (v === "home" ? this.A("national").q : "")),
      askBg: (this.state.draft.trim() || v === "home") ? "#C8F068" : "#E5E5DA",
      askPlaceholder: (() => {
        const list = this.phList(), full = list[(this.state.phI || 0) % list.length];
        return full.slice(0, this.state.phN || 0) + "│";
      })(),
      askCursor: (this.state.draft.trim() || v === "home") ? "pointer" : "default",

      toggleWatch: () => this.setState(s => ({ watching: !s.watching })),
      watchLabel: this.state.watching ? "In my space ✓" : "Add to my space",
      watchBg: this.state.watching ? "#5F7A12" : "#fff",
      watchFg: this.state.watching ? "#fff" : "#6B6B61",
      watchBorder: this.state.watching ? "#5F7A12" : "#D3D3C4",

      toggleAlert: () => this.setState(s => ({ alerting: !s.alerting })),
      alertLabel: this.state.alerting ? "Alert on ✓" : "Create an alert",
      alertBg: this.state.alerting ? "#5F7A12" : "#fff",
      alertFg: this.state.alerting ? "#fff" : "#6B6B61",
      alertBorder: this.state.alerting ? "#5F7A12" : "#D3D3C4",

      /* ---- your space ---- */
      spaceTabs: spaces.map(sp => {
        const on = sp.id === space.id;
        return { key: sp.id, name: sp.name, cur: on ? "page" : null, w: on ? "700" : "500",
          bg: on ? "#14170F" : "#fff", fg: on ? "#F7F7EF" : "#6B6B61", border: on ? "#14170F" : "#D3D3C4",
          pick: () => this.setState({ spaceId: sp.id }) };
      }),
      spaceKicker: "Wednesday 26 August 2026",
      spaceLead: space.lead,
      spaceN: space.n,
      spaceNLabel: space.nLabel,
      spaceStamp: "last sounding 14 min ago",

      arrangeTabs: [{ k: "beyond", label: "_beyond arranges this" }, { k: "you", label: "I arrange this" }].map(t => {
        const on = arranged === (t.k === "beyond");
        return { key: t.k, label: this.wm(t.label, on ? "#F7F7EF" : "#14170F"), cur: on ? "true" : "false",
          bg: on ? "#14170F" : "#fff", fg: on ? "#F7F7EF" : "#6B6B61", border: on ? "#14170F" : "#D3D3C4",
          w: on ? "700" : "500",
          pick: () => this.setState({ arranger: t.k }) };
      }),
      deepKicker: "Below the surface · still being measured",
      deepNote: this.wm("_beyond is not sure enough to bring these up. You are told anyway."),

      spaceDeep: this.spaceDeep().map(d => {
        const on = !!this.state.deepOn[d.k];
        return { key: d.k, head: this.wm(d.head), note: this.wm(d.note), conf: d.conf, tag: d.tag,
          /* What sits inside the hand-drawn circle: the figure, or a dash when there is none yet. */
          confMark: /\d/.test(d.conf) ? d.conf : "—",
          btn: on ? "Will tell you ✓" : "Tell me when it surfaces",
          btnBg: on ? "#5F7A12" : "#fff", btnFg: on ? "#fff" : "#6B6B61", btnBorder: on ? "#5F7A12" : "#D3D3C4",
          toggle: () => this.setState(st => {
            const n = Object.assign({}, st.deepOn);
            if (n[d.k]) { delete n[d.k]; } else { n[d.k] = true; }
            return { deepOn: n };
          }) };
      }),

      spaceTag: space.tag,
      showWhy: arranged,
      why: w => ({ because: w.because, becauseWhen: w.when, fromMemory: !!w.mem,
        whyDot: w.mem ? "#5F7A12" : "#14170F",
        toMemory: w.mem ? () => this.setState({ view: "settings", setTab: "memory" }) : null }),

      spaceFunnel: Object.assign({}, space.funnel, {
        open: () => this.setState({ view: "chat", question: space.funnel.q, step: 0, draft: "" }) }),
      spaceSeries: Object.assign({}, space.series, {
        moved: arranged ? this.wm(space.series.moved || "") : "",
        open: () => this.setState({ view: "chat", question: space.series.q, step: 0, draft: "" }) }),
      spaceSpot: Object.assign({}, space.spot, {
        moved: arranged ? this.wm(space.spot.moved || "") : "",
        open: () => this.setState({ view: "chat", question: space.spot.q, step: 0, draft: "" }) }),

      /* The keepers ride level at the waterline as one strip: title, the figure large,
         the delta as a pill, and one line saying what it is measured against. */
      spaceStill: ["units", "share", "value"].map(id => {
        const a = this.A(id), vals = a.trend || (a.chart || {}).vals || [];
        const lo = Math.min.apply(null, vals) * 0.9, top = Math.max.apply(null, vals);
        /* Twelve months for every keeper, the latest one deep. Scaled from a floor so a
           flat series still shows its shape. */
        const spark = vals.map((v, j) => ({ h: Math.round(((v - lo) / (top - lo)) * 100),
          c: j === vals.length - 1 ? "#5F7A12" : "#D8EBA0" }));
        const against = { units: "+580 units on June", share: "7.6-pt lead over Nurofen, was 14.2", value: "+0.5 M XOF on June" };
        return { key: id, title: a.title, v: a.v, delta: a.delta, dc: a.dc, foot: a.foot, against: against[id], spark: spark,
          open: () => this.setState({ view: "chat", question: a.q, step: 0, draft: "" }) };
      }),

      spaceDeepFacts: this.spaceDeepFacts(),

      /* ---- settings ---- */
      setTabs: [{ k: "connect", label: "Connect", count: this.connected().length },
                { k: "digest", label: "Digest", count: pendLeft === 0 ? "" : pendLeft },
                { k: "memory", label: "Memory", count: memLeft }].map(t => ({
        label: t.label, count: t.count,
        bg: tab === t.k ? "#14170F" : "#fff",
        fg: tab === t.k ? "#fff" : "#6B6B61",
        countFg: tab === t.k ? "rgba(247,247,239,.6)" : "#A3A399",
        border: tab === t.k ? "#14170F" : "#D3D3C4",
        w: tab === t.k ? "700" : "500",
        cur: tab === t.k ? "page" : null,
        pick: () => this.setState({ setTab: t.k })
      })),
      isConnectTab: tab === "connect", isDigestTab: tab === "digest", isMemoryTab: tab === "memory",
      subSourcesBorder: this.state.connTab !== "drop" ? "#14170F" : "#E5E5DA",
      subDropBorder: this.state.connTab === "drop" ? "#14170F" : "#E5E5DA",

      memCount: memLeft,
      memGroups: this.memoryAll().map(g => ({
        title: this.wm(g.title), note: g.note,
        rows: g.rows.map(r => {
          const off = !!this.state.memOff[r.k];
          return { head: this.wm(r.head), note: r.note, when: r.when,
            fg: off ? "#A3A399" : "#14170F",
            btn: off ? "Forgotten" : "Forget", btnFg: off ? "#A3A399" : "#14170F",
            forget: () => this.setState(s => {
              const n = Object.assign({}, s.memOff);
              if (n[r.k]) { delete n[r.k]; } else { n[r.k] = true; }
              return { memOff: n };
            }) };
        })
      })),

      /* ---- connect (unchanged machinery) ---- */
      dzIdle: this.state.dz === "idle", dzMagic: this.state.dz === "magic", dzDone: this.state.dz === "done",
      dzEdge: this.state.dz === "done" ? "#5F7A12" : "#A5CE3C",
      dzStone: this.state.dz === "magic" ? "byRockFall 860ms linear forwards" : this.state.dz === "done" ? "none" : "byRockHover 3s ease-in-out infinite",
      dzStoneOp: this.state.dz === "done" ? "0" : "1",
      dzSplashOp: this.state.dz === "magic" ? "1" : "0",
      dzCrown: this.state.dz === "magic" ? "byCrown 400ms ease-out 680ms both" : "none",
      dzDropA: this.state.dz === "magic" ? "byDropA 560ms ease-out 688ms both" : "none",
      dzDropB: this.state.dz === "magic" ? "byDropB 620ms ease-out 688ms both" : "none",
      dzDropC: this.state.dz === "magic" ? "byDropC 680ms ease-out 700ms both" : "none",
      dzRippleOp: this.state.dz === "idle" ? ".26" : this.state.dz === "magic" ? "1" : ".55",
      dzRing1: this.state.dz === "magic" ? "byRipple 2.4s ease-out 700ms infinite backwards" : this.state.dz === "done" ? "byRipple 3.4s ease-out infinite backwards" : "byRipple 4.4s ease-out infinite backwards",
      dzRing2: this.state.dz === "magic" ? "byRipple 2.4s ease-out 1250ms infinite backwards" : this.state.dz === "done" ? "byRipple 3.4s ease-out 1.1s infinite backwards" : "byRipple 4.4s ease-out 1.5s infinite backwards",
      dzRing3: this.state.dz === "magic" ? "byRipple 2.4s ease-out 1800ms infinite backwards" : this.state.dz === "done" ? "byRipple 3.4s ease-out 2.2s infinite backwards" : "byRipple 4.4s ease-out 3s infinite backwards",
      dzBg: this.state.dz === "idle" ? "#F7F7EF" : "#fff",
      dzStep: ["reading the file", "extracting 1 214 rows", "understanding the context", "finding where it fits in the lake"][this.state.dzStepI % 4],
      startDrop: () => {
        if (this.state.dz !== "idle") return;
        this.setState({ dz: "magic", dzStepI: 0 });
        this._dzInt = setInterval(() => this.setState(s => ({ dzStepI: s.dzStepI + 1 })), 1100);
        setTimeout(() => { clearInterval(this._dzInt); this.setState({ dz: "done" }); }, 4400);
        setTimeout(() => this.setState({ dz: "idle" }), 19400);
      },
      isSourcesTab: this.state.connTab !== "drop", isDropTab: this.state.connTab === "drop",
      pickSourcesTab: () => this.setState({ connTab: "sources" }), pickDropTab: () => this.setState({ connTab: "drop" }),
      tabSourcesW: this.state.connTab !== "drop" ? 700 : 500, tabSourcesFg: this.state.connTab !== "drop" ? "#14170F" : "#6B6B61",
      tabDropW: this.state.connTab === "drop" ? 700 : 500, tabDropFg: this.state.connTab === "drop" ? "#14170F" : "#6B6B61",
      drops: [
        { ext: "XLSX", tint: "#EEF7CF", col: "#5F7A12", name: "ventes_juin_bouake_v2 (1).xlsx", read: "Read as sell-in, Bouaké wholesaler · 1 214 rows → sales, June 2026", status: "Filed", stc: "#029B82" },
        { ext: "PDF", tint: "#FDEEE8", col: "#F67748", name: "Tarif officiel 2026 - DPM.pdf", read: "Read as a price list · 3 180 products → reference prices, 2026", status: "Filed", stc: "#029B82" },
        { ext: "JPG", tint: "#EAF7F4", col: "#1B998B", name: "IMG_4482.jpg", read: "Photo of a delivery note · 14 lines extracted → deliveries, Yopougon", status: "Filed", stc: "#029B82" },
        { ext: "CSV", tint: "#EFEFE4", col: "#6B6B61", name: "export_stock (3).csv", read: "Read as stock levels · 2 006 rows → stock, July 2026", status: "Filed", stc: "#029B82" }],

      lakeScale: this.lakeScaleNow(),
      lakeRows: (function (n) { const m = 3.1 + n * 0.18; return m.toFixed(m < 10 ? 1 : 0) + "M"; })(this.addedCount()),
      connCount: this.connected().length,
      connSources: this.connected().map((s, i) => {
        const live = s.status === "LIVE", err = s.hasError;
        return Object.assign({}, s, {
          noError: !err, foot: err ? s.error : s.fresh, footColor: err ? "#C0473F" : "#6B6B61",
          mono: err ? "#C0473F" : live ? "#14170F" : "#EFEFE4",
          ink: err ? "#FFFFFF" : live ? "#F7F7EF" : "#6B6B61",
          bg: err ? "rgba(192,71,63,.04)" : "#fff",
          border: err ? "rgba(192,71,63,.35)" : live ? "rgba(165,206,60,.85)" : "#E5E5DA",
          edge: err ? "#C0473F" : live ? "#A5CE3C" : "#E5E5DA",
          rise: "byRise 520ms ease-out " + (i * 80) + "ms both"
        });
      }),
      flowRef: el => { this.flowEl = el; this.measureFlow(); },
      flows: this.connected().map((s, i, arr) => {
        const y = ((i + 0.5) / arr.length) * 100;
        const colH = this.state.colH || 0;
        const lakeUsable = 279 * this.lakeScaleNow() * 0.56;
        const band = colH ? Math.max(6, Math.min(34, (lakeUsable / colH) * 100)) : 32;
        const yEnd = 50 + (((i + 0.5) / arr.length) - 0.5) * band;
        const dead = s.status === "IDLE";
        return { d: "M0," + y + " C34," + y + " 52," + yEnd + " 100," + yEnd,
          stroke: s.hasError ? "rgba(192,71,63,.55)" : dead ? "rgba(20,23,15,.28)" : "#5B9BD9",
          w: 1.6, dash: "7 6",
          style: s.hasError || dead ? "opacity:.8" : "opacity:.9;animation:byFlow 1.1s linear infinite" };
      }),
      libTabs: ["All", "General", "Brand portals", "Wholesalers", "Public info", "Community"].map(t => ({
        label: t,
        bg: this.state.lib === t ? "#14170F" : "#fff",
        fg: this.state.lib === t ? "#fff" : "#6B6B61",
        border: this.state.lib === t ? "#14170F" : "#D3D3C4",
        w: this.state.lib === t ? "700" : "500",
        pick: () => this.setState({ lib: t })
      })),
      library: this.libraryItems().map(l => Object.assign({}, l, { desc: this.wm(l.desc) })).filter(l => this.state.lib === "All" || l.cat === this.state.lib).map((l, i) => {
        const skin = l.brand              ? { tint: l.brand, col: "#FFFFFF" }
                   : l.cat === "Community" ? { tint: "#14170F", col: "#C8F068" }
                   : l.cat === "General"   ? { tint: "#EFEFE4", col: "#6B6B61" }
                   :                         { tint: "#C8F068", col: "#14170F" };
        const on = !!this.state.added[l.name];
        const drop = l.name === "File upload";
        return Object.assign({}, l, { col: skin.col, tint: l.tintOverride || skin.tint, trusted: !!l.trusted,
          isDb: l.logo === "db", isGd: l.logo === "gd", isGs: l.logo === "gs", isXl: l.logo === "xl",
          isLoreal: l.logo === "loreal", isSanofi: l.logo === "sanofi", isBayer: l.logo === "bayer",
          isPfizer: l.logo === "pfizer", isHaleon: l.logo === "haleon", isOpeaz: l.logo === "opeaz",
          isWho: l.logo === "who", isIni: !l.logo,
          popular: !!l.popular,
          added: on, notAdded: !on,
          btnTitle: drop ? "Open the drop zone" : on ? "Connected · remove" : "Add " + l.name,
          btnBg: on ? "#C8F068" : "transparent",
          btnFg: "#14170F",
          connect: drop ? (() => this.setState({ connTab: "drop" })) : (() => this.setState(st => {
            const next = Object.assign({}, st.added);
            if (next[l.name]) { delete next[l.name]; } else { next[l.name] = true; }
            return { added: next };
          })),
          rise: "byRise 520ms ease-out " + Math.min(i * 45, 400) + "ms both" });
      }),
      libCount: this.libraryItems().filter(l => this.state.lib === "All" || l.cat === this.state.lib).length,

      /* ---- digest (unchanged machinery) ---- */
      pendingCount: pendLeft,
      pendHead: pendLeft === 0 ? "Nothing is waiting for you." : pendLeft === 1 ? "One needs your approval." : pendLeft + " need your approval.",
      pendTitle: pendLeft === 0 ? "Your decisions" : "Waiting for your approval",
      pendBadgeColor: pendLeft === 0 ? "#6B6B61" : "#F67748",
      pendBadgeWeight: pendLeft === 0 ? "500" : "700",
      noPending: pendLeft === 0,
      pending: this.digestPending().map((p, i) => {
        const decision = this.state.digestDone[i];
        const yes = decision === "approved";
        const set = d => () => this.setState(s => {
          const next = Object.assign({}, s.digestDone);
          if (d) { next[i] = d; } else { delete next[i]; }
          return { digestDone: next };
        });
        return Object.assign({}, p, {
          head: this.wm(p.head), why: this.wm(p.why),
          undecided: !decision, resolved: !!decision,
          outLabel: yes ? "Approved" : "Not applied",
          outNote: this.wm(yes ? p.onYes : p.onNo),
          outTint: yes ? "#F4FAE3" : "#F7F7EF",
          outBorder: yes ? "#C8F068" : "#E5E5DA",
          outFg: yes ? "#5F7A12" : "#14170F",
          approve: set("approved"), dismiss: set("rejected"), undo: set(null)
        });
      }),
      autoActions: [
        { head: "Read four different column titles as one field: units sold.", detail: "QTE · Quantité vendue · units_out · SORTIE_STOCK → units_sold", conf: "96%", when: "today 04:12" },
        { head: "Moved wholesaler timestamps from Paris time to Abidjan time.", detail: "14/07/2026 15:05 CEST → 14/07/2026 13:05 GMT", conf: "99%", when: "today 04:12" },
        { head: "Converted wholesaler prices from euros to XOF at the fixed peg.", detail: "1,91 EUR → 1 253 XOF · rate 655.957", conf: "98%", when: "today 04:12" },
        { head: "Read Norwell's Excel date numbers as calendar dates.", detail: "46208 → 5 July 2026", conf: "97%", when: "yesterday" },
        { head: "Recognized the same pharmacy under three different ids.", detail: "CI-AB-0412 = client 70233 = PHIE DU PLATEAU ABJ · 597 of 612 matched", conf: "94%", when: "yesterday" },
        { head: "Matched the same product under four different codes.", detail: "841022 · PRD-00841 · P.841/CI · 8410 → Advil 200 mg, 20 tabs", conf: "94%", when: "12 Aug" }]
    };
  }

  render() {
    const v = this.renderVals();
    return v.isIntro ? <Intro v={v} /> : <Shell v={v} />;
  }
}
