import * as React from "react";

/**
 * The _beyond lockup: lime rounded square, ink circle eclipsing it from the
 * bottom-right, wordmark in Space Grotesk 700 lowercase with the leading
 * underscore. Never redraw the mark by hand and never set the wordmark at 800.
 *
 * @startingPoint section="Brand" subtitle="Mark and wordmark lockup" viewport="700x150"
 */
export interface LogoProps {
  /** Side of the mark in px. The wordmark scales from it. */
  size?: number;
  /** Show the wordmark next to the mark. */
  wordmark?: boolean;
  /** Wordmark colour context. */
  tone?: "ink" | "cream";
  /** Override the eclipse disc colour (use cream on an ink surface). */
  eclipse?: string;
  style?: React.CSSProperties;
}
export declare function Logo(props: LogoProps): React.ReactElement;
