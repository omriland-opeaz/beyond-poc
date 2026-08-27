import * as React from "react";

/** Title plus a right-hand note over a 2px ink rule. The standard way to start
 *  a block of rows. `weight="light"` uses a hairline instead. */
export interface SectionHeaderProps {
  title: React.ReactNode;
  /** Quiet right-aligned note — a count, a caveat, a timestamp. */
  note?: React.ReactNode;
  /** Extra controls beside the title, e.g. a small Tabs row. */
  children?: React.ReactNode;
  weight?: "strong" | "light";
  style?: React.CSSProperties;
}
export declare function SectionHeader(props: SectionHeaderProps): React.ReactElement;
