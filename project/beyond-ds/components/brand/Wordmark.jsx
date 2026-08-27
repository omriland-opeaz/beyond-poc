import React from "react";

/** _beyond set inside running copy: same family, weight and tracking as the
 *  logo, only the colour adapts to the background. */
export function Wordmark({ color = "var(--by-ink)", style }) {
  return (
    <span style={{
      fontFamily: "var(--by-font-sans)", fontWeight: "var(--by-weight-bold)",
      letterSpacing: "var(--by-tracking-wordmark)", color, ...style
    }}>_beyond</span>
  );
}
