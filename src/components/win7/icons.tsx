/** Hand-drawn Windows-7-flavoured icon set (original artwork, no MS assets). */
import type { SVGProps } from "react";

export type IconKind =
  | "folder"
  | "folder-open"
  | "projects"
  | "about"
  | "skills"
  | "experience"
  | "resume"
  | "contact"
  | "recycle"
  | "browser"
  | "settings"
  | "search"
  | "info"
  | "warn"
  | "error"
  | "success"
  | "document"
  | "star"
  | "shield";

const g = (id: string, from: string, to: string) => (
  <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stopColor={from} />
    <stop offset="1" stopColor={to} />
  </linearGradient>
);

function FolderBase({ tint = "#ffc85c", tint2 = "#e79a12" }: { tint?: string; tint2?: string }) {
  return (
    <>
      <defs>
        {g("fB", "#f6d68a", tint)}
        {g("fF", tint, tint2)}
        {g("fS", "rgba(255,255,255,.9)", "rgba(255,255,255,0)")}
      </defs>
      <path
        d="M3 12c0-1.6 1.3-3 3-3h11l3 3.4h21c1.7 0 3 1.4 3 3V38c0 1.7-1.3 3-3 3H6c-1.7 0-3-1.3-3-3z"
        fill="url(#fB)"
        stroke="#b9780c"
        strokeWidth="1"
      />
      <path
        d="M6 19h39c1.7 0 2.8 1.6 2.4 3.2l-3.2 15c-.3 1.6-1.6 2.8-3.2 2.8H5.6C4 40 3 38.8 3 37.3V21.6C3 20.2 4.3 19 6 19z"
        fill="url(#fF)"
        stroke="#c07f0d"
        strokeWidth="1"
      />
      <path d="M6.5 21h38l-1 4.6H5.6z" fill="url(#fS)" opacity=".7" />
    </>
  );
}

