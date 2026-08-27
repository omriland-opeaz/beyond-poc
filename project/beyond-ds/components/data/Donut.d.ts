import * as React from "react";

/** Share of a measured whole. Four slices at most; the rest is "other". The
 *  legend, not the ring, carries the numbers. */
export interface DonutSlice { label: string; value: number; color: string; display?: string }
export interface DonutProps {
  slices: DonutSlice[];
  size?: number;
  legend?: boolean;
  style?: React.CSSProperties;
}
export declare function Donut(props: DonutProps): React.ReactElement;
