# _beyond — design system

_beyond takes complex data from many sources — partner portals, wholesaler
feeds, SFTP folders, mailboxes, spreadsheets nobody has cleaned, a photo of a
delivery note — reads it, makes it comparable, and puts it in one lake you can
question in plain language.

Three moves, always in this order: **Connect**, **Digest**, **Cockpit**.
The promise is "a bold platform that a child could use". The boundary is that
_beyond reads, organises and suggests: it never acts alone and never writes back
to a source. Every screen has to make that obvious without saying it twice.

_beyond is a standalone brand, a registered trademark of Opeaz LTD.

## How this project is laid out

    readme.md          this guide
    styles.css         the entry point consumers link — imports only
    SKILL.md           makes the folder usable as an Agent Skill
    beyond-ds/         the design system: tokens, assets, guidelines,
                       components, ui_kits, slides, emails
    beyond-ds/index.html   a contact sheet of everything, viewable now
    source/            the prototypes and the brand doc it was built from
    support.js, _ds/   runtime files — leave them alone

To lift the system into its own project later, take `beyond-ds/`,
`readme.md`, `SKILL.md` and `styles.css`, and leave `source/` behind.

## Where this came from

Everything here was extracted from material already in this project — nothing
was invented from a screenshot or from memory. It all sits in `source/`; see
`source/README.md` for the file-by-file list.

The primary sources were `BEYOND-GUIDELINES.md` (voice, palette, type scale,
drawing rules, layout, screen patterns) and `_beyond Platform v3 - Final.dc.html`
(the working prototype — every component and every exact value). The blue +
Inter exploration in `_beyond Look Directions.dc.html` was rejected and is **not**
part of this system.

No Figma file, no codebase, and no font binaries were supplied.

---

## Content fundamentals

**Serious about the data, relaxed about the interface.**

- **Plain, concrete, short.** "Drop anything." not "Leverage our ingestion
  pipeline." "Drop a file here, or click to browse." "Filed."
- **Say what happened and what it cost.** Numbers are the argument:
  "1 214 rows → sales, June 2026", "92 actions this month", "612 pharmacies".
- **Second person for the user.** First person plural only where the product
  acts on their behalf. The product refers to itself as `_beyond`, in the third
  person: "where _beyond is not sure enough to act alone".
- **Uncertainty is stated, never hidden.** "confidence 79%", "_beyond believes",
  "you decide, not _beyond".
- **Empty states say what to drop**, not that there is nothing there.
- **Confidence without hype.** No exclamation marks, no emoji, no
  "revolutionary", no fake precision, no invented stats.
- **Never explain the metaphor in words** ("like a lake of data!"). Draw it.
- **No metadiscourse.** Never "here's why this matters".

Three tone tests — a line is on-brand when a smart twelve-year-old understands
it on first read, an operations manager would not roll their eyes at it, and
removing three words does not improve it.

Casing: sentence case everywhere except kickers, which are uppercase at 9–11px
with 0.1–0.12em tracking. The wordmark is always lowercase with its leading
underscore, never at the start of a capitalised sentence position that would
tempt anyone to fix it.

---

## Visual foundations

**Colour.** One accent: lime `#C8F068`. If a screen needs a second accent, the
screen is wrong. Ink `#14170F` for all text and dark surfaces, cream
`#F7F7EF` for the page, white for cards. Water (`#9FD1F2` → `#5B9BD9`) belongs
to the lake, the flows into it, and step 02 — never a button, a link or a
status. Semantic amber / red / green carry meaning, not brand, and are left
alone. Never lime type on cream at body size (use `--by-lime-type` `#5F7A12`);
never ink type on saturated water (use white or `#0B2233`).

**Type.** Space Grotesk everywhere — headings, body, numerals, labels. No second
family. Hero 56/800, panel numeral 96/800 tabular, screen title 30/800, card
title 20/800, body 13–16/400–500 at 1.6–1.65 line-height with `text-wrap:
pretty`, kicker 10–11/700 uppercase, caption 10–11/400 grey. 800 is the display
convention; the wordmark itself is always 700. Every figure, date and confidence
is `tabular-nums`.

