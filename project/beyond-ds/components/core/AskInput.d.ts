import * as React from "react";

/**
 * The question box — the front door of the product. Focus draws an ink border
 * and a lime ring. The send button only turns lime once there is something to
 * ask.
 *
 * @startingPoint section="Core" subtitle="The ask box, large and footer sizes" viewport="700x150"
 */
export interface AskInputProps {
  value: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  /** "lg" on the home screen, "sm" in a conversation footer. */
  size?: "lg" | "sm";
  style?: React.CSSProperties;
}
export declare function AskInput(props: AskInputProps): React.ReactElement;
