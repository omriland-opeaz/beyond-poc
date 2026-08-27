# _beyond — live mock demo

A clickable, deployable build of the `_beyond` platform prototype. Ported from
`../project/source/Beyond Platform v3 - Final.dc.html`, the final design out of
Claude Design, to match it pixel for pixel.

_beyond takes complex data from many sources — partner portals, wholesaler feeds,
SFTP folders, mailboxes, spreadsheets nobody has cleaned, a photo of a delivery
note — reads it, makes it comparable, and puts it in one lake you can question in
plain language. Three moves, always in this order: **Connect**, **Digest**,
**Cockpit**.

Everything on screen is mock data. `_beyond` is a registered trademark of Opeaz LTD.

## Run it

```sh
npm install
npm run dev      # http://localhost:5173
npm run build    # static output in dist/
```

## What the demo does

- **Ask** — the front door, with the typewriter placeholder. Type a question or
  press ⌘K from anywhere. Free text is matched against the measured reads; a
  question with no sourced answer says so rather than inventing a number.
- **The conversation** — the scripted thread runs four beats: the answer,
  `_beyond` arguing that the cut is wrong, the admission that one line is
  directional rather than measured, and the memory card showing what it wrote
  down. "Split it by city size" and "Yes, widen it" advance it.
- **Cockpit** — six graphs nobody configured. Each opens the conversation it came
  from; the badge says whether you asked or `_beyond` did.
- **Settings** — Connect (the source-to-lake flow map, plus a 28-connector
  library; the lake grows as you add sources), the Drop zone (drop anything and
  watch it get filed), Digest (approvals and the 92 automatic actions), and
  Memory (everything learned, all of it deletable).

## Deep links

The prototype's design-canvas props are query parameters, so every screen it
could open on is still reachable:

| URL | Opens on |
|---|---|
| `/` | Ask — the default |
| `/?view=intro` | The first-run intro page |
| `/?view=cockpit` | Cockpit |
| `/?view=chat&step=2` | The conversation, fully widened |
| `/?view=settings&tab=digest` | Digest |
| `/?view=settings&tab=memory` | Memory |

## How the port is built

| Path | What it is |
|---|---|
| `src/BeyondPlatform.jsx` | The prototype's own logic class, unchanged apart from extending `React.Component`. `renderVals()` is still the single seam between logic and views. |
| `src/views/` | The markup, one file per screen |
| `src/css.js` | `S("…")` turns a CSS declaration string into a React style object |
| `src/global.css` | The prototype's two `<style>` blocks, extracted verbatim |
| `compare.mjs` | Screenshot-diffs this build against the original prototype |

Every inline style is the prototype's own declaration string, copied across and
parsed at runtime by `S()` rather than hand-converted to a JSX style object —
which is what keeps the two pixel-identical instead of nearly so.

### Deliberate differences from the prototype

1. **Hover states are live.** The prototype carries them in `style-hover`
   attributes, which the design-canvas runtime never applies. They are the states
   `BEYOND-GUIDELINES.md` specifies, so they are implemented here as real CSS.
   Resting pixels are unchanged.
2. **No in-browser Babel.** The prototype compiles itself at load time and pulls
   React from unpkg. This build ships compiled, so it does not depend on a CDN
   staying up mid-demo.

### Verifying fidelity

```sh
npx http-server ../project -p 5001     # the original
npx http-server dist -p 5002           # this build
node compare.mjs                       # drives both, diffs the screenshots
```

The prototype needs `react`, `react-dom` and `@babel/standalone` reachable — on a
sandboxed network, vendor them locally and point `support.js` at the copies.
