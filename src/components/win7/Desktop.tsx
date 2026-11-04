/** The desktop itself: wallpaper, icons, windows, taskbar, menus, boot, balloon. */
import { useCallback, useEffect, useState } from "react";
import wallBlue from "@/assets/wall-blue.jpg";
import wallDark from "@/assets/wall-dark.jpg";
import wallNature from "@/assets/wall-nature.jpg";
import wallMinimal from "@/assets/wall-minimal.jpg";
import { Icon, OrbEmblem, type IconKind } from "./icons";
import { OSProvider, useOS, type AppKey, type IconSize, type Settings, type WinPayload } from "./os";
import { Win7Window } from "./Window";
import { Explorer } from "./Explorer";
import {
  AboutWindow,
  BrowserWindow,
  ContactWindow,
  ExperienceWindow,
  PersonalizeWindow,
  ProjectWindow,
  RecycleWindow,
  ResumeWindow,
  SkillsWindow,
  WinverWindow,
} from "./apps";
import { Taskbar } from "./Taskbar";
import { StartMenu } from "./StartMenu";
import { DesktopContextMenu } from "./ContextMenu";
import { DialogLayer } from "./Dialogs";

const wallpapers: Record<Settings["wallpaper"], string> = {
  blue: wallBlue,
  dark: wallDark,
  nature: wallNature,
  minimal: wallMinimal,
};

const ICON_METRICS: Record<IconSize, { cell: number; art: number; font: number }> = {
  small: { cell: 74, art: 34, font: 11 },
  medium: { cell: 88, art: 48, font: 12 },
  large: { cell: 110, art: 66, font: 13 },
};

interface DeskItem {
  id: string;
  label: string;
  icon: IconKind;
  app: AppKey;
  payload?: WinPayload;
}

const deskItems: DeskItem[] = [
  { id: "projects", label: "My Projects", icon: "projects", app: "projects" },
  { id: "wordpress", label: "WordPress", icon: "folder", app: "projects", payload: { category: "wordpress" } },
  { id: "about", label: "About Me", icon: "about", app: "about" },
  { id: "skills", label: "Skills", icon: "skills", app: "skills" },
  { id: "experience", label: "Experience", icon: "experience", app: "experience" },
  { id: "resume", label: "Resume", icon: "resume", app: "resume" },
  { id: "contact", label: "Contact Me", icon: "contact", app: "contact" },
  { id: "recycle", label: "Recycle Bin", icon: "recycle", app: "recycle" },
];

function WindowContent({ winId }: { winId: string }) {
  const { windows } = useOS();
  const win = windows.find((w) => w.id === winId);
  if (!win) return null;
  switch (win.app) {
    case "projects":
      return <Explorer win={win} />;
    case "project":
      return <ProjectWindow win={win} />;
    case "about":
      return <AboutWindow />;
    case "skills":
      return <SkillsWindow />;
    case "experience":
      return <ExperienceWindow />;
    case "resume":
      return <ResumeWindow win={win} />;
    case "contact":
      return <ContactWindow />;
    case "recycle":
      return <RecycleWindow />;
    case "personalize":
      return <PersonalizeWindow wallpapers={wallpapers} />;
    case "winver":
      return <WinverWindow />;
    case "browser":
      return <BrowserWindow />;
    default:
      return null;
  }
}

function BootScreen({ done }: { done: boolean }) {
  return (
    <div className={`w7-boot ${done ? "is-done" : ""}`} aria-hidden={done}>
      <div className="w7-boot-inner">
        <div className="xp-boot-logo">
          <OrbEmblem size={132} />
        </div>
        <div className="xp-boot-ms">Microsoft</div>
        <div className="w7-boot-title">Windows XP</div>
        <div className="xp-boot-edition">Muhammad Huzaifa Aqeel — Portfolio Edition</div>
        <div className="w7-boot-bar xp-progress">
          <i />
          <i />
          <i />
        </div>
      </div>
    </div>
  );
}

