import * as React from "react";

/** Something the user asked to be told about has happened. The note always
 *  restates the threshold they set and when they set it. */
export interface AlertBannerProps {
  kicker?: string;
  claim: React.ReactNode;
  note?: string;
  action?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export declare function AlertBanner(props: AlertBannerProps): React.ReactElement;
