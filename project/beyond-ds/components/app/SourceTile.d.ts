import * as React from "react";

/** One connected source in the Connect column. The foot line says what it last
 *  delivered and when — never just "Connected". */
export interface SourceTileProps {
  name: string;
  foot?: React.ReactNode;
  initials?: string;
  tint?: string;
  color?: string;
  state?: "live" | "idle" | "waiting" | "broken";
  /** Replaces the status dot — e.g. a danger Button when the feed is broken. */
  action?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function SourceTile(props: SourceTileProps): React.ReactElement;
