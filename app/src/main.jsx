import { createRoot } from "react-dom/client";
import "./global.css";
import BeyondPlatform from "./BeyondPlatform.jsx";

/* The prototype exposed startView / startStep / startTab / methodNotes / showTrace
   as design-canvas props. Here they read off the query string, so every screen the
   prototype could open on stays reachable: ?view=intro, ?view=settings&tab=digest … */
const q = new URLSearchParams(window.location.search);
const one = (name, allowed, fallback) => {
  const val = q.get(name);
  return allowed.includes(val) ? val : fallback;
};

const props = {
  startView: one("view", ["home", "chat", "cockpit", "settings", "intro"], "home"),
  startStep: one("step", ["0", "1", "2"], "0"),
  startTab: one("tab", ["connect", "digest", "memory"], "connect"),
  methodNotes: q.get("methodNotes") !== "false",
  showTrace: q.get("showTrace") !== "false",
};

/* No StrictMode: it double-mounts in dev, which would run the placeholder
   typewriter loop twice and type at double speed. */
createRoot(document.getElementById("root")).render(<BeyondPlatform {...props} />);
