/** Draggable / resizable Aero window frame. */
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { CapClose, CapMax, CapMin, CapRestore, Icon } from "./icons";
import { useOS, type WinState } from "./os";

const TASKBAR = 44;

export function Win7Window({ win, children }: { win: WinState; children: ReactNode }) {
  const { activeId, focus, close, minimize, toggleMax, update } = useOS();
  const active = activeId === win.id;
  const [dragging, setDragging] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);

  const startDrag = useCallback(
    (e: React.PointerEvent) => {
      if (win.max) return;
      if ((e.target as HTMLElement).closest(".w7-caption")) return;
      e.preventDefault();
      focus(win.id);
      const startX = e.clientX;
      const startY = e.clientY;
      const ox = win.x;
      const oy = win.y;
      setDragging(true);
      const move = (ev: PointerEvent) => {
        const maxX = window.innerWidth - 80;
        const maxY = window.innerHeight - TASKBAR - 24;
        update(win.id, {
          x: Math.min(Math.max(-win.w + 120, ox + ev.clientX - startX), maxX),
          y: Math.min(Math.max(0, oy + ev.clientY - startY), maxY),
        });
      };
      const up = () => {
        setDragging(false);
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
      };
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
    },
    [focus, update, win.id, win.max, win.w, win.x, win.y],
  );

  const startResize = useCallback(
    (e: React.PointerEvent, dir: "e" | "w" | "s" | "se" | "sw") => {
      if (win.max) return;
      e.preventDefault();
      e.stopPropagation();
      focus(win.id);
      const sx = e.clientX;
      const sy = e.clientY;
      const { x, y, w, h } = win;
      const move = (ev: PointerEvent) => {
        const dx = ev.clientX - sx;
        const dy = ev.clientY - sy;
        const patch: Partial<WinState> = {};
        if (dir.includes("e")) patch.w = Math.max(320, w + dx);
        if (dir.includes("s")) patch.h = Math.max(200, h + dy);
        if (dir.includes("w")) {
          const nw = Math.max(320, w - dx);
          patch.w = nw;
          patch.x = x + (w - nw);
        }
        update(win.id, patch);
        void y;
      };
      const up = () => {
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
      };
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
    },
    [focus, update, win],
  );

  // keep window inside the viewport on resize
  useEffect(() => {
    const onResize = () => {
      update(win.id, {
        x: Math.min(win.x, Math.max(8, window.innerWidth - 120)),
        y: Math.min(win.y, Math.max(8, window.innerHeight - TASKBAR - 40)),
        w: Math.min(win.w, window.innerWidth - 16),
        h: Math.min(win.h, window.innerHeight - TASKBAR - 12),
      });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [update, win.id, win.x, win.y, win.w, win.h]);

  if (win.min) return null;

  const style: React.CSSProperties = win.max
    ? { left: 0, top: 0, width: "100%", height: `calc(100% - ${TASKBAR}px)`, zIndex: win.z }
    : { left: win.x, top: win.y, width: win.w, height: win.h, zIndex: win.z };

  return (
    <div
      ref={frameRef}
      role="dialog"
      aria-label={win.title}
      aria-modal={false}
      className={[
        "w7-window",
        active ? "is-active" : "is-inactive",
        win.max ? "is-maximized" : "",
        dragging ? "is-dragging" : "",
        win.phase === "closing" ? "is-closing" : "",
        win.phase === "minimizing" ? "is-minimizing" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={style}
      onPointerDownCapture={() => focus(win.id)}
    >
      <div className="w7-title" onPointerDown={startDrag} onDoubleClick={() => toggleMax(win.id)}>
        <Icon kind={win.icon} size={16} className="w7-title-icon" />
        <div className="w7-title-text">{win.title}</div>
        <div className="w7-caption">
          <button
            type="button"
            className="w7-cap"
            title="Minimize"
            aria-label={`Minimize ${win.title}`}
            onClick={() => minimize(win.id)}
          >
            <CapMin />
          </button>
          <button
            type="button"
            className="w7-cap"
            title={win.max ? "Restore" : "Maximize"}
            aria-label={win.max ? `Restore ${win.title}` : `Maximize ${win.title}`}
            onClick={() => toggleMax(win.id)}
          >
            {win.max ? <CapRestore /> : <CapMax />}
          </button>
          <button
            type="button"
            className="w7-cap w7-cap-close"
            title="Close"
            aria-label={`Close ${win.title}`}
            onClick={() => close(win.id)}
          >
            <CapClose />
          </button>
        </div>
      </div>

      <div className="w7-body">{children}</div>

      {!win.max && (
        <>
          <div className="w7-rz w7-rz-e" onPointerDown={(e) => startResize(e, "e")} />
          <div className="w7-rz w7-rz-w" onPointerDown={(e) => startResize(e, "w")} />
          <div className="w7-rz w7-rz-s" onPointerDown={(e) => startResize(e, "s")} />
          <div className="w7-rz w7-rz-se" onPointerDown={(e) => startResize(e, "se")} />
          <div className="w7-rz w7-rz-sw" onPointerDown={(e) => startResize(e, "sw")} />
        </>
      )}
    </div>
  );
}
