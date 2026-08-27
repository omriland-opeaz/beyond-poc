import * as React from "react";

/**
 * The action control. One lime button per screen — if a screen needs two
 * primaries, the screen is wrong. Pills for page-level actions, 8px radius for
 * in-row actions like Approve.
 *
 * @startingPoint section="Core" subtitle="Primary, secondary, ink, ghost, danger" viewport="700x150"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ink" | "ghost" | "danger";
  size?: "lg" | "md" | "sm";
  /** "pill" for page actions, "square" (8px) for actions inside a row. */
  shape?: "pill" | "square";
}
export declare function Button(props: ButtonProps): React.ReactElement;
