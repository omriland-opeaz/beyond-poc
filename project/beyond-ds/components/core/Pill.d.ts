import * as React from "react";

/** Uppercase micro-label: a step name, a card's kind, a feed's state. Semantic
 *  tones carry meaning (waiting / broken / confirmed) and are the only place a
 *  non-brand colour is allowed. */
export interface PillProps {
  children: React.ReactNode;
  tone?: "outline" | "cream" | "lime" | "ink" | "waiting" | "broken" | "confirmed";
  style?: React.CSSProperties;
}
export declare function Pill(props: PillProps): React.ReactElement;
