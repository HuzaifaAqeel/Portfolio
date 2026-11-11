/** Windows Explorer style project browser with real navigation history + search. */
import { useEffect, useMemo, useRef, useState } from "react";
import {
  categories,
  categoryName,
  projects,
  projectsIn,
  searchProjects,
  type CategoryId,
  type Project,
} from "@/data/portfolio";
import { Icon, MockShot } from "./icons";
import { useOS, type WinState } from "./os";

type View = { kind: "root" } | { kind: "category"; id: CategoryId } | { kind: "featured" };

const shotVariant = (p: Project) =>
  p.category === "data" || p.category === "finance"
    ? "chart"
    : p.category === "uiux"
      ? "mobile"
      : p.category === "other"
        ? "doc"
        : "app";

export function Explorer({ win }: { win: WinState }) {
  const { open, update, showDialog } = useOS();
  const initial: View = win.payload?.featured
    ? { kind: "featured" }
    : win.payload?.category
      ? { kind: "category", id: win.payload.category }
      : { kind: "root" };
  const [history, setHistory] = useState<View[]>([initial]);
  const [index, setIndex] = useState(0);
  const [query, setQuery] = useState(win.payload?.query ?? "");
  const [selected, setSelected] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const view = history[index] ?? { kind: "root" };

  const go = (next: View) => {
    setHistory((h) => [...h.slice(0, index + 1), next]);
    setIndex((i) => i + 1);
    setSelected(null);
    setQuery("");
    contentRef.current?.scrollTo({ top: 0 });
  };

  const label =
    view.kind === "root"
      ? "My Projects"
      : view.kind === "featured"
        ? "Featured Work"
        : categoryName(view.id);

  useEffect(() => {
    update(win.id, { title: label });
  }, [label, update, win.id]);

  const searching = query.trim().length > 0;
  const results = useMemo(() => searchProjects(query), [query]);

  const shownCategories = useMemo(() => {
    if (!searching || view.kind !== "root") return view.kind === "root" ? categories : [];
    const q = query.trim().toLowerCase();
    const hitIds = new Set(results.map((r) => r.category));
    return categories.filter((c) => c.name.toLowerCase().includes(q) || hitIds.has(c.id));
  }, [searching, view, query, results]);

  const shownProjects: Project[] = searching
    ? results
    : view.kind === "category"
      ? projectsIn(view.id)
      : view.kind === "featured"
        ? projects.filter((p) => p.featured)
        : [];

  const openProject = (p: Project) =>
    open({ app: "project", title: `${p.title} - Properties`, icon: "document", payload: { projectId: p.id } });

  const itemProps = (id: string, onOpen: () => void) => ({
    "aria-selected": selected === id,
    tabIndex: 0,
    onClick: () => setSelected(id),
    onDoubleClick: onOpen,
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "Enter") onOpen();
    },
    onPointerUp: (e: React.PointerEvent) => {
      if (e.pointerType !== "mouse") onOpen();
    },
  });

  const crumbs: { label: string; onClick?: () => void }[] = [
    { label: "Portfolio", onClick: () => go({ kind: "root" }) },
    { label: view.kind === "root" ? "My Projects" : "My Projects", onClick: () => go({ kind: "root" }) },
  ];
  if (view.kind !== "root") crumbs.push({ label });

  return (
    <>
      <div className="w7-nav">
        <button
          type="button"
          className="w7-navbtn"
          title="Back"
          aria-label="Back"
          disabled={index === 0}
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
            <path d="M7.5 2L3.5 6l4 4" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>
        <button
          type="button"
          className="w7-navbtn"
          title="Forward"
          aria-label="Forward"
          disabled={index >= history.length - 1}
          onClick={() => setIndex((i) => Math.min(history.length - 1, i + 1))}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
            <path d="M4.5 2l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>

        <div className="w7-address">
          <Icon kind="folder" size={14} />
          {crumbs.map((c, i) => (
            <span key={`${c.label}-${i}`} style={{ display: "inline-flex", alignItems: "center" }}>
              {i > 0 && <span className="w7-crumb-sep">›</span>}
              {c.onClick ? (
                <button type="button" className="w7-crumb" onClick={c.onClick}>
                  {c.label}
                </button>
              ) : (
                <span className="w7-crumb" style={{ fontWeight: 600 }}>
                  {c.label}
                </span>
              )}
            </span>
          ))}
        </div>

        <div className="w7-search">
          <label className="sr-only" htmlFor={`search-${win.id}`} style={{ position: "absolute", left: -9999 }}>
            Search My Projects
          </label>
          <input
            id={`search-${win.id}`}
            value={query}
            placeholder="Search My Projects"
            onChange={(e) => setQuery(e.target.value)}
          />
          <Icon kind="search" size={14} />
        </div>
      </div>

      <div className="w7-explorer-main">
        <nav className="w7-sidebar" aria-label="Folders">
          <h4>Favourites</h4>
          <button type="button" className="w7-sidelink" onClick={() => go({ kind: "featured" })} aria-current={view.kind === "featured"}>
            <Icon kind="star" size={16} /> Featured Work
          </button>
          <button type="button" className="w7-sidelink" onClick={() => go({ kind: "root" })} aria-current={view.kind === "root"}>
            <Icon kind="projects" size={16} /> My Projects
          </button>
          <h4>Categories</h4>
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              className="w7-sidelink"
              aria-current={view.kind === "category" && view.id === c.id}
              onClick={() => go({ kind: "category", id: c.id })}
            >
              <Icon kind="folder" size={16} /> {c.name}
            </button>
          ))}
        </nav>

        <div className="w7-content" ref={contentRef}>
          {searching && (
            <div style={{ padding: "8px 12px 0", color: "#4a5a6a" }}>
              Search results for “{query}” - {results.length} item{results.length === 1 ? "" : "s"}
            </div>
          )}
          <div className="w7-grid">
            {shownCategories.map((c) => (
              <button
                key={c.id}
                type="button"
                className="w7-item"
                title={c.blurb}
                {...itemProps(c.id, () => go({ kind: "category", id: c.id }))}
                onContextMenu={(e) => {
                  e.preventDefault();
                  showDialog({
                    title: "Delete Folder",
                    kind: "warn",
                    heading: "Windows cannot delete this folder",
                    message:
                      "Windows cannot delete “" + c.name + "” because your career depends on it. This folder was built project by project. Deleting it would be like deleting the journey, and the journey is the whole point.",
                    buttons: [{ label: "OK", primary: true }],
                  });
                }}
              >
                <Icon kind="folder" size={46} />
                <span className="w7-item-label">{c.name}</span>
                <span className="w7-item-sub">{projectsIn(c.id).length} items</span>
              </button>
            ))}

            {shownProjects.map((p, i) => (
              <button
                key={p.id}
                type="button"
                className="w7-item"
                style={{ width: 158 }}
                title={p.tagline}
                {...itemProps(p.id, () => openProject(p))}
              >
                {p.previewOnly && p.thumbImage ? (
                  <img
                    src={p.thumbImage}
                    alt={`Hero preview of ${p.title}`}
                    loading="lazy"
                    style={{ width: "100%", height: 86, objectFit: "cover", objectPosition: "top center", border: "1px solid #b9cede", borderRadius: 2 }}
                  />
                ) : p.previewOnly && p.previewUrl ? (
                  // No captured hero available (e.g. Club X): show the live
                  // site itself, scaled down to the tile, hero at the top.
                  <span style={{ display: "block", width: "100%", height: 86, overflow: "hidden", border: "1px solid #b9cede", borderRadius: 2, background: "#fff" }}>
                    <iframe
                      src={p.previewUrl}
                      title={`Hero preview of ${p.title}`}
                      tabIndex={-1}
                      loading="lazy"
                      style={{ display: "block", width: 1200, height: 800, border: 0, transform: "scale(0.132)", transformOrigin: "top left", pointerEvents: "none" }}
                    />
                  </span>
                ) : (
                  <MockShot seed={i + p.title.length} height={86} variant={shotVariant(p)} label={p.title} />
                )}
                <span className="w7-item-label">{p.title}</span>
                {!p.previewOnly && (
                  <span className="w7-item-sub">
                    {categoryName(p.category)} · {p.year}
                  </span>
                )}
              </button>
            ))}

            {!searching && view.kind !== "root" && shownProjects.length === 0 && (
              <p className="w7-p" style={{ padding: 10 }}>
                This folder is empty.
              </p>
            )}
            {searching && results.length === 0 && shownCategories.length === 0 && (
              <p className="w7-p" style={{ padding: 10 }}>
                No items match your search. Try “AI”, “Web”, “Finance”, “React” or “Accounting”.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="w7-status">
        <span>
          {shownCategories.length + shownProjects.length} item
          {shownCategories.length + shownProjects.length === 1 ? "" : "s"}
        </span>
        <span>{selected ? "1 item selected" : "Double-click to open"}</span>
      </div>
    </>
  );
}
