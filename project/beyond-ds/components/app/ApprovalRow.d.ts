import * as React from "react";

/**
 * A digest proposal _beyond is not confident enough to apply alone. Once
 * decided the row keeps its place and shows the outcome plus an Undo — nothing
 * disappears.
 *
 * @startingPoint section="App" subtitle="Proposal waiting on a decision" viewport="700x260"
 */
export interface ApprovalEvidence { label: string; value: React.ReactNode; color?: string }
export interface ApprovalRowProps {
  /** e.g. "Currency", "Product match". */
  kind: string;
  /** e.g. "79%". Never hide it. */
  confidence?: string;
  head: React.ReactNode;
  /** The reasoning, in grey. */
  why?: React.ReactNode;
  evidence?: ApprovalEvidence[];
  decided?: boolean;
  outcome?: { label: string; note?: React.ReactNode; applied?: boolean };
  /** Approve / reject buttons, or the Undo button once decided. */
  actions?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function ApprovalRow(props: ApprovalRowProps): React.ReactElement;
