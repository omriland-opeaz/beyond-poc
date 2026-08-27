import * as React from "react";

/** The square tile that stands in for a source, a dropped file or a user.
 *  Initials by default; pass a vendor SVG as children where one exists. */
export interface SourceIconProps {
  /** Two or three characters, e.g. "TP", "XLS". */
  label?: string;
  size?: number;
  tint?: string;
  color?: string;
  /** A vendor glyph instead of initials. */
  children?: React.ReactNode;
  /** Circle instead of a rounded square — used for people. */
  round?: boolean;
  style?: React.CSSProperties;
}
export declare function SourceIcon(props: SourceIconProps): React.ReactElement;
