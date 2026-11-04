/** Windows 7 style two-column start menu with working search. */
import { useMemo, useState } from "react";
import profileImg from "@/assets/profile.jpg";
import { categories, owner, searchProjects, skillGroups } from "@/data/portfolio";
import { Icon, type IconKind } from "./icons";
import { useOS, type AppKey, type WinPayload } from "./os";

interface MenuEntry {
  label: string;
  icon: IconKind;
  app: AppKey;
  payload?: WinPayload;
  strong?: boolean;
}

const leftItems: MenuEntry[] = [
  { label: "My Projects", icon: "projects", app: "projects", strong: true },
  // NOTE (Huzaifa, 2026-11-04): WordPress lives only inside My Projects.
  { label: "Recent Projects", icon: "folder-open", app: "projects", payload: { category: "web" } },
  { label: "Featured Work", icon: "star", app: "projects", payload: { featured: true } },
  { label: "Resume", icon: "resume", app: "resume" },
  { label: "Contact", icon: "contact", app: "contact" },
];

const rightItems: MenuEntry[] = [
  { label: "About Me", icon: "about", app: "about" },
  { label: "Skills", icon: "skills", app: "skills" },
  { label: "Experience", icon: "experience", app: "experience" },
  { label: "Documents", icon: "document", app: "resume" },
  { label: "Portfolio", icon: "browser", app: "browser" },
  { label: "Settings", icon: "settings", app: "personalize" },
];

export function StartMenu({ onClose }: { onClose: () => void }) {
  const { open, showDialog, play } = useOS();
  const [query, setQuery] = useState("");

  const launch = (e: MenuEntry) => {
    open({ app: e.app, ...(e.payload ? { payload: e.payload } : {}) });
    onClose();
  };

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    if (q === "winver") return { kind: "winver" as const };
    return {
      kind: "list" as const,
      projects: searchProjects(q).slice(0, 6),
      cats: categories.filter((c) => c.name.toLowerCase().includes(q)),
      skills: skillGroups
        .flatMap((g) => g.skills)
        .filter((s) => s.name.toLowerCase().includes(q))
        .slice(0, 4),
    };
  }, [query]);

  const shutDown = () => {
    play("menu");
    onClose();
    showDialog({
      title: "Turn Off Computer",
      kind: "warn",
      heading: "Leaving already?",
      message: "Before turning off, check the Contact page if you want to work together — I usually reply within one working day.",
      buttons: [
        { label: "Visit Contact Page", primary: true, action: () => open({ app: "contact" }) },
        { label: "Stay Here" },
      ],
    });
  };

  return (
    <div className="w7-start" role="menu" aria-label="Start menu" onPointerDown={(e) => e.stopPropagation()}>
      <div className="w7-start-head">
        <img className="w7-avatar" src={profileImg} alt={`Portrait of ${owner.name}`} width={48} height={48} loading="lazy" />
        <div>
          <div className="w7-start-name">{owner.name}</div>
          <div className="w7-start-role">{owner.title}</div>
        </div>
      </div>

      <div className="w7-start-cols">
        <div className="w7-start-left">
          {leftItems.map((e) => (
            <button key={e.label} type="button" role="menuitem" className={`w7-mi ${e.strong ? "w7-mi-strong" : ""}`} onClick={() => launch(e)}>
              <Icon kind={e.icon} size={24} />
              {e.label}
            </button>
          ))}
          <div style={{ flex: 1 }} />
          <button type="button" role="menuitem" className="w7-mi" onClick={() => { open({ app: "winver" }); onClose(); }}>
            <Icon kind="info" size={24} />
            About This Portfolio
          </button>
        </div>

        <div className="w7-start-right">
          {rightItems.map((e) => (
            <button key={e.label} type="button" role="menuitem" className="w7-mi" onClick={() => launch(e)}>
              <Icon kind={e.icon} size={18} />
              {e.label}
            </button>
          ))}
          <div style={{ flex: 1 }} />
          <button type="button" role="menuitem" className="w7-btn" style={{ margin: "6px 2px 2px" }} onClick={shutDown}>
            Turn Off Computer
          </button>
        </div>
      </div>

      {results && (
        <div className="w7-start-results">
          {results.kind === "winver" ? (
            <button type="button" className="w7-mi" onClick={() => { open({ app: "winver" }); onClose(); }}>
              <Icon kind="shield" size={22} /> About This Portfolio — Windows XP Edition
            </button>
          ) : (
            <>
              {results.projects.map((p) => (
                <button key={p.id} type="button" className="w7-mi" onClick={() => { open({ app: "project", title: `${p.title} — Properties`, icon: "document", payload: { projectId: p.id } }); onClose(); }}>
                  <Icon kind="document" size={20} /> {p.title}
                </button>
              ))}
              {results.cats.map((c) => (
                <button key={c.id} type="button" className="w7-mi" onClick={() => { open({ app: "projects", payload: { category: c.id } }); onClose(); }}>
                  <Icon kind="folder" size={20} /> {c.name}
                </button>
              ))}
              {results.skills.map((s) => (
                <button key={s.name} type="button" className="w7-mi" onClick={() => { open({ app: "skills" }); onClose(); }}>
                  <Icon kind="skills" size={20} /> {s.name} — {s.score.toFixed(1)}
                </button>
              ))}
              {results.projects.length + results.cats.length + results.skills.length === 0 && (
                <p className="w7-p" style={{ padding: "8px 10px" }}>No items match your search.</p>
              )}
            </>
          )}
        </div>
      )}

      <div className="w7-start-foot">
        <div className="w7-start-search">
          <label htmlFor="start-search" style={{ position: "absolute", left: -9999 }}>Search programs and files</label>
          <input
            id="start-search"
            autoFocus
            value={query}
            placeholder="Search programs and files"
            onChange={(e) => setQuery(e.target.value)}
          />
          <Icon kind="search" size={14} />
        </div>
      </div>
    </div>
  );
}
