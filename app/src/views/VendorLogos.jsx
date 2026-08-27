import { S } from "../css.js";

/* Third-party vendor marks are the one exception to "almost no iconography":
   copied verbatim in their own brand colours rather than redrawn. */

export function Dropbox() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" style={S("width:15px;height:15px")}>
      <path d="M8 3 L0 8 L8 13 L16 8 Z M24 3 L16 8 L24 13 L32 8 Z M0 18 L8 13 L16 18 L8 23 Z M24 13 L32 18 L24 23 L16 18 Z M8 25 L16 20 L24 25 L16 30 Z" fill="#FFFFFF"></path>
    </svg>
  );
}

export function GoogleDrive() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" style={S("width:17px;height:17px")}>
      <path d="M29.5,21l-3.1708,5.5489A3.07,3.07,0,0,1,23.6459,28H8.3541a3.07,3.07,0,0,1-2.6833-1.4511L4.3687,24.27,9.7578,21Z" fill="#4285f4"></path>
      <path d="M12.3822,4.13a3.2262,3.2262,0,0,0-1.7067,1.4276L2.9591,18.76a3.07,3.07,0,0,0-.1012,3.0489l1.53,2.4658L9.7579,21,16,10.32Z" fill="#00ac47"></path>
      <path d="M9.7578,21H2.568a2.6543,2.6543,0,0,0,.29.8089L4.38,24.2632l-.0115.007L5.6709,26.549A2.8267,2.8267,0,0,0,7.008,27.6974L9.7578,21l-.0081.0049Z" fill="#0066da"></path>
      <path d="M19.6068,4.13a3.2256,3.2256,0,0,1,1.7066,1.4276L29.03,18.76a3.07,3.07,0,0,1,.1013,3.0489l-1.5295,2.4658L22.2311,21,15.9889,10.32Z" fill="#ffba00"></path>
      <path d="M22.2311,21h7.19a2.6541,2.6541,0,0,1-.29.8089l-1.5224,2.4544.0116.007L26.3181,26.549a2.8272,2.8272,0,0,1-1.3371,1.1484L22.2312,21l.0081.0049Z" fill="#ea4435"></path>
      <path d="M19.6155,4.1342l.0023-.004a2.7726,2.7726,0,0,0-.3609-.0983L16,4l-3.2569.0319a2.7726,2.7726,0,0,0-.3609.0983,3.0224,3.0224,0,0,0-.367.1666L15.9889,10.32,19.977,4.2993A3.03,3.03,0,0,0,19.6155,4.1342Z" fill="#188038"></path>
    </svg>
  );
}

export function GoogleSheets() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" style={S("width:19px;height:19px")}>
      <path d="M8 3 H19 L26 10 V27 A2 2 0 0 1 24 29 H10 A2 2 0 0 1 8 27 V5 A2 2 0 0 1 10 3 Z" fill="#0F9D58"></path>
      <path d="M19 3 L26 10 H19 Z" fill="#0B8043"></path>
      <rect x="11.5" y="14" width="11" height="11" fill="#FFFFFF"></rect>
      <g stroke="#0F9D58" strokeWidth="1.3">
        <path d="M11.5 17.7 H22.5 M11.5 21.4 H22.5 M15.2 14 V25 M18.8 14 V25"></path>
      </g>
    </svg>
  );
}

export function Excel() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" style={S("width:19px;height:19px")}>
      <path d="M8 3 H19 L26 10 V27 A2 2 0 0 1 24 29 H10 A2 2 0 0 1 8 27 V5 A2 2 0 0 1 10 3 Z" fill="#217346"></path>
      <path d="M19 3 L26 10 H19 Z" fill="#185C37"></path>
      <polygon points="11.5,12 15.5,12 22.5,25 18.5,25" fill="#FFFFFF"></polygon>
      <polygon points="18.5,12 22.5,12 15.5,25 11.5,25" fill="#FFFFFF"></polygon>
    </svg>
  );
}

/* Not that the data is good — that _beyond verified the feed. */
export function VerifiedSeal() {
  return (
    <svg viewBox="0 0 24 24" role="img" aria-label="Verified by _beyond" style={S("flex-shrink:0;width:13px;height:13px")}>
      <path d="M23 12l-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82L8.6 22.5l3.4-1.47 3.4 1.46 1.89-3.19 3.61-.82-.34-3.69L23 12zm-12.91 4.72l-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.35z" fill="#9C9C90"></path>
    </svg>
  );
}

export function PopularTag() {
  return (
    <span style={S("display:flex;align-items:center;gap:3px;flex-shrink:0;color:#029B82")}>
      <span style={S("font-size:11px;font-weight:600;letter-spacing:-0.01em")}>Popular</span>
      <svg viewBox="0 0 24 24" aria-hidden="true" style={S("width:12px;height:12px;fill:none;stroke:#029B82;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round")}>
        <path d="M3 17 L9.5 10.5 L13.5 14.5 L21 7"></path>
        <path d="M15 7 H21 V13"></path>
      </svg>
    </span>
  );
}

export function PlusGlyph() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" style={S("width:18px;height:18px;stroke:#A8A8A0;stroke-width:1.8;stroke-linecap:round")}>
      <path d="M16 4 V28 M4 16 H28"></path>
    </svg>
  );
}
