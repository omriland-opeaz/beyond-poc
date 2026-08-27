# _beyond — Vision, Character & Design Guidelines

Working reference for anyone designing or writing for _beyond. Read this before starting a new screen.

---

## 1. What _beyond is

_beyond takes complex data from many sources — partner portals, wholesaler feeds, SFTP folders, mailboxes, spreadsheets nobody has cleaned, a photo of a delivery note — reads it, makes it comparable, and puts it in one lake you can question in plain language.

Three moves, always in this order:

1. **Connect** — plug in anything. Nothing is too messy to hand over.
2. **Digest** — four names for one product become one product; euros become XOF; Excel serials become dates. Where _beyond is unsure, it asks first.
3. **Cockpit** — ask a question, get the answer with its sources and its method. Keep the ones worth following; they refresh on every import.

**The promise:** a bold platform that a child could use.

**The boundary:** _beyond reads, organizes and suggests. It never acts alone and never writes back to a source. Every screen should make that obvious without saying it twice.

---

## 2. Character

Serious about the data, relaxed about the interface.

**Voice**
- Plain, concrete, short. "Drop anything." not "Leverage our ingestion pipeline."
- Say what happened and what it cost. Numbers are the argument.
- Confidence without hype. No exclamation marks, no emoji, no "revolutionary".
- Second person for the user, first person plural for the product only when it acts on their behalf.
- Uncertainty is stated, never hidden: "_beyond believes", "confidence 79%", "where _beyond is not sure enough to act alone".

**Tone tests** — a line is on-brand when:
- a smart twelve-year-old understands it on first read,
- an operations manager would not roll their eyes at it,
- removing three words does not improve it.

**Never**
- Explaining the metaphor in words ("like a lake of data!"). Draw it instead.
- Metadiscourse ("here's why this matters").
- Fake precision or invented stats.

---

## 3. The wordmark

- Always lowercase, always with the leading underscore: **`_beyond`**.
- Space Grotesk, weight **700** (the family stops at 700 — never ask for 800, the browser fakes it and it stops matching the logo).
- Letter-spacing `-0.02em`.
- Inside running copy it keeps the same family, weight and tracking — only the color adapts to the background.

**The mark** — a lime rounded square (radius ≈ 30% of size) with an ink circle eclipsing it from the bottom-right corner, clipped by the square. Nothing else. No underline, no wordplay inside the mark. On an ink surface the disc turns cream.

---

## 4. Color

| Role | Value | Use |
|---|---|---|
| Lime | `#C8F068` | The one accent. Primary buttons, active fills, step 01, the shoreline, the numeral on dark. |
| Lime deep | `#B9E353` | Lime used as *type* on cream, where the pure lime would be too light. |
| Lime shade | `#A5CE3C` | Hand-drawn strokes, edges, the second lime in a gradient. |
| Ink | `#14170F` | All text, dark surfaces, anything sitting on lime. |
| Cream | `#F7F7EF` | Page background. |
| Paper | `#FFFFFF` | Cards and app surfaces. |
| Line | `#E5E5DA` / `#D3D3C4` | Rules and borders. |
| Grey | `#6B6B61` / `#A3A399` | Body secondary / captions. |
| Water | `#9FD1F2` → `#5B9BD9` | Only the lake, the flows into it, and step 02. Never a general-purpose blue. |
| Water ink | `#0B2233` | Text on water. |

Semantic colors (amber for waiting, red for a broken feed, green for confirmed) stay as they are — they carry meaning, not brand.

### Applied combinations

The intro panels are the reference lockups. Copy these pairs exactly rather than re-deriving them.

**Page**
- Background `#F7F7EF` · body text `#14170F` · secondary `#6B6B61` · captions `#A3A399` · rules `#E5E5DA`
- Hero: `#14170F`, with the accent phrase in `#B9E353`
- Hand-drawn strike: stroke `#A5CE3C`, struck word `rgba(20,23,15,.45)`

**Panel 01 — Connect (lime)**
- Background `#C8F068` · numeral, title and pill outline `#14170F` (pill border `rgba(20,23,15,.28)`) · body `rgba(20,23,15,.72)`

**Panel 02 — Digest (water)**
- Background `linear-gradient(160deg,#9FD1F2,#5B9BD9)` · numeral and pill `#FFFFFF` (pill border `rgba(255,255,255,.65)`) · title `#0B2233` · body `rgba(11,34,51,.78)` · decorative ripples `rgba(255,255,255,.7)` at 50% opacity

**Panel 03 — Cockpit (ink)**
- Background `#14170F` · numeral `#C8F068` · title `#F7F7EF` · pill border `rgba(247,247,239,.35)` · body `rgba(247,247,239,.7)`

**Primary button**
- Fill `#C8F068`, label `#14170F`, hover `#B6E44E`, pill radius, weight 800

**Lake illustration**
- Water fill `linear-gradient(#9FD1F2 → #5B9BD9)` · shoreline stroke `#C8F068` 3px · reflected halo `#C8F068` at 50% · ripples and wave marks `rgba(255,255,255,.55–.6)` · label text `#0B2233`, muted `rgba(11,34,51,.6)`
- Flows into the lake: live `#5B9BD9`, idle `rgba(20,23,15,.28)`, broken `rgba(192,71,63,.55)` — all straight, dashed `7 6`, 1.6px

