import React from "react";

const TONES = { live: "var(--by-confirmed)", idle: "var(--by-grey-light)", waiting: "var(--by-waiting)", broken: "var(--by-broken)", lime: "var(--by-lime)" };

/** A 7px dot for a feed's state. Live pulses slowly; nothing else moves. */
export function StatusDot({ tone = "live", size = 7, pulse, style }) {
  return <span style={{
    width: size, height: size, borderRadius: "50%", flexShrink: 0,
    background: TONES[tone] || tone,
    animation: pulse ? "byPulse 2.4s ease-in-out infinite" : undefined, ...style
  }} />;
}
