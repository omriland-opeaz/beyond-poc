import * as React from "react";

/** A hand-drawn mark over a word: a strike through a word being corrected, or a
 *  loose circle around a result. Loose bezier, 3–3.5 stroke, round caps, lime
 *  shade. Never a straight CSS rule. */
export interface HandStrikeProps {
  children: React.ReactNode;
  kind?: "strike" | "circle";
  color?: string;
  /** Colour the struck word fades to. */
  struck?: string;
}
export declare function HandStrike(props: HandStrikeProps): React.ReactElement;
