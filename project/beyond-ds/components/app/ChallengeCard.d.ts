import * as React from "react";

/** Used when the honest answer is that the question is the wrong cut, or the
 *  coverage is too thin to answer. Always offers the user both roads and says
 *  the decision is theirs. */
export interface ChallengeCardProps {
  kicker?: string;
  head: React.ReactNode;
  body?: React.ReactNode;
  /** The lime Button. */
  primary?: React.ReactNode;
  /** The outline Button that keeps the user's original request. */
  secondary?: React.ReactNode;
  note?: string;
  style?: React.CSSProperties;
}
export declare function ChallengeCard(props: ChallengeCardProps): React.ReactElement;
