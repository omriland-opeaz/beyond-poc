import * as React from "react";

/**
 * The default surface: white, one hairline rule, 14px radius, no shadow.
 * Hover darkens the rule to ink when the card is clickable. Prefer a rule over
 * another card whenever you can.
 *
 * @startingPoint section="Core" subtitle="Paper, sunken, lime, ink, alert surfaces" viewport="700x220"
 */
export interface CardProps {
  children?: React.ReactNode;
  tone?: "paper" | "sunken" | "lime" | "ink" | "alert";
  interactive?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export declare function Card(props: CardProps): React.ReactElement;
