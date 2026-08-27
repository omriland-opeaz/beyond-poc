import React from "react";
import { Button } from "../../components/core/Button.jsx";
import { Chip } from "../../components/core/Chip.jsx";
import { AskInput } from "../../components/core/AskInput.jsx";
import { AnswerBlock } from "../../components/app/AnswerBlock.jsx";
import { ChallengeCard } from "../../components/app/ChallengeCard.jsx";
import { Wordmark } from "../../components/brand/Wordmark.jsx";
import { RankRows } from "../../components/data/RankRows.jsx";
import { Sparkline } from "../../components/data/Sparkline.jsx";

const DISTRICTS = [
  { label: "Cocody", note: "112 pharmacies", value: -11.4, display: "−11.4%" },
  { label: "Plateau", note: "48 pharmacies", value: -3.2, display: "−3.2%" },
  { label: "Marcory", note: "77 pharmacies", value: -0.4, display: "−0.4%" },
  { label: "Yopougon", note: "204 pharmacies", value: 2.1, display: "+2.1%" },
  { label: "Bouaké", note: "96 pharmacies", value: 4.8, display: "+4.8%" }
];

export function Conversation({ question, step = 0, onStep, onAsk }) {
  const [draft, setDraft] = React.useState("");
  const [watching, setWatching] = React.useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", animation: "byFade 160ms ease-out" }}>
      <div style={{ flex: 1, overflow: "auto" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "34px 44px 30px" }}>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 26 }}>
            <div style={{
              maxWidth: 540, background: "var(--by-cream)", border: "1px solid var(--by-line)",
              borderRadius: "12px 12px 4px 12px", padding: "14px 18px", fontSize: 13.5, lineHeight: 1.55
            }}>{question}</div>
          </div>

          {step === 0 && (
            <div style={{ marginBottom: 26 }}>
              <ChallengeCard kicker="_beyond disagrees with the question"
                head="You asked a national question. The answer is not national."
                body="Every question you have asked this month has been national or by district. City size has never been one of your cuts, and on this brand it is the cut that moves."
                primary={<Button onClick={() => onStep(1)}>Split it by city size</Button>}
                secondary={<Button variant="secondary" onClick={() => onStep(1)}>Keep the national view</Button>}
                note="you decide, not _beyond" />
            </div>
          )}

          {step >= 1 && (
            <AnswerBlock
              head="The category grew 1.4%."
              accent="Doliv's share fell 2.1 points."
              body="Two districts account for all of it. In pharmacies without the rival 1 g sachet, Doliv's share is unchanged."
              chartTitle="Share change by district · week to 24 August"
              actions={<>
                <Button variant="secondary" size="sm" onClick={() => setWatching(!watching)}
                  style={watching ? { background: "#5F7A12", color: "#fff", borderColor: "#5F7A12" } : undefined}>
                  {watching ? "Watching ✓" : "Watch this"}
                </Button>
                <Button variant="secondary" size="sm">Export</Button>
              </>}
              method={<>612 pharmacies · 1.2M rows read from four sources · EUR converted at monthly close · three months below the coverage threshold excluded. <Wordmark /> read these; it wrote nothing back.</>}>
              <RankRows showZero rows={DISTRICTS} />
              <div style={{ marginTop: 22 }}>
                <div style={{ fontSize: 12.5, fontWeight: 700, marginBottom: 10 }}>Share of measured units · 24 months</div>
                <Sparkline area height={120} values={[12.1, 12.3, 12.4, 12.0, 11.8, 11.9, 11.4, 11.2, 10.9]}
                  axis={["Q3 24", "Q1 25", "Q3 25", "Q2 26"]} />
              </div>
            </AnswerBlock>
          )}

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 20 }}>
            <Chip onClick={() => onAsk("Which outlets in Cocody stock the rival 1 g sachet?")}>Which outlets stock the rival sachet?</Chip>
            <Chip onClick={() => onAsk("Show it by pack format")}>Show it by pack format</Chip>
            <Chip onClick={() => onAsk("What would it take to widen coverage?")}>What would it take to widen coverage?</Chip>
          </div>
        </div>
      </div>
      <div style={{ flexShrink: 0, padding: "18px 44px 22px", borderTop: "1px solid var(--by-line)", background: "var(--by-paper)" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <AskInput size="sm" placeholder="Ask a follow-up" value={draft} onChange={setDraft}
            onSubmit={v => { onAsk(v); setDraft(""); }} />
          <div style={{ marginTop: 8, fontSize: 10.5, color: "var(--by-grey)", textAlign: "center" }}>
            Answers are read from the lake. <Wordmark /> does not write to your sources.
          </div>
        </div>
      </div>
    </div>
  );
}