**Backgrounds.** Cream page, white surfaces, ink type. Full-bleed colour panels
(lime, water, ink) are for moments, not chrome — at most one or two per screen.
No photography, no patterns, no texture, no noise, no ambient gradients. The
only gradient in the system is the water fill and the sidebar's active-row wash.

**Cards and borders.** A card is white with a single 1px `#E5E5DA` rule and a
14px radius — no shadow. Radii: 18 panels, 14 cards, 10 surfaces and inputs, 8
in-row controls, 6 chips, 100 pills and buttons. Prefer a rule over another box:
a 1px hairline or a 2px ink underline beats a nested card. The only shadow in
the system is on floating chrome, never on a drawing or a card.

**Space.** Space is the luxury. 96px+ around a hero, 24–30px inside cards, 44px
page gutters, 250px sidebar. If a section feels empty, the content is wrong, not
the padding. Flex/grid with `gap` — never margin-spaced siblings.

**Transparency and blur.** Opacity is used for text tiers on coloured panels
(72% ink on lime, 70% cream on ink, 82% water-ink on water) and for white
strokes on the water at 40–60%. There is no blur, no glass, no translucent
chrome anywhere.

**Hover and press.** Primary button: background darkens to `#B6E44E` and lifts
1px over 160ms; the arrow inside slides 4px. Outline controls: border goes to
ink. Cards: border goes to ink. Sidebar rows: background to `#F1F1E6`. Press
returns the lift to 0 in 90ms. Nothing scales, nothing bounces.

**Focus.** `2px solid #14170F` at 2px offset, or on the ask box, an ink border
plus a 4px lime ring at 45% — the one place the lime ring appears.

**Motion.** `byRise` 520ms ease-out with 80ms stagger for panels entering;
fades 400ms; view changes 160ms. Nothing longer than 600ms except the lake,
where ripples expand over 3.4s and flow dashes drift at ~1s. Everything
collapses under `prefers-reduced-motion`.

**Imagery and illustration.** There is no photography. There is one drawing —
the lake — and everything else follows its logic: one idea per drawing, an
irregular hand-shaped bezier rather than geometry, a flat fill plus one
gradient, a lime edge on water and a water edge on lime, detail in three or four
thin white strokes at 40–60%, and slow looping motion. Data enters as straight
dotted lines (live water blue, idle grey, broken red, dashed `7 6` at 1.6px) —
the meandering version was tried and rejected. Hand-drawn annotation (a
strikethrough, a circle around a result) is a loose bezier at 3–3.5 stroke with
round caps in lime shade, never a straight CSS rule.

Never: 3D, isometric, gradient meshes, glassmorphism, emoji, stock
illustration, icon sets as decoration, or a diagram where a drawing would do.

---

## Data visualisation

The graph is evidence, not decoration.

- **One series per graph.** Two lines means two questions.
- **Ink is the default series colour.** Lime marks the one bar or slice the
  sentence is about. Red is reserved for a fall or a broken feed. Water is never
  a series colour — it belongs to the lake.
- **No gridlines, no y-axis, no legends on time series.** The labels under the
  line are the axis; the number is in the headline above.
- **Ranked rows are the workhorse**: label + note on the left, a track, a
  tabular value at the right, sorted. A 1px ink zero line whenever values cross
  zero.
- **Donuts carry their numbers in the legend**, four slices at most, the rest is
  "other".
- **Every figure is tabular**, a minus is a real minus (−), thousands are
  separated by a thin space.
- **Every graph is followed by its method** — sources, row counts, conversions,
  exclusions. The method is part of the answer, not a footnote.
- Heights: 170px under an answer, 82px on a cockpit card.

---

## Iconography

**There is almost no iconography, and that is deliberate.** The product carries
its meaning in type, rules, numbers and one drawing. No icon library is used and
none should be added.

What exists instead:

- **Status is a coloured dot**, 5–7px, from the semantic palette. Live pulses
  slowly; nothing else moves.
- **"Asked for you" is a four-point star**, drawn inline at 9px, and it is
  reserved for questions _beyond raised on the user's behalf. It is the only
  glyph in the system with a fixed meaning.