export function Icon({
  kind,
  size = 48,
  ...rest
}: { kind: IconKind; size?: number } & SVGProps<SVGSVGElement>) {
  const common = { width: size, height: size, viewBox: "0 0 48 48", "aria-hidden": true, ...rest };

  switch (kind) {
    case "folder":
      return (
        <svg {...common}>
          <FolderBase />
        </svg>
      );
    case "projects":
      return (
        <svg {...common}>
          <FolderBase tint="#7fc6f5" tint2="#1f7bc0" />
          <path
            d="M18 27h12v10H18zM21 24h6v3h-6z"
            fill="rgba(255,255,255,.85)"
            stroke="#12608f"
            strokeWidth=".8"
          />
        </svg>
      );
    case "folder-open":
      return (
        <svg {...common}>
          <FolderBase tint="#ffd27a" tint2="#e2900e" />
        </svg>
      );
    case "about":
      return (
        <svg {...common}>
          <defs>
            {g("aB", "#eaf4fd", "#b9d8f0")}
            {g("aH", "#5aa7dd", "#1f6ba8")}
          </defs>
          <rect x="5" y="4" width="38" height="40" rx="4" fill="url(#aB)" stroke="#4d7ea6" />
          <circle cx="24" cy="19" r="7" fill="url(#aH)" />
          <path d="M11 41c1.5-8 6.5-11 13-11s11.5 3 13 11z" fill="url(#aH)" />
        </svg>
      );
    case "skills":
      return (
        <svg {...common}>
          <defs>
            {g("sB", "#f2f7fb", "#cfe0ee")}
            {g("sG", "#a9e07a", "#4fa317")}
          </defs>
          <rect x="4" y="6" width="40" height="36" rx="3" fill="url(#sB)" stroke="#5b7f9e" />
          <rect x="9" y="14" width="26" height="5" fill="url(#sG)" stroke="#3f8214" strokeWidth=".6" />
          <rect x="9" y="22" width="20" height="5" fill="url(#sG)" stroke="#3f8214" strokeWidth=".6" />
          <rect x="9" y="30" width="30" height="5" fill="url(#sG)" stroke="#3f8214" strokeWidth=".6" />
        </svg>
      );
    case "experience":
      return (
        <svg {...common}>
          <defs>
            {g("eB", "#d8b271", "#9c6c26")}
            {g("eT", "#f3e2c3", "#d9bd8b")}
          </defs>
          <rect x="4" y="14" width="40" height="26" rx="3" fill="url(#eB)" stroke="#7a5218" />
          <path d="M18 14v-3h12v3" fill="none" stroke="#7a5218" strokeWidth="2" />
          <rect x="4" y="22" width="40" height="6" fill="url(#eT)" opacity=".8" />
          <rect x="20" y="22" width="8" height="6" fill="#8a5f1f" />
        </svg>
      );
    case "resume":
    case "document":
      return (
        <svg {...common}>
          <defs>{g("dB", "#ffffff", "#dfe8f1")}</defs>
          <path
            d="M11 4h18l8 8v32H11z"
            fill="url(#dB)"
            stroke="#7590a8"
            strokeLinejoin="round"
          />
          <path d="M29 4v8h8" fill="#cfdcea" stroke="#7590a8" />
          <g stroke="#8fa6bb" strokeWidth="1.6">
            <path d="M16 20h16M16 25h16M16 30h11" />
          </g>
        </svg>
      );
    case "contact":
      return (
        <svg {...common}>
          <defs>
            {g("cB", "#fdfdfd", "#dbe6f1")}
            {g("cF", "#a8cdec", "#4f8fc4")}
          </defs>
          <rect x="4" y="11" width="40" height="26" rx="3" fill="url(#cB)" stroke="#5b7f9e" />
          <path d="M4.5 12.5 24 27 43.5 12.5" fill="none" stroke="#4f8fc4" strokeWidth="2" />
          <path d="M4.5 36 18 24m26 12L30 24" fill="none" stroke="url(#cF)" strokeWidth="1.6" />
        </svg>
      );
    case "recycle":
      return (
        <svg {...common}>
          <defs>
            {g("rB", "rgba(220,238,250,.95)", "rgba(150,190,225,.8)")}
          </defs>
          <path
            d="M12 14h24l-3 27c-.2 2-1.8 3-3.6 3H18.6c-1.8 0-3.4-1-3.6-3z"
            fill="url(#rB)"
            stroke="#5f88ab"
          />
          <ellipse cx="24" cy="14" rx="12" ry="3.4" fill="#cfe4f5" stroke="#5f88ab" />
          <g stroke="#3f78a8" strokeWidth="1.4" opacity=".75">
            <path d="M19 20v18M24 20v18M29 20v18" />
          </g>
          <path
            d="M24 5.5 27 9h-2.2v3h-1.6V9H21z"
            fill="#3f9c2c"
          />
        </svg>
      );
    case "browser":
      return (
        <svg {...common}>
          <defs>{g("bB", "#7fc0ea", "#1a63a0")}</defs>
          <circle cx="24" cy="24" r="19" fill="url(#bB)" stroke="#124f80" />
          <ellipse cx="24" cy="24" rx="8" ry="19" fill="none" stroke="rgba(255,255,255,.8)" />
          <path d="M5 24h38M8 15h32M8 33h32" fill="none" stroke="rgba(255,255,255,.75)" />
        </svg>
      );
    case "settings":
      return (
        <svg {...common}>
          <defs>{g("gB", "#e9f1f8", "#a9c1d6")}</defs>
          <path
            d="M24 8l3 1 2-2.6 3.6 2-.7 3.2 2.6 2.6 3.2-.7 2 3.6L37 20l1 3 3.4.8v4.4L38 29l-1 3 2.7 2.9-2 3.6-3.2-.7-2.6 2.6.7 3.2-3.6 2-2-2.6-3 1-3-1-2 2.6-3.6-2 .7-3.2-2.6-2.6-3.2.7-2-3.6L10 32l-1-3-3.4-.8v-4.4L9 23l1-3-2.7-2.9 2-3.6 3.2.7L15 11.6l-.7-3.2 3.6-2 2 2.6z"
            fill="url(#gB)"
            stroke="#5f7f9c"
          />
          <circle cx="24" cy="24" r="7" fill="#cfe0ee" stroke="#4f7290" />
        </svg>
      );
    case "star":
      return (
        <svg {...common}>
          <defs>{g("stB", "#ffe08a", "#e8a417")}</defs>
          <path
            d="M24 5l6 12.6 13.8 1.9-10 9.6 2.5 13.7L24 36.3 11.7 42.8l2.5-13.7-10-9.6L18 17.6z"
            fill="url(#stB)"
            stroke="#b47c07"
          />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <defs>{g("shB", "#9fd3f5", "#2170ad")}</defs>
          <path d="M24 4l17 6v14c0 11-7.4 17.6-17 20-9.6-2.4-17-9-17-20V10z" fill="url(#shB)" stroke="#14507f" />
          <path d="M15 24l6 6 12-13" fill="none" stroke="#fff" strokeWidth="3" />
        </svg>
      );
    case "info":
      return (
        <svg {...common}>
          <defs>{g("iB", "#8fd0f7", "#1c6ba8")}</defs>
          <circle cx="24" cy="24" r="19" fill="url(#iB)" stroke="#134e7c" />
          <path d="M24 13.5a2.6 2.6 0 110 5.2 2.6 2.6 0 010-5.2zM21.6 22h4.8v13h-4.8z" fill="#fff" />
        </svg>
      );
    case "warn":
      return (
        <svg {...common}>
          <defs>{g("wB", "#ffe07a", "#e8a10c")}</defs>
          <path d="M24 5l20 36H4z" fill="url(#wB)" stroke="#a8710a" strokeLinejoin="round" />
          <path d="M21.8 17h4.4l-.7 13h-3z M24 33.5a2.4 2.4 0 110 4.8 2.4 2.4 0 010-4.8z" fill="#4a3400" />
        </svg>
      );
    case "error":
      return (
        <svg {...common}>
          <defs>{g("erB", "#ff8d80", "#c2231a")}</defs>
          <circle cx="24" cy="24" r="19" fill="url(#erB)" stroke="#8e1710" />
          <path d="M16 16l16 16m0-16L16 32" stroke="#fff" strokeWidth="4.5" fill="none" />
        </svg>
      );
    case "success":
      return (
        <svg {...common}>
          <defs>{g("suB", "#a8e585", "#3d9b17")}</defs>
          <circle cx="24" cy="24" r="19" fill="url(#suB)" stroke="#2b7210" />
          <path d="M15 25l6.5 6.5L34 18" stroke="#fff" strokeWidth="4.5" fill="none" />
        </svg>
      );
    case "search":
      return (
        <svg {...common} viewBox="0 0 16 16">
          <circle cx="6.6" cy="6.6" r="4.4" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <path d="M10 10l4.4 4.4" stroke="currentColor" strokeWidth="1.8" fill="none" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <FolderBase />
        </svg>
      );
  }
}

