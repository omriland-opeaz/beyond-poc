import React from "react";

/** Ranked comparison: a labelled row, a track, a tabular value. Bars for
 *  magnitudes, dots for positions, a zero line when values go negative. */
export function RankRows({ rows = [], kind = "bars", showZero, size = "lg", style }) {
  const vals = rows.map(r => r.value);
  const min = Math.min(0, ...vals), max = Math.max(0, ...vals);
  const span = (max - min) || 1;
  const pct = v => ((v - min) / span) * 100;
  const zero = pct(0);
  const lg = size === "lg";
  const cols = lg ? "124px 1fr 60px" : "68px 1fr 36px";
  return (
    <div style={style}>
      {rows.map((r, i) => {
        const p = pct(r.value);
        const left = r.value >= 0 ? zero : p;
        const width = Math.abs(p - zero);
        const color = r.color || (r.value < 0 ? "var(--by-broken)" : "var(--by-ink)");
        return (
          <div key={i} style={{
            display: "grid", gridTemplateColumns: cols, gap: lg ? 14 : 9, alignItems: "center",
            padding: lg ? "8px 0" : "3px 0", borderBottom: lg ? "1px solid var(--by-line-faint)" : "none"
          }}>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: lg ? 12 : 10, fontWeight: lg ? 500 : 400, color: lg ? "var(--by-ink)" : "var(--by-grey)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.label}</div>
              {lg && r.note && <div style={{ fontSize: 10, color: "var(--by-grey)", marginTop: 1 }}>{r.note}</div>}
            </div>
            <div style={{ position: "relative", height: lg ? 16 : 9 }}>
              {kind === "bars" ? (
                <>
                  <div style={{ position: "absolute", inset: 0, background: "var(--by-line-faint)", borderRadius: 3 }} />
                  <div style={{ position: "absolute", top: 0, bottom: 0, left: left + "%", width: width + "%", background: color, borderRadius: 3 }} />
                </>
              ) : (
                <>
                  <div style={{ position: "absolute", left: 0, right: 0, top: lg ? 7 : 4, height: 1, background: "var(--by-line-faint)" }} />
                  <div style={{ position: "absolute", top: lg ? 2 : 0, left: p + "%", width: lg ? 12 : 9, height: lg ? 12 : 9, borderRadius: "50%", background: color, marginLeft: lg ? -6 : -4 }} />
                </>
              )}
              {showZero && kind === "bars" && <div style={{ position: "absolute", top: -3, bottom: -3, left: zero + "%", width: 1, background: "var(--by-ink)" }} />}
            </div>
            <div style={{ fontSize: lg ? 12 : 10, fontWeight: 700, textAlign: "right", fontVariantNumeric: "var(--by-numeric)", color }}>{r.display || r.value}</div>
          </div>
        );
      })}
    </div>
  );
}
