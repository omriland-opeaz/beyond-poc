import * as React from "react";

/** A follow-up question offered under an answer. Always a real question in the
 *  user's own words, never a command. */
export interface ChipProps {
  children: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export declare function Chip(props: ChipProps): React.ReactElement;
