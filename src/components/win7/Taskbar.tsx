/** Taskbar: start orb, pinned apps, window buttons, system tray, show desktop. */
import { useEffect, useRef, useState } from "react";
import { Icon, OrbEmblem, type IconKind } from "./icons";
import { useOS, type AppKey } from "./os";

const pinned: { app: AppKey; label: string; icon: IconKind }[] = [
  { app: "projects", label: "Portfolio Explorer", icon: "projects" },
  { app: "about", label: "About", icon: "about" },
  { app: "contact", label: "Contact", icon: "contact" },
  { app: "browser", label: "Browser", icon: "browser" },
];

function useClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return now;
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function Calendar({ now }: { now: Date }) {
  const year = now.getFullYear();
  const month = now.getMonth();
  const first = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array.from({ length: (first + 6) % 7 }, () => null),
    ...Array.from({ length: days }, (_, i) => i + 1),
  ];
  return (
    <div className="w7-flyout" role="dialog" aria-label="Calendar">
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 20, fontWeight: 300, color: "#14456e" }}>
          {pad(now.getHours() % 12 || 12)}:{pad(now.getMinutes())}:{pad(now.getSeconds())}{" "}
          {now.getHours() >= 12 ? "PM" : "AM"}
        </div>
        <div style={{ fontSize: 12, color: "#3d5a73" }}>
          {now.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </div>
      </div>
      <div className="w7-cal-grid" role="grid">
        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
          <span key={`${d}${i}`} className="dow">{d}</span>
        ))}
        {cells.map((c, i) => (
          <span key={i} className={c === now.getDate() ? "today" : undefined}>{c ?? ""}</span>
        ))}
      </div>
    </div>
  );
}

export function Taskbar({
  startOpen,
  onToggleStart,
}: {
  startOpen: boolean;
  onToggleStart: () => void;
}) {
  const { windows, activeId, taskbarClick, open, minimizeAll, restoreAll, setPeek, settings, setSettings, showDialog } =
    useOS();
  const now = useClock();
  const [calOpen, setCalOpen] = useState(false);
  const desktopShown = useRef(false);

  const toggleShowDesktop = () => {
    if (desktopShown.current) restoreAll();
    else minimizeAll();
    desktopShown.current = !desktopShown.current;
    setPeek(false);
  };

  return (
    <>
      {calOpen && now && <Calendar now={now} />}
      <div className="w7-taskbar" role="toolbar" aria-label="Taskbar">
        <button
          type="button"
          className="xp-start"
          aria-label="Start"
          aria-expanded={startOpen}
          title="Start"
          onClick={onToggleStart}
        >
          <OrbEmblem size={32} />
          <span className="xp-start-text">start</span>
        </button>

        <div className="w7-tasks">
          {pinned.map((p) => {
            const win = windows.find((w) => w.app === p.app);
            return (
              <button
                key={p.app}
                type="button"
                className={`w7-task ${win ? "is-open" : ""} ${win && activeId === win.id ? "is-active" : ""}`}
                title={p.label}
                onClick={() => (win ? taskbarClick(win.id) : open({ app: p.app }))}
              >
                <Icon kind={p.icon} size={22} />
                {win && <span className="w7-task-glow" />}
              </button>
            );
          })}

          <div className="w7-tb-sep" />

          {windows
            .filter((w) => !pinned.some((p) => p.app === w.app))
            .map((w) => (
              <button
                key={w.id}
                type="button"
                className={`w7-task is-open ${activeId === w.id ? "is-active" : ""}`}
                title={w.title}
                onClick={() => taskbarClick(w.id)}
              >
                <Icon kind={w.icon} size={20} />
                <span>{w.title}</span>
                <span className="w7-task-glow" />
              </button>
            ))}
        </div>

        <div className="w7-tray">
          <button
            type="button"
            className="w7-tray-btn"
            title={settings.sound ? "Sounds on, click to mute" : "Sounds muted, click to enable"}
            aria-label={settings.sound ? "Mute interface sounds" : "Unmute interface sounds"}
            onClick={() => setSettings({ sound: !settings.sound })}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <path d="M3 6h2.5L9 3v10L5.5 10H3z" fill="currentColor" />
              {settings.sound ? (
                <path d="M11 5.5a4 4 0 010 5M12.8 3.6a6.4 6.4 0 010 8.8" fill="none" stroke="currentColor" strokeWidth="1.3" />
              ) : (
                <path d="M11 5.5l4 5m0-5l-4 5" fill="none" stroke="currentColor" strokeWidth="1.3" />
              )}
            </svg>
          </button>
          <button type="button" className="w7-tray-btn" title="Network: connected" aria-label="Network status">
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              {[0, 1, 2, 3].map((i) => (
                <rect key={i} x={1 + i * 4} y={12 - i * 3} width="2.6" height={2 + i * 3} fill="currentColor" opacity={i > 2 ? 0.45 : 1} />
              ))}
            </svg>
          </button>
          <button type="button" className="w7-tray-btn" title="Power: plugged in" aria-label="Power status">
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
              <rect x="1" y="5" width="11" height="6" rx="1" fill="none" stroke="currentColor" strokeWidth="1.2" />
              <rect x="2.5" y="6.5" width="7" height="3" fill="currentColor" />
              <rect x="12.6" y="7" width="1.8" height="2" fill="currentColor" />
            </svg>
          </button>
          <button
            type="button"
            className="w7-tray-btn"
            title="Show hidden icons"
            aria-label="Show hidden icons"
            onClick={() =>
              showDialog({
                title: "Notification Area",
                kind: "info",
                heading: "Nothing hidden here",
                message: "Two abandoned side projects and an update that has been pending since 2014. Even Huzaifa's unfinished ideas refuse to give up.",
                buttons: [{ label: "OK", primary: true }],
              })
            }
          >
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
              <path d="M2 7.5L6 3.5l4 4" fill="none" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </button>

          <button
            type="button"
            className="w7-clock"
            aria-label="Date and time"
            onClick={() => setCalOpen((v) => !v)}
          >
            <span>{now ? `${pad(now.getHours() % 12 || 12)}:${pad(now.getMinutes())} ${now.getHours() >= 12 ? "PM" : "AM"}` : "--:--"}</span>
            <span>{now ? `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()}` : ""}</span>
          </button>

          <button
            type="button"
            className="w7-showdesk"
            title="Show desktop"
            aria-label="Show desktop"
            onPointerEnter={() => setPeek(true)}
            onPointerLeave={() => setPeek(false)}
            onFocus={() => setPeek(true)}
            onBlur={() => setPeek(false)}
            onClick={toggleShowDesktop}
          />
        </div>
      </div>
    </>
  );
}
