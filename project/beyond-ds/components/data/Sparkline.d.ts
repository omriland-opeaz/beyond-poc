import * as React from "react";

/**
 * A trend over time. Ink stroke by default; lime fill only when the series is
 * the subject of the answer. Never more than one series — two lines means two
 * questions.
 *
 * @startingPoint section="Data" subtitle="Line and area trend" viewport="700x230"
 */
export interface SparklineProps {
  values: number[];
  /** Labels under the line; they replace an x-axis. */
  axis?: string[];
  height?: number;
  area?: boolean;
  stroke?: string;
  fill?: string;
  style?: React.CSSProperties;
}
export declare function Sparkline(props: SparklineProps): React.ReactElement;
