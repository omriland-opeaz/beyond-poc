One-line: the intro's three-up explainer — one panel per step, always in the order lime, water, ink.

```jsx
<div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
  <StepPanel n="01" label="CONNECT" tone="lime" title="Plug in anything. Really, anything.">
    Partner portals, wholesaler feeds, a photo of a delivery note.
  </StepPanel>
  <StepPanel n="02" label="DIGEST" tone="water" title="We digest it until it compares." >…</StepPanel>
  <StepPanel n="03" label="COCKPIT" tone="ink" title="Ask anything. Watch what matters.">…</StepPanel>
</div>
```
