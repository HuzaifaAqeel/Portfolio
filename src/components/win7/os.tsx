/** Window manager + desktop settings + dialog service for the Win7 desktop. */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { IconKind } from "./icons";
import type { CategoryId } from "@/data/portfolio";

export type AppKey =
  | "projects"
  | "project"
  | "about"
  | "skills"
  | "experience"
  | "resume"
  | "contact"
  | "recycle"
  | "personalize"
  | "winver"
  | "disclaimer"
  | "browser";

export interface WinPayload {
  projectId?: string | undefined;
  category?: CategoryId | undefined;
  query?: string | undefined;
  featured?: boolean | undefined;
  section?: string | undefined;
}

export interface WinState {
  id: string;
  app: AppKey;
  title: string;
  icon: IconKind;
  x: number;
  y: number;
  w: number;
  h: number;
  min: boolean;
  max: boolean;
  z: number;
  payload?: WinPayload | undefined;
  phase?: "open" | "closing" | "minimizing" | undefined;
}

export interface DialogButton {
  label: string;
  action?: (() => void) | undefined;
  primary?: boolean | undefined;
}

export interface DialogState {
  id: string;
  title: string;
  kind: "info" | "warn" | "error" | "success";
  heading?: string | undefined;
  message: string;
  buttons: DialogButton[];
}

export type WallpaperId = "blue" | "dark" | "nature" | "minimal";
export type IconSize = "small" | "medium" | "large";

export interface Settings {
  wallpaper: WallpaperId;
  iconSize: IconSize;
  sound: boolean;
}

interface OpenSpec {
  app: AppKey;
  title?: string | undefined;
  icon?: IconKind | undefined;
  payload?: WinPayload | undefined;
  w?: number | undefined;
  h?: number | undefined;
}

interface OSValue {
  windows: WinState[];
  activeId: string | null;
  open: (spec: OpenSpec) => void;
  close: (id: string) => void;
  minimize: (id: string) => void;
  toggleMax: (id: string) => void;
  focus: (id: string) => void;
  taskbarClick: (id: string) => void;
  update: (id: string, patch: Partial<WinState>) => void;
  minimizeAll: () => void;
  restoreAll: () => void;
  peek: boolean;
  setPeek: (v: boolean) => void;
  dialogs: DialogState[];
  showDialog: (d: Omit<DialogState, "id"> & { id?: string }) => void;
  closeDialog: (id: string) => void;
  settings: Settings;
  setSettings: (patch: Partial<Settings>) => void;
  play: (kind: "open" | "close" | "menu" | "error" | "ok") => void;
}

const OSContext = createContext<OSValue | null>(null);

const APP_DEFAULTS: Record<AppKey, { title: string; icon: IconKind; w: number; h: number }> = {
  projects: { title: "My Projects", icon: "projects", w: 860, h: 560 },
  project: { title: "Project", icon: "document", w: 800, h: 600 },
  about: { title: "About Me", icon: "about", w: 720, h: 520 },
  skills: { title: "Skills - Performance Information", icon: "skills", w: 700, h: 540 },
  experience: { title: "Experience", icon: "experience", w: 760, h: 520 },
  resume: { title: "Resume.pdf - Document Viewer", icon: "resume", w: 700, h: 600 },
  contact: { title: "Contact Me - Message", icon: "contact", w: 660, h: 560 },
  recycle: { title: "Recycle Bin", icon: "recycle", w: 660, h: 440 },
  personalize: { title: "Personalization - Control Panel", icon: "settings", w: 720, h: 500 },
  winver: { title: "About This Portfolio", icon: "info", w: 470, h: 330 },
  disclaimer: { title: "Disclaimer", icon: "info", w: 520, h: 430 },
  browser: { title: "Portfolio Browser", icon: "browser", w: 780, h: 560 },
};

const STORAGE_KEY = "w7-settings";
let seq = 0;

