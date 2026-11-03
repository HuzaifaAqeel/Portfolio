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
    const away = () => onClose();
    window.addEventListener("pointerdown", away);
    return () => window.removeEventListener("pointerdown", away);
  }, [onClose]);

  const item = (
    label: string,
    onClick?: () => void,
    opts?: { submenu?: "view" | "sort" | "new"; checked?: boolean },
  ) => (
    <button
      key={label}
      type="button"
      role="menuitem"
      className="w7-menu-item"
      data-open={sub === opts?.submenu}
      onPointerEnter={() => setSub(opts?.submenu ?? null)}
      onClick={() => {
        if (opts?.submenu) return;
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

  const submenuStyle: React.CSSProperties = { left: "100%", top: -3, position: "absolute" };

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
          <div className="w7-menu" role="menu" style={submenuStyle}>
            {(["large", "medium", "small"] as IconSize[]).map((s) =>
              item(`${s[0]?.toUpperCase()}${s.slice(1)} icons`, () => props.onIconSize(s), { checked: props.iconSize === s }),
            )}
          </div>
        )}
      </div>

      <div style={{ position: "relative" }} onPointerLeave={() => setSub(null)}>
        {item("Sort By", undefined, { submenu: "sort" })}
        {sub === "sort" && (
          <div className="w7-menu" role="menu" style={submenuStyle}>
            {["Name", "Date modified", "Item type", "Career importance"].map((s) => item(s, () => props.onSort(s)))}
          </div>
        )}
      </div>

      {item("Refresh", props.onRefresh)}
      <div className="w7-menu-sep" />

      <div style={{ position: "relative" }} onPointerLeave={() => setSub(null)}>
        {item("New", undefined, { submenu: "new" })}
        {sub === "new" && (
          <div className="w7-menu" role="menu" style={submenuStyle}>
            {["New Folder", "Text Document", "Project Shortcut"].map((s) => item(s, () => props.onNew(s)))}
          </div>
        )}
      </div>

      <div className="w7-menu-sep" />
      {item("Personalize", props.onPersonalize)}
    </div>
  );
}
