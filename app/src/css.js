/* Turns a CSS declaration string into a React style object, so every style in
   this app can be copied verbatim out of the prototype instead of hand-converted.
   Splits on top-level semicolons only, so rgba(), url() and gradients survive. */

const cache = new Map();

export function S(css) {
  if (!css) return undefined;
  const hit = cache.get(css);
  if (hit) return hit;

  const out = {};
  let depth = 0;
  let start = 0;
  const parts = [];
  for (let i = 0; i < css.length; i++) {
    const c = css[i];
    if (c === "(") depth++;
    else if (c === ")") depth--;
    else if (c === ";" && depth === 0) {
      parts.push(css.slice(start, i));
      start = i + 1;
    }
  }
  parts.push(css.slice(start));

  for (const part of parts) {
    const decl = part.trim();
    if (!decl) continue;
    const colon = decl.indexOf(":");
    if (colon < 0) continue;
    let prop = decl.slice(0, colon).trim();
    const value = decl.slice(colon + 1).trim();
    if (!prop.startsWith("--")) prop = prop.replace(/-([a-z])/g, (_, ch) => ch.toUpperCase());
    out[prop] = value;
  }

  cache.set(css, out);
  return out;
}
