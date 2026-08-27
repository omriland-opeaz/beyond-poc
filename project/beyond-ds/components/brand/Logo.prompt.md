One-line: the _beyond lockup — use it wherever the brand signs a surface (sidebar head, intro header, email masthead, slide title).

```jsx
<Logo size={24} />
<Logo size={22} tone="cream" eclipse="var(--by-cream)" />
<Logo size={44} wordmark={false} />
```

The mark alone (`wordmark={false}`) is the avatar/favicon form. On an ink surface pass `tone="cream"` and `eclipse="var(--by-cream)"` so the circle reads against the background. Never 800 weight, never uppercase, never without the underscore.
