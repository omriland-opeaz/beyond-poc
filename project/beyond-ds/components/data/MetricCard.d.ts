import * as React from "react";

/**
 * A cockpit card. The graph is the child. The `why` line at the foot is not
 * optional in practice — nothing appears in the cockpit without saying what put
 * it there.
 *
 * @startingPoint section="Data" subtitle="Cockpit card with graph and reason" viewport="700x320"
 */
export interface MetricCardProps {
  badge?: string;
  badgeTone?: "lime" | "waiting" | "broken" | "quiet";
  when?: string;
  title: React.ReactNode;
  value: React.ReactNode;
  delta?: string;
  deltaTone?: "up" | "down" | "flat";
  /** The graph — a Sparkline, BarChart, Donut or RankRows at size="sm". */
  children?: React.ReactNode;
  foot?: string;
  /** Why this card exists. Always fill it in. */
  why?: string;
  whyTone?: "lime" | "waiting" | "broken";
  onClick?: () => void;
  style?: React.CSSProperties;
}
export declare function MetricCard(props: MetricCardProps): React.ReactElement;