export function OSProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<WinState[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [dialogs, setDialogs] = useState<DialogState[]>([]);
  const [peek, setPeek] = useState(false);
  const [settings, setSettingsState] = useState<Settings>({
    wallpaper: "blue",
    iconSize: "medium",
    sound: false,
  });
  const lastMinimizedAll = useRef<string[]>([]);
  const zRef = useRef(10);
  const audioRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSettingsState((s) => ({ ...s, ...(JSON.parse(raw) as Partial<Settings>) }));
    } catch {
      /* ignore */
    }
  }, []);

  const setSettings = useCallback((patch: Partial<Settings>) => {
    setSettingsState((prev) => {
      const next = { ...prev, ...patch };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const play = useCallback(
    (kind: "open" | "close" | "menu" | "error" | "ok") => {
      if (!settings.sound || typeof window === "undefined") return;
      try {
        const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (!Ctx) return;
        audioRef.current ??= new Ctx();
        const ctx = audioRef.current;
        const now = ctx.currentTime;
        const notes: Record<string, number[]> = {
          open: [660, 880],
          close: [520, 380],
          menu: [780],
          error: [220, 180],
          ok: [720, 960, 1180],
        };
        (notes[kind] ?? [660]).forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "sine";
          osc.frequency.value = freq;
          gain.gain.setValueAtTime(0.0001, now + i * 0.06);
          gain.gain.exponentialRampToValueAtTime(0.045, now + i * 0.06 + 0.01);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.06 + 0.14);
          osc.connect(gain).connect(ctx.destination);
          osc.start(now + i * 0.06);
          osc.stop(now + i * 0.06 + 0.16);
        });
      } catch {
        /* audio is optional */
      }
    },
    [settings.sound],
  );

  const focus = useCallback((id: string) => {
    zRef.current += 1;
    const z = zRef.current;
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, z, min: false } : w)));
    setActiveId(id);
  }, []);

  const open = useCallback(
    (spec: OpenSpec) => {
      const def = APP_DEFAULTS[spec.app];
      const dedupeKey =
        spec.app === "project" ? `project:${spec.payload?.projectId}` : `app:${spec.app}`;
      let existing: WinState | undefined;
      setWindows((ws) => {
        existing = ws.find((w) =>
          w.app === "project"
            ? `project:${w.payload?.projectId}` === dedupeKey
            : `app:${w.app}` === dedupeKey,
        );
        if (existing) return ws;

        const vw = typeof window !== "undefined" ? window.innerWidth : 1280;
        const vh = typeof window !== "undefined" ? window.innerHeight : 800;
        const mobile = vw < 860;
        const w = Math.min(spec.w ?? def.w, vw - 24);
        const h = Math.min(spec.h ?? def.h, vh - 70);
        const offset = (ws.length % 6) * 26;
        zRef.current += 1;
        const win: WinState = {
          id: `win-${++seq}`,
          app: spec.app,
          title: spec.title ?? def.title,
          icon: spec.icon ?? def.icon,
          x: Math.max(8, Math.round((vw - w) / 2) - 60 + offset),
          y: Math.max(8, Math.round((vh - 44 - h) / 2) - 30 + offset),
          w,
          h,
          min: false,
          max: mobile,
          z: zRef.current,
          payload: spec.payload,
          phase: "open",
        };
        setActiveId(win.id);
        return [...ws, win];
      });
      if (existing) focus(existing.id);
      else play("open");
    },
    [focus, play],
  );

  const close = useCallback(
    (id: string) => {
      play("close");
      setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, phase: "closing" } : w)));
      window.setTimeout(() => {
        setWindows((ws) => ws.filter((w) => w.id !== id));
        setActiveId((cur) => (cur === id ? null : cur));
      }, 130);
    },
    [play],
  );

  const minimize = useCallback((id: string) => {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, phase: "minimizing" } : w)));
    window.setTimeout(() => {
      setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, min: true, phase: "open" } : w)));
      setActiveId((cur) => (cur === id ? null : cur));
    }, 160);
  }, []);

  const toggleMax = useCallback((id: string) => {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, max: !w.max } : w)));
  }, []);

  const update = useCallback((id: string, patch: Partial<WinState>) => {
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, ...patch } : w)));
  }, []);

  const taskbarClick = useCallback(
    (id: string) => {
      const win = windows.find((w) => w.id === id);
      if (!win) return;
      if (win.min) focus(id);
      else if (activeId === id) minimize(id);
      else focus(id);
    },
    [windows, activeId, focus, minimize],
  );

  const minimizeAll = useCallback(() => {
    setWindows((ws) => {
      lastMinimizedAll.current = ws.filter((w) => !w.min).map((w) => w.id);
      return ws.map((w) => ({ ...w, min: true }));
    });
    setActiveId(null);
  }, []);

  const restoreAll = useCallback(() => {
    const ids = lastMinimizedAll.current;
    setWindows((ws) => ws.map((w) => (ids.includes(w.id) ? { ...w, min: false } : w)));
  }, []);

  const showDialog = useCallback((d: Omit<DialogState, "id"> & { id?: string }) => {
    const id = d.id ?? `dlg-${++seq}`;
    setDialogs((ds) => [...ds, { ...d, id }]);
  }, []);

  const closeDialog = useCallback((id: string) => {
    setDialogs((ds) => ds.filter((d) => d.id !== id));
  }, []);

  const value = useMemo<OSValue>(
    () => ({
      windows,
      activeId,
      open,
      close,
      minimize,
      toggleMax,
      focus,
      taskbarClick,
      update,
      minimizeAll,
      restoreAll,
      peek,
      setPeek,
      dialogs,
      showDialog,
      closeDialog,
      settings,
      setSettings,
      play,
    }),
    [
      windows,
      activeId,
      open,
      close,
      minimize,
      toggleMax,
      focus,
      taskbarClick,
      update,
      minimizeAll,
      restoreAll,
      peek,
      dialogs,
      showDialog,
      closeDialog,
      settings,
      setSettings,
      play,
    ],
  );

  return <OSContext.Provider value={value}>{children}</OSContext.Provider>;
}

export function useOS(): OSValue {
  const ctx = useContext(OSContext);
  if (!ctx) throw new Error("useOS must be used inside OSProvider");
  return ctx;
}
