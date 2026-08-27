import * as React from "react";

/** The product name inside a sentence. Keeps family, weight and tracking; only
 *  colour changes. Use it every single time the name appears in prose. */
export interface WordmarkProps {
  color?: string;
  style?: React.CSSProperties;
}
export declare function Wordmark(props: WordmarkProps): React.ReactElement;