/** Windows XP style flag emblem, drawn in code (original recreation, no logo file).
 * Four waving panes — red, green, blue, yellow — with the XP perspective wave. */
export function OrbEmblem({ size = 28 }: { size?: number }) {
  const h = Math.round((size * 30) / 36);
  return (
    <svg width={size} height={h} viewBox="0 0 36 30" aria-hidden="true">
      <g>
        {/* Top row: panes rise toward the right, as on the XP flag */}
        <path d="M1 4 Q9 1 17 3.5 L17 14.5 Q9 12 1 14.5 Z" fill="#f65314" />
        <path d="M18.5 3.5 Q27 1 35 4 L35 14.5 Q27 12 18.5 14.5 Z" fill="#7cbb00" />
        {/* Bottom row: panes dip toward the right */}
        <path d="M1 16 Q9 13.5 17 16 L17 27 Q9 24.5 1 27 Z" fill="#00a1f1" />
        <path d="M18.5 16 Q27 13.5 35 16 L35 27 Q27 24.5 18.5 27 Z" fill="#ffbb00" />
        {/* Gloss sweep across the flag */}
        <path d="M1 4 Q18 0 35 4 L35 8 Q18 4 1 8 Z" fill="#ffffff" opacity="0.28" />
        <path d="M6 4 Q10 12 8 27 L4 27 Q6 14 3 8 Z" fill="#ffffff" opacity="0.18" />
      </g>
    </svg>
  );
}

/** Caption glyphs */
export const CapMin = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
    <rect x="1" y="6.5" width="8" height="1.6" fill="currentColor" />
  </svg>
);
export const CapMax = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
    <rect x="1" y="1" width="8" height="7.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
    <rect x="1" y="1" width="8" height="2" fill="currentColor" />
  </svg>
);
export const CapRestore = () => (
  <svg width="11" height="11" viewBox="0 0 11 11" aria-hidden="true">
    <rect x="3" y="1" width="7" height="6" fill="none" stroke="currentColor" strokeWidth="1.3" />
    <rect x="1" y="4" width="7" height="6" fill="#fff" stroke="currentColor" strokeWidth="1.3" />
  </svg>
);
export const CapClose = () => (
  <svg width="11" height="11" viewBox="0 0 11 11" aria-hidden="true">
    <path d="M1.5 1.5l8 8m0-8l-8 8" stroke="currentColor" strokeWidth="1.8" fill="none" />
  </svg>
);

