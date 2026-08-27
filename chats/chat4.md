# Simplifying demo source examples

_Started 2026-08-25 10:42 UTC_

---

## User

Continuing from "Color palette update".

## Assistant

We're building the intro page for Beyond — a bold, simple platform that digests complex data from multiple sources and lets users query and visualize everything. The core idea is to show users their journey: Connect sources, Digest the data into a shared "lake," then ask questions in the Cockpit.

We've locked the visual direction: lime (#C8F068) as the accent, water blue for the lake, ink (#14170F) for text, and Space Grotesk 700 for all wordmarks. The lake itself is an actual water illustration with a blue gradient, lime shoreline, ripples, and rivers flowing in from connected sources. The intro headline reads "Everything you want to know in one [place struck through] lake." with "in one lake." in a darker lime (#B9E353). The sidebar is 190px wide, and we replaced the Beyond icon with an eclipse mark.

The three intro panels (01 Connect, 02 Digest, 03 Cockpit) are now live, with gentle animations: the Digest section's waves drift and bob, the strikethrough line on "place" breathes, and the lake grows ~5.5% each time a user connects a new source (capping at six). The lake drawing itself scales up smoothly (max +22%), keeping all river flows anchored inside the water boundary using a dynamic height measurement.

We also added "by Opeaz" branding next to the wordmark on the header, using the actual Opeaz bleu (#176AE5) at 48×12.5.

I created BEYOND-GUIDELINES.md to hold vision, character, voice, the full palette with applied combinations, type rules, and the drawing style — everything needed for the next session.

Open: None flagged. The flow-anchoring issue from the last fork check is resolved.

Files: Beyond Platform v2.dc.html, BEYOND-GUIDELINES.md

## User

I want us to choose more simpler sources for the demo we have here on the Connect Sources page
Suggest simpler examples of sources - you may also invent things

## Assistant

_[tool: grep]_

_[tool: read_file]_

Here's what I'd swap to. The current set (Kos panel, Sivop wholesale, Adexa internal, Laborex feed, DPM price list, INS demography) reads like insider pharma jargon — a viewer has to decode each one.

**Connected sources — simpler, self-explaining:**
- Sales spreadsheet — Monthly Excel from finance
- Pharmacy panel — Sell-out from 612 pharmacies
- Wholesaler feed — Orders, API
- Email inbox — Reports sent to beyond@
- Price list — Official prices, PDF quarterly
- Population data — Public census

**Library (the picker) — keep the generic six, simplify the rest:**
- General: File upload, Email inbox, Your mailbox, Shared folder, REST API, MCP server
- Tools: Google Sheets, Excel Online, Salesforce, SAP export, Slack, Drive folder
- Public: Census, Customs imports, Official price list, WHO stats
- Community: Pharmacy register, District population, Price survey, Delivery routes

Two questions before I apply: keep the West-Africa pharma story (Sivop/Bouaké/Doliv appear in Digest and Ask too, so they'd need matching renames), or go fully generic? And should I rename across all three pages for consistency, or just Connect?

## User

Excellent! You may also include famous brands portals like: Loreal Wholeseller portal, etc. (with their logo!)

## Assistant

_[tool: grep]_

_[tool: grep]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: run_script]_

_[tool: ready_for_verification]_

Done. Library is now: General (added Google Sheets, Excel Online, renamed SFTP → Shared folder), **Brand portals** (L'Oréal, Sanofi, Bayer, Pfizer, Haleon, Opeaz — each with its brand color as the tile), Wholesalers, Public info, Community. Connected list reads plainer too: Pharmacy panel, Wholesaler orders, Official price list, Population data; Sivop and Adexa keep their names since Digest and Ask reference them.

One caveat: I can't generate real logo images, so the brand tiles are monograms in each brand's actual color. Send me the SVG logos and I'll drop them in.

## User

Found issues — fixing…

## Assistant

_[tool: run_script]_

_[tool: ready_for_verification]_

Fixed: KO → PP monogram, Haleon now HAL on a darker orange, and the two library duplicates became "Price list · Senegal" and "Health facilities".

_[tool: read_file]_

_[tool: run_script]_

_[tool: ready_for_verification]_

Both approvals are now one-glance:

**Same pharmacy** — "PHARMACIE DU PLATEAU" vs "Pharmacie Plateau", same address and licence, 1 204 sales currently split in two.

**Same data twice** — July came in through both the new feed and the monthly spreadsheet; approve and the spreadsheet gets filed away.

Dropped the percentage-vs-XOF discount merge — it needed too much explaining for a live demo.

## User

Found issues — fixing…

## Assistant

_[tool: str_replace_edit]_

_[tool: ready_for_verification]_

Both row counts now read 21 887 — the numbers match the "same numbers" claim.

## User

Okay, now for the cockpit, the cockpit should just be a grid of, let's say, 6 widgets, each showing a different graph, but a relatively simple one. One could be a bar graph, the other one could be a pie chart, etc.

When I click on each of them, it takes me to the specific chat where this graph was created. I can see on the graphs if the chat was initiated by the user or the chat was initiated by the platform. It could be that the platform algorithm looked at your data as a customer and believed that there is something that you should ask and you haven't, so it is asking that for you. It will put it on the cockpit for you so you can look at it and go into the chat and see the first message to create this graph that was initiated by the platform.

## Assistant

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: grep]_

_[tool: read_file]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: run_script]_

_[tool: show_html]_

_[tool: ready_for_verification]_

Cockpit is now six widgets, each a different chart type:

- **Units sold, month by month** — bar chart (you asked)
- **Share of the category** — donut (you asked)
- **Sell-out value in XOF** — area chart (you asked)
- **Where the share went** — horizontal bars (asked for you)
- **Paraxel 1 g spreading** — line chart (asked for you)
- **Pharmacies that stopped** — dot plot (asked for you)

Each card carries an origin badge: a plain outline pill "YOU ASKED", or a black pill with lime text "ASKED FOR YOU". Clicking any card opens its chat with the same graph rendered large. Platform-initiated ones open with a black bubble from _beyond on the left — the question it wrote plus why it wrote it ("Your share fell for the third month running and nobody had asked where it was going") — and the trace starts with "noticed · share down 3 months, no question asked".

## User

Found issues — fixing…

## Assistant

_[tool: run_script]_

_[tool: ready_for_verification]_

`wm()` now takes an ink color — the wordmark renders in lime on the dark bubble. Grid min track down to 288px so it reads as a grid in the narrower pane too.

## User

Change the demo user to Tom Smith | Invent a pharma vcompany for him

## Assistant

_[tool: run_script]_

_[tool: ready_for_verification]_

Tom Smith, TS avatar, **Norwell Pharma · West Africa**. Renamed the old Adexa references to Norwell so his own internal source, the chat source chips, and the digest log all match.

