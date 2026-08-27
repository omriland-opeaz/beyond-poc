import React from "react";

/** A hand-drawn annotation over a word: a loose bezier in lime shade, drawn on
 *  rather than switched on. */
export function HandStrike({ children, kind = "strike", color = "var(--by-lime-shade)", struck = "rgba(20,23,15,.45)" }) {
  const strike = "M2,14 C22,7 44,17 64,10 C82,4 100,13 118,8";
  const circle = "M104,11 C88,3 44,1 23,9 C6,16 5,32 22,39 C41,47 90,45 107,36 C120,29 117,14 98,8";
  const isCircle = kind === "circle";
  return (
    <span style={{ position: "relative", display: "inline-block", color: isCircle ? "inherit" : struck, padding: isCircle ? "3px 16px 5px" : 0 }}>
      {children}
      <svg viewBox={isCircle ? "0 0 130 46" : "0 0 120 24"} preserveAspectRatio="none" style={{
        position: "absolute",
        left: isCircle ? "-12%" : "-5%", top: isCircle ? "-24%" : "46%",
        width: isCircle ? "124%" : "110%", height: isCircle ? "150%" : 20,
        overflow: "visible", pointerEvents: "none"
      }}>
        <path d={isCircle ? circle : strike} fill="none" stroke={color} strokeWidth={isCircle ? 3 : 3.2}
          strokeLinecap="round" vectorEffect="non-scaling-stroke"
          strokeDasharray={isCircle ? 330 : undefined} strokeDashoffset={isCircle ? 330 : undefined}
          style={isCircle ? { animation: "byDraw 760ms ease-out 160ms forwards" } : { animation: "byInk 6s ease-in-out infinite" }} />
      </svg>
    </span>
  );
}
