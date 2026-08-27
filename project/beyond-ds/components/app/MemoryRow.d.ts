import * as React from "react";

/** One thing _beyond remembers. Every row is deletable and the deletion is
 *  visible rather than instant — the row stays, struck through, with Restore. */
export interface MemoryRowProps {
  head: React.ReactNode;
  /** Where it was learned from. */
  note?: string;
  when?: string;
  forgotten?: boolean;
  onForget?: () => void;
  style?: React.CSSProperties;
}
export declare function MemoryRow(props: MemoryRowProps): React.ReactElement;
