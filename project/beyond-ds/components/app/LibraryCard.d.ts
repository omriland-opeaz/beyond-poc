import * as React from "react";

/** An available source in the Connect library. The tick means _beyond verified
 *  the feed, not that the data is good. */
export interface LibraryCardProps {
  name: string;
  /** Category, or "shared by <partner>". */
  sub?: string;
  description?: React.ReactNode;
  /** How it arrives, e.g. "read-only · nightly". */
  mode?: string;
  trusted?: boolean;
  /** Vendor glyph; falls back to the first two letters of the name. */
  icon?: React.ReactNode;
  tint?: string;
  color?: string;
  /** The connect Button. */
  action?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function LibraryCard(props: LibraryCardProps): React.ReactElement;
