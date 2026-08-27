import * as React from "react";

/**
 * The workhorse comparison: one row per thing, sorted, with the number at the
 * right in tabular figures. Bars for magnitudes, dots for positions on a scale.
 * Negative values turn red and `showZero` draws the ink baseline.
 *
 * @startingPoint section="Data" subtitle="Ranked bar and dot rows" viewport="700x260"
 */
export interface RankRow { label: string; value: number; note?: string; display?: string; color?: string }
export interface RankRowsProps {
  rows: RankRow[];
  kind?: "bars" | "dots";
  showZero?: boolean;
  /** "lg" under an answer, "sm" on a cockpit card. */
  size?: "lg" | "sm";
  style?: React.CSSProperties;
}
export declare function RankRows(props: RankRowsProps): React.ReactElement;
