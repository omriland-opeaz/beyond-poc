import * as React from "react";

/**
 * "Drop anything." The empty state says what to drop, never that there is
 * nothing here. On success it reports what _beyond made of the file — how it
 * read it, how many rows, which period.
 *
 * @startingPoint section="App" subtitle="Drop anything — idle, reading, filed" viewport="700x430"
 */
export interface DropZoneProps {
  state?: "idle" | "reading" | "filed";
  /** The current reading step, e.g. "matching products". */
  step?: string;
  /** What _beyond made of the file, shown when filed. */
  result?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export declare function DropZone(props: DropZoneProps): React.ReactElement;
