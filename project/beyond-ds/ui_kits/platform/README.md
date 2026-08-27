# UI kit — the _beyond platform

A recreation of the working web app, built from `_beyond Platform v3.dc.html` in
this project. Four surfaces, click-through:

| Screen | File | What it shows |
|---|---|---|
| Ask | `Ask.jsx` | The front door. One box, nothing competing with it. |
| Conversation | `Conversation.jsx` | A question, a challenge, an answer with its method, follow-ups. |
| Cockpit | `Cockpit.jsx` | The alert, then six graphs nobody configured. |
| Connect | `Connect.jsx` | Sources on the left, dotted flows, the lake on the right, the library below. |

`Shell.jsx` is the 250px sidebar + top rule that wraps all four.
`index.html` mounts them with working navigation.

The digest queue and memory tab live in the component cards
(`components/app/`) rather than as separate screens here.
