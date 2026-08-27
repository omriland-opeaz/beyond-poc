import * as React from "react";

/** The state of a feed or a row, as a dot. Semantic colours only. */
export interface StatusDotProps {
  tone?: "live" | "idle" | "waiting" | "broken" | "lime" | string;
  size?: number;
  pulse?: boolean;
  style?: React.CSSProperties;
}
export declare function StatusDot(props: StatusDotProps): React.ReactElement;
