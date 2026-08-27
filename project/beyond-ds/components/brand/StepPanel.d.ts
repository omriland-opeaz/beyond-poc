import * as React from "react";

/**
 * A full-bleed numbered panel — the intro's Connect / Digest / Cockpit lockup.
 * The three tones are fixed to the three steps: lime is 01, water is 02, ink is
 * 03. Do not introduce a fourth tone; a screen that needs one is wrong.
 *
 * @startingPoint section="Brand" subtitle="Numbered Connect / Digest / Cockpit panel" viewport="700x400"
 */
export interface StepPanelProps {
  /** Two-digit numeral, e.g. "01". */
  n: string;
  /** Uppercase pill opposite the numeral, e.g. "CONNECT". */
  label?: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  tone?: "lime" | "water" | "ink";
  minHeight?: number;
  style?: React.CSSProperties;
}
export declare function StepPanel(props: StepPanelProps): React.ReactElement;