**Sidebar**
- Surface `#FFFFFF` · rule `#E5E5DA` · label `#14170F` · inactive `#6B6B61` · active row background `linear-gradient(90deg,rgba(200,240,104,.42),transparent)` with a `#14170F` left edge and ink label — never lime type

**Rules**
- One accent. If a screen needs a second accent, the screen is wrong.
- Never lime type on cream at body size; use lime deep, and only for a short phrase.
- Never ink type on saturated water; use white or water ink.
- Water belongs to the lake. Do not use it for buttons, links, or status.

---

## 5. Type

**Space Grotesk** everywhere: headings, body, numerals, labels. No second family.

| Level | Size / weight | Notes |
|---|---|---|
| Hero | 56 / 800* | Tracking `-0.035em`, line-height 1.03, two lines maximum. |
| Panel number | 96 / 800* | Tabular nums, line-height .85. The numeral is a graphic element. |
| Screen title | 30 / 800* | Tracking `-0.025em`. |
| Card title | 20 / 800* | |
| Body | 13–16 / 400–500 | Line-height 1.6–1.65, `text-wrap: pretty`. |
| Kicker | 10–11 / 700 | Uppercase, tracking `0.12em`, grey. |
| Caption | 10–11 / 400 | Grey `#A3A399`. |

\* 800 is the display convention for headings; the wordmark itself is always 700.

All figures, dates and confidences use `font-variant-numeric: tabular-nums`.

---

## 6. Drawing style — the important part

The lake is the reference. Every illustration follows its logic.

**What makes it work**
- **One idea per drawing.** A lake. A river. An eclipse. Never a scene.
- **Irregular, not geometric.** The shoreline is a hand-shaped bezier, not an ellipse. Perfect circles are for the mark and for ripples only.
- **Flat fill plus one gradient.** No texture, no noise, no drop shadows on the drawing itself.
- **A lime edge on a water body, a water edge on lime.** The two colors always touch somewhere.
- **Detail in thin white strokes at 40–60% opacity** — ripples, wave marks, a current line. Three or four marks, never a pattern.
- **Motion is slow and looping.** Ripples expand over 3–4 s; flow dashes drift at ~1 s. Nothing bounces.
- **Data enters as straight dotted lines.** Live flows in water blue, idle in grey, broken in red. Straight — the meandering version was tried and rejected.
- **Hand-drawn marks for annotation.** A strikethrough, a circle around a number, an arrow: loose bezier, `stroke-width` 3–3.5, round caps, lime shade. Never a straight CSS rule.

**When a new illustration is needed**, ask: what is the single physical thing this concept behaves like? Then draw that thing the way the lake is drawn — one shape, one gradient, a few white marks, one lime edge. Candidates already in the world of the product: a river mouth, a sluice, a depth sounding, a shoreline, a reflection, a stone dropped in.

**Never:** icon sets as decoration, 3D, isometric, gradient meshes, glassmorphism, emoji, stock illustration, or a diagram where a drawing would do.

---

## 7. Layout

- **Cream page, white surfaces, ink type.** Full-bleed color panels (lime, water, ink) are for moments, not for chrome.
- **Radius:** 18px panels, 8–12px cards and inputs, 100px pills and buttons.
- **Space is the luxury.** 96px+ around a hero, 24–30px inside cards. If a section feels empty, the content is wrong, not the padding.
- **Rules over boxes.** A 1px `#E5E5DA` line or a 2px ink underline beats another card.
- **Flex/grid with `gap`.** Never margin-spaced siblings.
- **Sidebar 190px.** Nav labels 13px, active state is ink text and an ink left edge — never lime type.
- **Motion:** `byRise` 520ms ease-out with 80ms stagger for entering panels; fades 400ms. Nothing longer than 600ms except the lake.

---

## 8. Screen patterns

- **Intro / first run.** Kicker, two-line hero, one paragraph, three numbered panels (lime / water / ink), one primary button. No secondary escape hatch.
- **Numbered steps.** The numeral is oversized and tabular; a pill label sits opposite it; the text block is pinned to the bottom of the panel.
- **Approval rows.** Kind + confidence kicker, the claim in 16.5px, the reasoning in grey, the evidence in a bordered column at right, Approve / reject at the end. Confidence is always visible.
- **Answers.** Statement first, then the trace: which sources, which rows, which conversion. The method is part of the answer, not a footnote.
- **Empty states** say what to drop, not that there is nothing.

---

## 9. Checklist before shipping a screen

- [ ] One accent only; water used only for the lake.
- [ ] `_beyond` lowercase, Space Grotesk 700, wherever it appears.
- [ ] Every number tabular.
- [ ] Every drawing is one shape with one idea.
- [ ] Nothing implies _beyond wrote back to a source.
- [ ] Uncertainty visible where it exists.
- [ ] A twelve-year-old could say what this screen is for.
