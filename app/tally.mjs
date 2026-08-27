import fs from "node:fs"; import { PNG } from "pngjs"; import pixelmatch from "pixelmatch";
const OUT = "/tmp/claude-0/-home-claude-repo/559cfa0a-e5ae-5e86-b2b8-0d0b6d127d98/scratchpad/shots";
const names = [...new Set(fs.readdirSync(OUT).filter(f=>f.endsWith(".proto.png")).map(f=>f.replace(".proto.png","")))].sort();
let worst = 0;
for (const n of names) {
  const pa = `${OUT}/${n}.proto.png`, pb = `${OUT}/${n}.app.png`;
  if (!fs.existsSync(pb)) { console.log(n.padEnd(28), "app shot missing"); continue; }
  const a = PNG.sync.read(fs.readFileSync(pa)), b = PNG.sync.read(fs.readFileSync(pb));
  if (a.width!==b.width||a.height!==b.height) { console.log(n.padEnd(28), `SIZE MISMATCH proto ${a.width}x${a.height} app ${b.width}x${b.height}`); continue; }
  const d = new PNG({width:a.width,height:a.height});
  const bad = pixelmatch(a.data,b.data,d.data,a.width,a.height,{threshold:0.1});
  if (bad) fs.writeFileSync(`${OUT}/${n}.diff.png`, PNG.sync.write(d));
  worst = Math.max(worst, bad);
  console.log(n.padEnd(28), `${a.width}x${a.height}`.padEnd(12), String(bad).padStart(8), ((bad/(a.width*a.height))*100).toFixed(3)+"%");
}
console.log("\nscenes:", names.length, "| worst:", worst, "px");