function DesktopInner() {
  const { windows, open, peek, settings, setSettings, showDialog, play, minimizeAll } = useOS();
  const [selected, setSelected] = useState<string | null>(null);
  const [startOpen, setStartOpen] = useState(false);
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [balloon, setBalloon] = useState(false);
  const [sortNote, setSortNote] = useState<string | null>(null);

  const metrics = ICON_METRICS[settings.iconSize];

  const openItem = useCallback(
    (item: DeskItem) => {
      open({ app: item.app, ...(item.payload ? { payload: item.payload } : {}) });
    },
    [open],
  );

  useEffect(() => {
    const t = window.setTimeout(() => setBalloon(true), 2000);
    const h = window.setTimeout(() => setBalloon(false), 11000);
    return () => {
      window.clearTimeout(t);
      window.clearTimeout(h);
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setStartOpen(false);
        setMenu(null);
      }
      const target = e.target as HTMLElement | null;
      const typing = target && /^(INPUT|TEXTAREA)$/.test(target.tagName);
      if (typing) return;
      if (e.key === "Enter" && selected) {
        const item = deskItems.find((d) => d.id === selected);
        if (item) openItem(item);
      }
      if (e.key === "Delete" && selected) {
        const item = deskItems.find((d) => d.id === selected);
        showDialog({
          title: "Delete Shortcut",
          kind: "warn",
          heading: "Windows cannot delete this item",
          message:
            item?.id === "projects"
              ? "Windows cannot delete “My Projects” because your career depends on it."
              : `“${item?.label ?? "This item"}” is required by the portfolio and cannot be removed. Nice try.`,
          buttons: [{ label: "OK", primary: true }],
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected, openItem, showDialog]);

  const refresh = () => {
    setRefreshing(true);
    play("menu");
    window.setTimeout(() => setRefreshing(false), 360);
  };

  return (
    <div
      className={`w7 w7-root ${peek ? "w7-peek" : ""}`}
      onPointerDown={(e) => {
        if ((e.target as HTMLElement).closest(".w7-window, .w7-taskbar, .w7-start, .w7-menu, .w7-flyout")) return;
        setSelected(null);
        setStartOpen(false);
      }}
      onContextMenu={(e) => {
        if ((e.target as HTMLElement).closest(".w7-window, .w7-taskbar, .w7-start")) return;
        e.preventDefault();
        setMenu({ x: e.clientX, y: e.clientY });
      }}
    >
      <div
        className={`w7-wall ${refreshing ? "w7-refresh" : ""}`}
        style={{ backgroundImage: `url(${wallpapers[settings.wallpaper]})` }}
      />

      <div
        className={`w7-icons ${refreshing ? "w7-refresh" : ""}`}
        style={
          {
            "--icon-cell": `${metrics.cell}px`,
            "--icon-art": `${metrics.art}px`,
            "--icon-font": `${metrics.font}px`,
          } as React.CSSProperties
        }
      >
        {deskItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className="w7-icon"
            aria-selected={selected === item.id}
            title={`${item.label} — double-click to open`}
            onClick={() => setSelected(item.id)}
            onDoubleClick={() => openItem(item)}
            onPointerUp={(e) => {
              if (e.pointerType !== "mouse") openItem(item);
            }}
            style={item.id === "recycle" ? { marginTop: 18 } : undefined}
          >
            <Icon kind={item.icon} size={metrics.art} className="w7-icon-art" />
            <span className="w7-icon-label">{item.label}</span>
          </button>
        ))}
      </div>

      {windows.map((w) => (
        <Win7Window key={w.id} win={w}>
          <WindowContent winId={w.id} />
        </Win7Window>
      ))}

      {balloon && windows.length === 0 && (
        <div className="w7-balloon" role="status">
          <strong style={{ color: "#14456e" }}>Welcome to my portfolio.</strong>
          <p className="w7-p" style={{ marginTop: 4 }}>
            Double-click “My Projects” to explore my work.
          </p>
        </div>
      )}

      {sortNote && (
        <div className="w7-balloon" role="status" style={{ bottom: 54 }}>
          <p className="w7-p">{sortNote}</p>
        </div>
      )}

      {menu && (
        <DesktopContextMenu
          x={menu.x}
          y={menu.y}
          iconSize={settings.iconSize}
          onClose={() => setMenu(null)}
          onIconSize={(s) => setSettings({ iconSize: s })}
          onRefresh={refresh}
          onPersonalize={() => open({ app: "personalize" })}
          onSort={(how) => {
            setSortNote(`Sorted by ${how}. My Projects stays first either way.`);
            window.setTimeout(() => setSortNote(null), 3000);
          }}
          onNew={(what) =>
            showDialog({
              title: what,
              kind: "info",
              heading: `Cannot create ${what.toLowerCase()}`,
              message:
                "This desktop is read-only — everything you can see is portfolio content. Feel free to rearrange the wallpaper and icon size instead.",
              buttons: [
                { label: "Personalize", primary: true, action: () => open({ app: "personalize" }) },
                { label: "Cancel" },
              ],
            })
          }
        />
      )}

      {startOpen && <StartMenu onClose={() => setStartOpen(false)} />}

      <Taskbar
        startOpen={startOpen}
        onToggleStart={() => {
          setStartOpen((v) => !v);
          play("menu");
        }}
      />

      <DialogLayer />
      <span style={{ display: "none" }} aria-hidden="true" onClick={minimizeAll} />
    </div>
  );
}

export function Desktop() {
  const [booting, setBooting] = useState<null | boolean>(null); // null = undecided (SSR)
  const [bootDone, setBootDone] = useState(false);

  // Boot shows on EVERY page load/reload, for the full 5 seconds.
  useEffect(() => {
    setBooting(true);
    // 5-second boot: fade-out starts at 4.58s and runs 0.42s, so the screen
    // clears at exactly 5.00s.
    const t = window.setTimeout(() => setBootDone(true), 4580);
    const t2 = window.setTimeout(() => setBooting(false), 5000);
    return () => {
      window.clearTimeout(t);
      window.clearTimeout(t2);
    };
  }, []);

  return (
    <OSProvider>
      <h1 className="sr-only" style={{ position: "absolute", left: -9999, top: -9999 }}>
        Muhammad Huzaifa Aqeel — Full-Stack Web Developer &amp; AI Agentic Developer portfolio
      </h1>
      <DesktopInner />
      {booting && <BootScreen done={bootDone} />}
    </OSProvider>
  );
}
