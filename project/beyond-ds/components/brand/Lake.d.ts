import * as React from "react";

/**
 * The lake illustration — the brand's single recurring drawing and the
 * reference every other illustration copies: one shape, one gradient, a lime
 * edge on water, three or four white marks, slow looping ripples.
 *
 * @startingPoint section="Brand" subtitle="The lake illustration" viewport="700x340"
 */
export interface LakeProps {
  width?: number;
  /** Row count shown inside the lake, e.g. "3.1M". */
  rows?: string;
  caption?: string;
  /** Small line under the caption, e.g. "recomputed 14 min ago". */
  foot?: string;
  /** Grows as sources connect. Animates over 1.6s. */
  scale?: number;
  style?: React.CSSProperties;
}
export declare function Lake(props: LakeProps): React.ReactElement;
