import * as React from "react";

/** A saved conversation in the sidebar list. The star is reserved for questions
 *  _beyond raised on the user's behalf — never decoration. */
export interface ThreadRowProps {
  question: string;
  /** When it was asked and what it cost, e.g. "asked for you · 2 h ago". */
  meta?: string;
  askedByBeyond?: boolean;
  active?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export declare function ThreadRow(props: ThreadRowProps): React.ReactElement;
