import * as React from "react";

/** Counted things per period. Ink bars; the one bar the sentence is about turns
 *  lime. No gridlines, no y-axis — the number is in the headline. */
export interface BarChartProps {
  values: number[];
  axis?: string[];
  height?: number;
  color?: string;
  /** Index of the bar the answer is about. */
  highlight?: number;
  highlightColor?: string;
  style?: React.CSSProperties;
}
export declare function BarChart(props: BarChartProps): React.ReactElement;
