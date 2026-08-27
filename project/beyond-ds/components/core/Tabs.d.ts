import * as React from "react";

/** Pill tab row — Settings' Connect / Digest / Memory, and the Library's
 *  category filter at `size="sm"`. Selected is ink-filled, never lime. */
export interface TabItem { value: string; label: string; count?: number | string }
export interface TabsProps {
  items: TabItem[];
  value: string;
  onChange?: (value: string) => void;
  size?: "sm" | "md";
  style?: React.CSSProperties;
}
export declare function Tabs(props: TabsProps): React.ReactElement;
