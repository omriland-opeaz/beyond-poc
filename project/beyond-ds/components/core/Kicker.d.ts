import * as React from "react";

/** The tracked-out uppercase line that opens a section or a card. Grey by
 *  default; lime-type for something _beyond did, amber for something waiting. */
export interface KickerProps {
  children: React.ReactNode;
  color?: string;
  style?: React.CSSProperties;
}
export declare function Kicker(props: KickerProps): React.ReactElement;