- **Direction is a text arrow** — `→` in the button label, `why →` on an alert.
  Typographic, not an icon.
- **A verified source is a 12px ink disc with a `✓`**, meaning _beyond verified
  the feed, not that the data is good.
- **File types and sources are initials in a rounded square** ("TP", "XLS",
  "SFT"), never a file-type icon.
- **Third-party vendor logos are the exception** — Google Drive, Google Sheets,
  Excel and Dropbox marks appear at 15–19px in the Connect library, in their own
  brand colours, copied verbatim rather than redrawn. They live in
  `beyond-ds/assets/vendor-drive.svg`, `vendor-dropbox.svg`,
  `vendor-sheets.svg` and `vendor-excel.svg`, and are passed to
  `LibraryCard` through its `icon` prop (see `ui_kits/platform/Connect.jsx`).
  Dropbox is filled `#0061FF` here; in the product the same paths are filled
  white on a tinted tile.
- **Emoji are never used.** Unicode is used only for `→`, `✓`, `·` and `−`.

If a new concept genuinely needs a picture, draw it the way the lake is drawn —
one shape, one gradient, a few white marks, one lime edge — rather than reaching
for an icon set.

## Assets

`beyond-ds/assets/beyond-mark.svg` and `beyond-mark-cream.svg` are the mark:
a lime rounded square (radius 29% of the side) with a circle eclipsing it from
the bottom-right, clipped by the square. The cream variant is for ink surfaces.
They were extracted from the geometry used in the prototypes.

**There is no wordmark SVG.** The wordmark is type-set — Space Grotesk 700,
lowercase, leading underscore, `-0.02em` tracking — so it is a component
(`Logo`, `Wordmark`), not a file. `beyond-ds/assets/opeaz-wordmark.svg` and
`opeaz-icon.svg` are the parent brand's marks, used only in the "by Opeaz"
endorsement lockup.

---

## Index

| Path | What it is |
|---|---|
| `styles.css` | The entry point consumers link. Imports only. |
| `beyond-ds/tokens/` | `colors.css`, `typography.css`, `spacing.css`, `motion.css` |
| `beyond-ds/assets/` | The mark (ink and cream), four vendor glyphs, the Opeaz marks |
| `beyond-ds/guidelines/` | 18 specimen cards: Colors, Type, Spacing, Brand |
| `beyond-ds/components/brand/` | Logo, Wordmark, StepPanel, Lake, HandStrike |
| `beyond-ds/components/core/` | Button, Pill, Kicker, Tabs, Card, SectionHeader, StatusDot, AskInput, Chip, SourceIcon |
| `beyond-ds/components/data/` | Sparkline, BarChart, Donut, RankRows, MetricCard |
| `beyond-ds/components/app/` | NavRow, ThreadRow, AlertBanner, AnswerBlock, ChallengeCard, ApprovalRow, SourceTile, LibraryCard, DropZone, MemoryRow |
| `beyond-ds/ui_kits/platform/` | Ask, Conversation, Cockpit, Connect — click-through in `index.html` |
| `beyond-ds/slides/` | Six 1280×720 slide types |
| `beyond-ds/emails/` | Alert and weekly-read templates, 600px, table-based |
| `beyond-ds/index.html` | Contact sheet — every card, slide and email on one page |
| `source/` | The prototypes and brand doc this was built from |
| `SKILL.md` | Makes this folder usable as an Agent Skill |

### Intentional additions

Two components have no single counterpart in the prototype and were factored out
because the pattern repeats: `Card` (the white 1px/14px surface used in six
places) and `SectionHeader` (title + note over a 2px ink rule, used in eight).
Everything else maps one-to-one to something in `_beyond Platform v3`.

### Known gaps

- **Fonts are loaded from Google Fonts**, not licensed binaries. Space Grotesk
  stops at 700; the 800 used for headings is browser-synthesised, exactly as in
  the prototype.
- **No marketing site**, no mobile surface, no auth/settings-account screens —
  none exist in the source material.
- The **Digest** and **Memory** tabs exist as components (`ApprovalRow`,
  `MemoryRow`) but not as full screens in the UI kit.
