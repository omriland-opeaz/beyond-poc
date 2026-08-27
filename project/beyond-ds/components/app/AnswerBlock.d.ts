import * as React from "react";

/**
 * The shape of every answer: statement, then the trace — which sources, which
 * rows, which conversion. Never ship an answer without `method`.
 *
 * @startingPoint section="App" subtitle="Answer with graph and method" viewport="700x400"
 */
export interface AnswerBlockProps {
  /** The claim, in one sentence. */
  head: React.ReactNode;
  /** The half of the sentence that carries the finding, set in lime-type. */
  accent?: React.ReactNode;
  body?: React.ReactNode;
  chartTitle?: React.ReactNode;
  /** Small buttons at the right of the chart header, e.g. Watch / Export. */
  actions?: React.ReactNode;
  /** The graph. */
  children?: React.ReactNode;
  /** Sources, row counts, conversions, exclusions. Required in practice. */
  method?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function AnswerBlock(props: AnswerBlockProps): React.ReactElement;
