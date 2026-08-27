One-line: one graph the user did not have to ask for, in the cockpit grid.

```jsx
<MetricCard badge="Asked for you" when="2 h ago"
  title="Advil share in Cocody" value="8.9%" delta="−11.4%" deltaTone="down"
  foot="112 pharmacies · week to 24 Aug"
  why="You asked to be told below −10%. Set 12 Aug."
  onClick={open}>
  <Sparkline values={[…]} height={82} />
</MetricCard>
```

Grid them with `repeat(auto-fit, minmax(300px, 1fr))` and a 14px gap.
