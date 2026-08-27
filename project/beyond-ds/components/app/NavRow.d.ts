import * as React from "react";

/** A row in the 250px sidebar. The active treatment is fixed: ink label, lime
 *  wash fading right, 2px ink left edge. */
export interface NavRowProps {
  label: React.ReactNode;
  /** Count or alert number at the right. */
  badge?: React.ReactNode;
  badgeColor?: string;
  active?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export declare function NavRow(props: NavRowProps): React.ReactElement;