/** Mock browser screenshot used as project thumbnails / hero art (no stock photos). */
export function MockShot({
  seed = 0,
  label,
  height = 130,
  variant = "app",
}: {
  seed?: number;
  label?: string;
  height?: number;
  variant?: "app" | "chart" | "doc" | "mobile";
}) {
  const hues = [206, 192, 150, 262, 24, 340];
  const h = hues[seed % hues.length] ?? 206;
  const c1 = `hsl(${h} 72% 58%)`;
  const c2 = `hsl(${h + 18} 68% 40%)`;
  const soft = `hsl(${h} 60% 94%)`;
  return (
    <div className="w7-shot" style={{ height }}>
      <svg viewBox="0 0 320 170" width="100%" height="100%" role="img" aria-label={label ?? "Project preview"}>
        <rect width="320" height="170" fill="#fff" />
        <rect width="320" height="18" fill={soft} />
        <circle cx="10" cy="9" r="3" fill={c1} />
        <circle cx="20" cy="9" r="3" fill="#cbd5e1" />
        <circle cx="30" cy="9" r="3" fill="#cbd5e1" />
        <rect x="44" y="5" width="120" height="8" rx="4" fill="#e2e8f0" />
        {variant === "chart" ? (
          <>
            <rect x="14" y="30" width="292" height="60" rx="3" fill={soft} />
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <rect
                key={i}
                x={26 + i * 40}
                y={80 - ((i * 7 + seed * 5) % 42)}
                width="22"
                height={10 + ((i * 7 + seed * 5) % 42)}
                fill={i % 2 ? c2 : c1}
                rx="1.5"
              />
            ))}
            <rect x="14" y="102" width="140" height="52" rx="3" fill="#f1f5f9" />
            <rect x="166" y="102" width="140" height="52" rx="3" fill="#f1f5f9" />
          </>
        ) : variant === "doc" ? (
          <>
            <rect x="60" y="28" width="200" height="132" fill="#fff" stroke="#e2e8f0" />
            <rect x="76" y="44" width="120" height="10" rx="2" fill={c1} />
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <rect key={i} x="76" y={66 + i * 12} width={i % 3 === 2 ? 100 : 168} height="6" rx="2" fill="#e6ecf3" />
            ))}
          </>
        ) : variant === "mobile" ? (
          <>
            <rect x="118" y="26" width="84" height="140" rx="10" fill="#0f172a" />
            <rect x="123" y="34" width="74" height="126" rx="6" fill="#fff" />
            <rect x="131" y="44" width="46" height="8" rx="3" fill={c1} />
            <rect x="131" y="60" width="58" height="30" rx="3" fill={soft} />
            <rect x="131" y="96" width="58" height="8" rx="3" fill="#e6ecf3" />
            <rect x="131" y="110" width="44" height="8" rx="3" fill="#e6ecf3" />
            <rect x="131" y="130" width="58" height="14" rx="3" fill={c2} />
          </>
        ) : (
          <>
            <rect x="0" y="18" width="66" height="152" fill={soft} />
            {[0, 1, 2, 3, 4].map((i) => (
              <rect key={i} x="10" y={32 + i * 16} width="46" height="8" rx="3" fill={i === seed % 5 ? c1 : "#d8e2ec"} />
            ))}
            <rect x="80" y="30" width="150" height="12" rx="3" fill={c1} />
            <rect x="80" y="50" width="220" height="7" rx="3" fill="#e6ecf3" />
            <rect x="80" y="62" width="180" height="7" rx="3" fill="#e6ecf3" />
            <rect x="80" y="82" width="104" height="70" rx="3" fill={soft} />
            <rect x="196" y="82" width="104" height="70" rx="3" fill="#f1f5f9" />
            <rect x="88" y="126" width="60" height="16" rx="3" fill={c2} />
          </>
        )}
      </svg>
    </div>
  );
}
