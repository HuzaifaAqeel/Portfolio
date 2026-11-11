/** Desktop right-click menu with submenus. */
import { useEffect, useRef, useState } from "react";
import type { IconSize } from "./os";

export interface DesktopMenuProps {
  x: number;
  y: number;
  iconSize: IconSize;
  onClose: () => void;
  onIconSize: (s: IconSize) => void;
  onRefresh: () => void;
  onPersonalize: () => void;
  onNew: (what: string) => void;
  onSort: (how: string) => void;
}

function Arrow() {
  return (
    <svg className="w7-menu-arrow" width="8" height="8" viewBox="0 0 8 8" aria-hidden="true">
      <path d="M2 1l4 3-4 3" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function DesktopContextMenu(props: DesktopMenuProps) {
  const { x, y, onClose } = props;
  const [sub, setSub] = useState<null | "view" | "sort" | "new">(null);
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x, y });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({
      x: Math.min(x, window.innerWidth - r.width - 8),
      y: Math.min(y, window.innerHeight - r.height - 50),
    });
  }, [x, y]);

  useEffect(() => {
    // Close only on a pointer press OUTSIDE any menu - never on a press
    // inside the main menu or its submenu (stopPropagation alone was not
    // reliable here, so check the actual target).
    const away = (e: PointerEvent) => {
      if ((e.target as HTMLElement | null)?.closest?.(".w7-menu")) return;
      onClose();
    };
    window.addEventListener("pointerdown", away);
    return () => window.removeEventListener("pointerdown", away);
  }, [onClose]);

  const item = (
    label: string,
    onClick?: () => void,
    opts?: { submenu?: "view" | "sort" | "new"; checked?: boolean; inSubmenu?: boolean },
  ) => (
    <button
      key={label}
      type="button"
      role="menuitem"
      className="w7-menu-item"
      data-open={sub === opts?.submenu}
      onPointerEnter={() => {
        // BUG FIX: submenu items used to reset the open submenu to null on
        // hover, so the submenu vanished the instant the pointer touched
        // it and no click could ever land. Items inside an open submenu
        // must leave the submenu state untouched.
        if (opts?.inSubmenu) return;
        setSub(opts?.submenu ?? null);
      }}
      onClick={() => {
        // Parent items are clickable too: clicking View / Sort By / New
        // toggles its submenu open (hover alone is not the only way in).
        if (opts?.submenu) {
          setSub((prev) => (prev === opts.submenu ? null : opts.submenu));
          return;
        }
        onClick?.();
        onClose();
      }}
    >
      {opts?.checked && (
        <svg className="w7-menu-check" width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
          <path d="M1 5l3 3 5-6" fill="none" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      )}
      {label}
      {opts?.submenu && <Arrow />}
    </button>
  );

  // Near the right screen edge, open submenus to the LEFT so they stay
  // on screen and clickable instead of overflowing off-screen.
  const flip = pos.x > window.innerWidth - 430;
  const submenuStyle: React.CSSProperties = flip
    ? { right: "100%", top: -3, position: "absolute" }
    : { left: "100%", top: -3, position: "absolute" };

  return (
    <div
      ref={ref}
      className="w7-menu"
      role="menu"
      aria-label="Desktop"
      style={{ left: pos.x, top: pos.y }}
      onPointerDown={(e) => e.stopPropagation()}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div style={{ position: "relative" }} onPointerLeave={() => setSub(null)}>
        {item("View", undefined, { submenu: "view" })}
        {sub === "view" && (
          <div className="w7-menu" role="menu" style={submenuStyle} onPointerEnter={() => setSub("view")}>
            {(["large", "medium", "small"] as IconSize[]).map((s) =>
              item(`${s[0]?.toUpperCase()}${s.slice(1)} icons`, () => props.onIconSize(s), { checked: props.iconSize === s, inSubmenu: true }),
            )}
          </div>
        )}
      </div>

      <div style={{ position: "relative" }} onPointerLeave={() => setSub(null)}>
        {item("Sort By", undefined, { submenu: "sort" })}
        {sub === "sort" && (
          <div className="w7-menu" role="menu" style={submenuStyle} onPointerEnter={() => setSub("sort")}>
            {["Name", "Date modified", "Item type", "Career importance"].map((s) => item(s, () => props.onSort(s), { inSubmenu: true }))}
          </div>
        )}
      </div>

      {item("Refresh", props.onRefresh)}
      <div className="w7-menu-sep" />

      <div style={{ position: "relative" }} onPointerLeave={() => setSub(null)}>
        {item("New", undefined, { submenu: "new" })}
        {sub === "new" && (
          <div className="w7-menu" role="menu" style={submenuStyle} onPointerEnter={() => setSub("new")}>
            {["New Folder", "Text Document", "Project Shortcut"].map((s) => item(s, () => props.onNew(s), { inSubmenu: true }))}
          </div>
        )}
      </div>

      <div className="w7-menu-sep" />
      {item("Personalize", props.onPersonalize)}
    </div>
  );
}
