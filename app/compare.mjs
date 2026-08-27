/* Screenshot-diffs the ported app against the original .dc.html prototype.
   Both are driven through the same clicks, so state matches before each shot.
   Run: node compare.mjs   (needs the two http-servers on 5001/5002) */

import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

const PROTO = "http://localhost:5001/source/Beyond%20Platform%20v3%20-%20Final.dc.html";
const APP = "http://localhost:5002/";
const OUT = process.env.OUT || "/tmp/claude-0/-home-claude-repo/559cfa0a-e5ae-5e86-b2b8-0d0b6d127d98/scratchpad/shots";
const VIEWPORT = { width: 1440, height: 900 };

fs.mkdirSync(OUT, { recursive: true });

/* Every scene is a name plus the clicks that reach it from the Ask screen. */
const SCENES = [
  { name: "ask", steps: [] },
  { name: "chat-step0", steps: [["text", "How is Advil doing in Côte d'Ivoire?"]] },
  { name: "chat-step1", steps: [["text", "How is Advil doing in Côte d'Ivoire?"], ["text", "Split it by city size"]] },
  { name: "chat-step2", steps: [["text", "How is Advil doing in Côte d'Ivoire?"], ["text", "Split it by city size"], ["text", "Yes, widen it"]] },
  { name: "chat-donut", steps: [["text", "How is the analgesics category split between brands?"]] },
  { name: "chat-area", steps: [["text", "What is our sell-out value month by month?"]] },
  { name: "chat-line", steps: [["text", "How fast is Nurofen 400 mg spreading through the panel?"]] },
  { name: "chat-dots", steps: [["text", "Which pharmacies stopped stocking Advil?"]] },
  { name: "cockpit", steps: [["text", "Cockpit"]] },
  { name: "connect", steps: [["text", "Settings"]] },
  { name: "connect-library-community", steps: [["text", "Settings"], ["text", "Community"]] },
  { name: "dropzone", steps: [["text", "Settings"], ["text", "Drop zone"]] },
  { name: "digest", steps: [["text", "Settings"], ["text", "Digest"]] },
  { name: "digest-approved", steps: [["text", "Settings"], ["text", "Digest"], ["text", "Approve"]] },
  { name: "memory", steps: [["text", "Settings"], ["text", "Memory"]] },
];

async function settle(page) {
  /* Freeze everything that moves so the two shots are comparable: the placeholder
     typewriter, the lake ripples, the flow dashes, the entrance animations. */
  await page.addStyleTag({
    content: `*,*::before,*::after{animation:none!important;transition:none!important}
              #by-ask::placeholder{color:transparent!important}`,
  });
  await page.waitForTimeout(800);
}

async function drive(page, url, steps) {
  /* Not networkidle: the blocked webfont requests never settle, and shooting
     before the fallback-font reflow lands produces phantom diffs. */
  await page.goto(url, { waitUntil: "load" });
  await page.waitForSelector("text=_beyond", { timeout: 30000 });
  await page.waitForTimeout(5000);
  for (const [kind, arg] of steps) {
    if (kind === "text") {
      await page.getByText(arg, { exact: false }).first().click();
      await page.waitForTimeout(1500);
    }
  }
  await settle(page);
}

function readPng(p) {
  return PNG.sync.read(fs.readFileSync(p));
}

const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
const results = [];

for (const scene of SCENES) {
  const shots = {};
  for (const [label, url] of [["proto", PROTO], ["app", APP]]) {
    const page = await browser.newPage({ viewport: VIEWPORT, deviceScaleFactor: 1 });
    try {
      await drive(page, url, scene.steps);
      const file = path.join(OUT, `${scene.name}.${label}.png`);
      await page.screenshot({ path: file, fullPage: true });
      shots[label] = file;
    } catch (err) {
      results.push({ scene: scene.name, error: `${label}: ${err.message.split("\n")[0]}` });
      shots[label] = null;
    }
    await page.close();
  }

  if (!shots.proto || !shots.app) continue;

  const a = readPng(shots.proto);
  const b = readPng(shots.app);
  if (a.width !== b.width || a.height !== b.height) {
    results.push({ scene: scene.name, sizeMismatch: `proto ${a.width}x${a.height} vs app ${b.width}x${b.height}` });
    continue;
  }
  const diff = new PNG({ width: a.width, height: a.height });
  const bad = pixelmatch(a.data, b.data, diff.data, a.width, a.height, { threshold: 0.1 });
  const total = a.width * a.height;
  fs.writeFileSync(path.join(OUT, `${scene.name}.diff.png`), PNG.sync.write(diff));
  results.push({ scene: scene.name, size: `${a.width}x${a.height}`, diffPx: bad, pct: ((bad / total) * 100).toFixed(3) });
}

await browser.close();
console.log(JSON.stringify(results, null, 2));
