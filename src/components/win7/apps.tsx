/** Portfolio "applications" that live inside XP windows. */
import { useEffect, useMemo, useState } from "react";
import profileImg from "@/assets/profile.jpg";
import xpLogo from "@/assets/xp-logo.png";
import {
  categories,
  categoryName,
  education,
  experience,
  interests,
  owner,
  projects,
  recycleBin,
  skillGroups,
  type Project,
} from "@/data/portfolio";
import { Icon, MockShot } from "./icons";
import { useOS, type Settings, type WinState } from "./os";

/* ------------------------------- Project ------------------------------- */

/** Real preview for a project window.
 * - If the project has a verified live site, embed that site itself in an
 *   iframe — the actual website, not a mock image.
 * - Otherwise (code-only projects: agents, RAG labs, eval harnesses), show
 *   the project's real README fetched from GitHub — its actual content —
 *   with a note that it has no public live site. Never a fake screenshot.
 * GitHub pages block framing, so they are never iframed; the README fetch
 * uses raw.githubusercontent.com, which serves the file directly. */
function ProjectPreview({ project }: { project: Project }) {
  const [frameKey, setFrameKey] = useState(0);
  const [readme, setReadme] = useState<string | null>(null);
  const [readmeState, setReadmeState] = useState<"idle" | "loading" | "done" | "failed">("idle");

  const repo = project.githubUrl?.replace(/\/$/, "").split("/").pop() ?? "";

  useEffect(() => {
    if (project.previewUrl || !repo) return;
    let cancelled = false;
    setReadmeState("loading");
    (async () => {
      for (const branch of ["main", "master"]) {
        try {
          const res = await fetch(`https://raw.githubusercontent.com/HuzaifaAqeel/${repo}/${branch}/README.md`);
          if (!res.ok) continue;
          const text = await res.text();
          if (!cancelled) {
            setReadme(text.slice(0, 6000));
            setReadmeState("done");
          }
          return;
        } catch {
          /* try the next branch, then fail below */
        }
      }
      if (!cancelled) setReadmeState("failed");
    })();
    return () => {
      cancelled = true;
    };
  }, [project.previewUrl, repo]);

  // 90% zoom (Huzaifa, 2026-11-11): the preview is shown inside a fixed-height
  // wrapper with the content scaled to 0.9 and sized 1/0.9, so it fills the
  // wrapper exactly at 90% zoom instead of leaving a blank margin.
  const isWP = project.category === "wordpress";

  if (project.previewImage) {
    return (
      <section>
        {!isWP && <h2 className="w7-h2">Preview — the actual website</h2>}
        <div className="w7-preview">
          <div className="w7-preview-bar">
            <span className="w7-preview-url" title={project.liveUrl}>{project.liveUrl}</span>
            <button type="button" className="w7-btn w7-btn-default" onClick={() => window.open(project.liveUrl!, "_blank", "noopener,noreferrer")}>
              Open live site
            </button>
          </div>
          <div className="w7-preview-zoom">
            <img src={project.previewImage} alt={`Homepage of ${project.title}`} className="w7-preview-zoomed" style={{ objectFit: "cover" }} />
          </div>
          {!isWP && (
            <p className="w7-p" style={{ fontSize: 11, color: "#6b7c8c", marginTop: 6 }}>
              This site blocks embedding, so here is a captured view of its real homepage instead of a
              blank frame — use “Open live site” to browse it in full.
            </p>
          )}
        </div>
      </section>
    );
  }

  if (project.previewUrl) {
    return (
      <section>
        {!isWP && <h2 className="w7-h2">Live preview — the actual website</h2>}
        <div className="w7-preview">
          <div className="w7-preview-bar">
            <span className="w7-preview-url" title={project.previewUrl}>{project.previewUrl}</span>
            <button type="button" className="w7-btn" onClick={() => setFrameKey((k) => k + 1)}>Reload preview</button>
            <button type="button" className="w7-btn w7-btn-default" onClick={() => window.open(project.previewUrl!, "_blank", "noopener,noreferrer")}>
              Open live site
            </button>
          </div>
          <div className="w7-preview-zoom">
            <iframe
              key={frameKey}
              src={project.previewUrl}
              title={`Live preview of ${project.title}`}
              className="w7-preview-zoomed"
              loading="lazy"
            />
          </div>
          {!isWP && (
            <p className="w7-p" style={{ fontSize: 11, color: "#6b7c8c", marginTop: 6 }}>
              If this frame is blank, the site is blocking embedding — use “Open live site” to see it in full.
            </p>
          )}
        </div>
      </section>
    );
  }

  if (!repo) {
    return (
      <section>
        <h2 className="w7-h2">Preview</h2>
        <p className="w7-p" style={{ fontSize: 12, color: "#6b7c8c" }}>
          This is a collection of client work rather than a single public site, so there is no single
          live preview to embed here — the work, tools and results are described below, with no mock
          screenshot.
        </p>
      </section>
    );
  }

  return (
    <section>
      <h2 className="w7-h2">Preview — actual project README</h2>
      <p className="w7-p" style={{ fontSize: 12, color: "#6b7c8c" }}>
        This project has no public live website, so instead of a mock screenshot here is its real README
        from GitHub{repo ? ` (${repo})` : ""}.
      </p>
      <div className="w7-readme">
        {readmeState === "loading" && <p className="w7-p">Loading README…</p>}
        {readmeState === "done" && readme && <pre>{readme}</pre>}
        {readmeState === "failed" && (
          <p className="w7-p">
            The README could not be loaded here — open the GitHub link below to read the real project.
          </p>
        )}
      </div>
    </section>
  );
}

export function ProjectWindow({ win }: { win: WinState }) {
  const project = projects.find((p) => p.id === win.payload?.projectId);
  if (!project) return <div className="w7-pane">This project could not be found.</div>;

  const openReal = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // WordPress folder sites (Huzaifa, 2026-11-11): the window shows ONLY the
  // preview — no category/title/tagline header above it and no role, tools,
  // features, result or buttons below it.
  if (project.category === "wordpress") {
    return (
      <div className="w7-pane" style={{ padding: 0 }}>
        <ProjectPreview project={project} />
      </div>
    );
  }

  return (
    <div className="w7-pane">
      <p className="w7-h3">{categoryName(project.category)} · {project.year}</p>
      <h1 className="w7-h1" style={{ marginBottom: 4 }}>{project.title}</h1>
      <p className="w7-p" style={{ fontSize: 14, color: "#2c5b86", marginBottom: 14 }}>{project.tagline}</p>

      <ProjectPreview project={project} />

      <p className="w7-p" style={{ marginTop: 14 }}>{project.description}</p>

      <div className="w7-sep" />

      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
        <section className="w7-band">
          <h2 className="w7-h2">Problem</h2>
          <p className="w7-p">{project.problem}</p>
        </section>
        <section className="w7-band">
          <h2 className="w7-h2">Solution</h2>
          <p className="w7-p">{project.solution}</p>
        </section>
      </div>

      <div className="w7-sep" />

      <section>
        <h2 className="w7-h2">My role</h2>
        <p className="w7-p">{project.role}</p>
      </section>

      <section style={{ marginTop: 14 }}>
        <h2 className="w7-h2">Tools & technologies</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 6 }}>
          {project.technologies.map((t) => (
            <span key={t} className="w7-tag">{t}</span>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 14 }}>
        <h2 className="w7-h2">Key features</h2>
        <ul className="w7-p" style={{ paddingLeft: 18, listStyle: "square" }}>
          {project.features.map((f) => (
            <li key={f} style={{ marginTop: 3 }}>{f}</li>
          ))}
        </ul>
      </section>

      <section className="w7-band" style={{ marginTop: 14 }}>
        <h2 className="w7-h2">Result</h2>
        <p className="w7-p">{project.result}</p>
      </section>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 20 }}>
        {project.liveUrl && (
          <button type="button" className="w7-btn w7-btn-default" onClick={() => openReal(project.liveUrl!)}>
            View Live Project
          </button>
        )}
        {project.caseStudyUrl && (
          <button type="button" className="w7-btn" onClick={() => openReal(project.caseStudyUrl!)}>
            View Case Study
          </button>
        )}
        {project.githubUrl && (
          <button type="button" className="w7-btn" onClick={() => openReal(project.githubUrl!)}>
            GitHub / Source Code
          </button>
        )}
      </div>
    </div>
  );
}

/* -------------------------------- About -------------------------------- */

const aboutTabs = ["Overview", "Career", "Education", "Interests"] as const;

export function AboutWindow() {
  const [tab, setTab] = useState<(typeof aboutTabs)[number]>("Overview");
  return (
    <div className="w7-explorer-main">
      <nav className="w7-sidebar" aria-label="About sections">
        <h4>About Me</h4>
        {aboutTabs.map((t) => (
          <button key={t} type="button" className="w7-sidelink" aria-current={tab === t} onClick={() => setTab(t)}>
            <Icon kind="about" size={16} /> {t}
          </button>
        ))}
      </nav>
      <div className="w7-pane">
        {tab === "Overview" && (
          <>
            <div style={{ display: "flex", gap: 16, alignItems: "flex-start", flexWrap: "wrap" }}>
              <img
                src={profileImg}
                alt={`Portrait of ${owner.name}`}
                width={110}
                height={110}
                loading="lazy"
                style={{ width: 110, height: 110, objectFit: "cover", border: "1px solid #b9cede", borderRadius: 3, boxShadow: "0 2px 6px rgba(10,40,70,.2)" }}
              />
              <div style={{ minWidth: 220, flex: 1 }}>
                <h1 className="w7-h1">{owner.name}</h1>
                <p className="w7-p" style={{ color: "#2c5b86", fontSize: 14 }}>{owner.title}</p>
                <p className="w7-p" style={{ marginTop: 8 }}>{owner.intro}</p>
              </div>
            </div>
            <div className="w7-sep" />
            <dl style={{ display: "grid", gridTemplateColumns: "130px 1fr", rowGap: 7, columnGap: 12 }}>
              <dt className="w7-h3">Location</dt>
              <dd className="w7-p">{owner.location}</dd>
              <dt className="w7-h3">Experience</dt>
              <dd className="w7-p">{owner.experience}</dd>
              <dt className="w7-h3">Email</dt>
              <dd className="w7-p">{owner.email}</dd>
            </dl>
            <div className="w7-sep" />
            <h2 className="w7-h2">Specializations</h2>
            <ul className="w7-p" style={{ paddingLeft: 18, listStyle: "square" }}>
              {owner.specializations.map((s) => (
                <li key={s} style={{ marginTop: 3 }}>{s}</li>
              ))}
            </ul>
          </>
        )}
        {tab === "Career" && (
          <>
            <h1 className="w7-h1">Career</h1>
            <p className="w7-p" style={{ marginTop: 8 }}>{owner.bio}</p>
            <div className="w7-sep" />
            {experience.map((j) => (
              <div key={j.company} className="w7-band" style={{ marginBottom: 10 }}>
                <h2 className="w7-h2">{j.role} — {j.company}</h2>
                <p className="w7-h3">{j.duration}</p>
                <p className="w7-p" style={{ marginTop: 6 }}>{j.summary}</p>
              </div>
            ))}
          </>
        )}
        {tab === "Education" && (
          <>
            <h1 className="w7-h1">Education</h1>
            {education.map((e) => (
              <div key={e.school} className="w7-band" style={{ marginTop: 12 }}>
                <h2 className="w7-h2">{e.award}</h2>
                <p className="w7-h3">{e.school} · {e.duration}</p>
                <p className="w7-p" style={{ marginTop: 6 }}>{e.note}</p>
              </div>
            ))}
          </>
        )}
        {tab === "Interests" && (
          <>
            <h1 className="w7-h1">Interests</h1>
            <ul className="w7-p" style={{ paddingLeft: 18, listStyle: "square", marginTop: 10 }}>
              {interests.map((i) => (
                <li key={i} style={{ marginTop: 4 }}>{i}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

/* -------------------------------- Skills ------------------------------- */

export function SkillsWindow() {
  const [group, setGroup] = useState(skillGroups[0]?.name ?? "Development");
  const current = skillGroups.find((g) => g.name === group) ?? skillGroups[0];
  const best = useMemo(
    () => Math.max(...skillGroups.flatMap((g) => g.skills.map((s) => s.score))),
    [],
  );
  return (
    <div className="w7-explorer-main">
      <nav className="w7-sidebar" aria-label="Skill categories">
        <h4>Categories</h4>
        {skillGroups.map((g) => (
          <button key={g.name} type="button" className="w7-sidelink" aria-current={group === g.name} onClick={() => setGroup(g.name)}>
            <Icon kind="skills" size={16} /> {g.name}
          </button>
        ))}
      </nav>
      <div className="w7-pane">
        <h1 className="w7-h1">Skill and capability index</h1>
        <p className="w7-p" style={{ marginTop: 4 }}>
          Rated 1.0 to 10.0. Highest capability on this system: <strong>{best.toFixed(1)}</strong>
        </p>
        <div className="w7-sep" />
        <h2 className="w7-h2" style={{ marginBottom: 8 }}>{current?.name}</h2>
        {current?.skills.map((s) => (
          <div key={s.name} style={{ marginBottom: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
              <span style={{ fontWeight: 600, color: "#1d3d5c" }}>{s.name}</span>
              <span style={{ color: "#6b7c8c" }}>{s.note}</span>
            </div>
            <div className="w7-rate">
              <div className="w7-rate-track">
                <div className="w7-rate-fill" style={{ width: `${(s.score / 10) * 100}%` }} />
              </div>
              <div className="w7-rate-num">{s.score.toFixed(1)}</div>
            </div>
          </div>
        ))}
        <div className="w7-sep" />
        <p className="w7-p" style={{ color: "#6b7c8c" }}>
          Scores reflect depth of production experience, not certificates.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------ Experience ----------------------------- */

export function ExperienceWindow() {
  const [selected, setSelected] = useState(experience[0]?.company ?? "");
  const job = experience.find((j) => j.company === selected) ?? experience[0];
  return (
    <div className="w7-explorer-main">
      <nav className="w7-sidebar" aria-label="Roles">
        <h4>Work history</h4>
        {experience.map((j) => (
          <button key={j.company} type="button" className="w7-sidelink" aria-current={selected === j.company} onClick={() => setSelected(j.company)}>
            <Icon kind="experience" size={16} />
            <span>
              {j.company}
              <br />
              <span style={{ fontSize: 11, color: "#6b7c8c" }}>{j.duration}</span>
            </span>
          </button>
        ))}
      </nav>
      <div className="w7-pane">
        {job && (
          <>
            <h1 className="w7-h1">{job.role}</h1>
            <p className="w7-p" style={{ color: "#2c5b86", fontSize: 14 }}>
              {job.company} · {job.duration}
            </p>
            <p className="w7-p" style={{ marginTop: 10 }}>{job.summary}</p>
            <div className="w7-sep" />
            <h2 className="w7-h2">Responsibilities</h2>
            <ul className="w7-p" style={{ paddingLeft: 18, listStyle: "square" }}>
              {job.responsibilities.map((r) => (
                <li key={r} style={{ marginTop: 3 }}>{r}</li>
              ))}
            </ul>
            <section className="w7-band" style={{ marginTop: 14 }}>
              <h2 className="w7-h2">Major achievements</h2>
              <ul className="w7-p" style={{ paddingLeft: 18, listStyle: "square" }}>
                {job.achievements.map((a) => (
                  <li key={a} style={{ marginTop: 3 }}>{a}</li>
                ))}
              </ul>
            </section>
          </>
        )}
      </div>
    </div>
  );
}

/* -------------------------------- Resume ------------------------------- */

export function ResumeWindow({ win }: { win: WinState }) {
  const { showDialog, toggleMax } = useOS();
  const [zoom, setZoom] = useState(1);
  return (
    <>
      <div className="w7-nav">
        <button type="button" className="w7-btn" onClick={() => window.open("/Huzaifa_FullStack_Web_Developer_Resume.pdf", "_blank", "noopener,noreferrer")}>Download Full-Stack Resume (PDF)</button>
        <button type="button" className="w7-btn" onClick={() => window.open("/Huzaifa_AI_Agentic_Developer_Resume.pdf", "_blank", "noopener,noreferrer")}>Download AI Resume (PDF)</button>
        <button type="button" className="w7-btn" onClick={() => window.print()}>Print</button>
        <button type="button" className="w7-btn" onClick={() => toggleMax(win.id)}>Open Full Screen</button>
        <div style={{ flex: 1 }} />
        <button type="button" className="w7-btn" style={{ minWidth: 30 }} aria-label="Zoom out" onClick={() => setZoom((z) => Math.max(0.7, z - 0.1))}>−</button>
        <span style={{ fontSize: 11, color: "#3d5a73", width: 38, textAlign: "center" }}>{Math.round(zoom * 100)}%</span>
        <button type="button" className="w7-btn" style={{ minWidth: 30 }} aria-label="Zoom in" onClick={() => setZoom((z) => Math.min(1.5, z + 0.1))}>+</button>
      </div>
      <div style={{ flex: 1, minHeight: 0, overflow: "auto", background: "#555f68", padding: 18 }}>
        <article
          style={{
            width: 640,
            maxWidth: "100%",
            margin: "0 auto",
            background: "#fff",
            padding: "34px 40px 44px",
            boxShadow: "0 6px 22px rgba(0,0,0,.45)",
            transform: `scale(${zoom})`,
            transformOrigin: "top center",
          }}
        >
          <h1 style={{ fontSize: 26, fontWeight: 300, color: "#14456e" }}>{owner.name}</h1>
          <p style={{ fontSize: 13, color: "#2c5b86" }}>{owner.title}</p>
          <p style={{ fontSize: 11, color: "#6b7c8c", marginTop: 4 }}>
            {owner.location} · {owner.email}
          </p>
          <div className="w7-sep" />
          <h2 className="w7-h3">Profile</h2>
          <p className="w7-p">{owner.intro}</p>
          <div className="w7-sep" />
          <h2 className="w7-h3">Experience</h2>
          {experience.map((j) => (
            <div key={j.company} style={{ marginTop: 10 }}>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#1d3d5c" }}>{j.role} — {j.company}</p>
              <p style={{ fontSize: 11, color: "#6b7c8c" }}>{j.duration}</p>
              <ul className="w7-p" style={{ paddingLeft: 18, listStyle: "square" }}>
                {j.achievements.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
          ))}
          <div className="w7-sep" />
          <h2 className="w7-h3">Selected skills</h2>
          <p className="w7-p">
            {skillGroups.flatMap((g) => g.skills.slice(0, 2).map((s) => s.name)).join(" · ")}
          </p>
          <div className="w7-sep" />
          <h2 className="w7-h3">Education</h2>
          {education.map((e) => (
            <p key={e.school} className="w7-p">
              <strong>{e.award}</strong> — {e.school} ({e.duration})
            </p>
          ))}
        </article>
      </div>
      <div className="w7-status">
        <span>Page 1 of 1</span>
        <span>Resume.pdf</span>
      </div>
    </>
  );
}

/* -------------------------------- Contact ------------------------------ */

export function ContactWindow() {
  const { showDialog, play } = useOS();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      play("error");
      showDialog({
        title: "Message",
        kind: "error",
        heading: "Some required fields are empty",
        message: "Please provide your name, email address and a message before sending.",
        buttons: [{ label: "OK", primary: true }],
      });
      return;
    }
    play("ok");
    showDialog({
      title: "Message Sent",
      kind: "success",
      heading: "Message Sent",
      message: "Your message has been successfully sent. I usually reply within one working day.",
      buttons: [{ label: "OK", primary: true }],
    });
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="w7-pane">
      <h1 className="w7-h1">New Message</h1>
      <p className="w7-p" style={{ marginTop: 2 }}>
        Tell me what you are building and what is getting in the way.
      </p>
      <div className="w7-sep" />
      <form onSubmit={send} style={{ display: "grid", gap: 10, maxWidth: 520 }}>
        <div>
          <label className="w7-label" htmlFor="c-name">Name</label>
          <input id="c-name" className="w7-input" value={form.name} onChange={set("name")} autoComplete="name" required />
        </div>
        <div>
          <label className="w7-label" htmlFor="c-email">Email</label>
          <input id="c-email" type="email" className="w7-input" value={form.email} onChange={set("email")} autoComplete="email" required />
        </div>
        <div>
          <label className="w7-label" htmlFor="c-subject">Subject</label>
          <input id="c-subject" className="w7-input" value={form.subject} onChange={set("subject")} />
        </div>
        <div>
          <label className="w7-label" htmlFor="c-message">Message</label>
          <textarea id="c-message" className="w7-textarea" rows={6} value={form.message} onChange={set("message")} required />
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
          <button type="submit" className="w7-btn w7-btn-default">Send Message</button>
        </div>
      </form>
      <div className="w7-sep" />
      <section className="w7-band">
        <h2 className="w7-h2">Contact details</h2>
        <dl style={{ display: "grid", gridTemplateColumns: "100px 1fr", rowGap: 5, columnGap: 10, marginTop: 6 }}>
          <dt className="w7-h3">Email</dt><dd className="w7-p">{owner.email}</dd>
          <dt className="w7-h3">Phone</dt><dd className="w7-p">{owner.phone}</dd>
          <dt className="w7-h3">LinkedIn</dt><dd className="w7-p">linkedin.com/in/ai-huzaifa-aqeel</dd>
          <dt className="w7-h3">GitHub</dt><dd className="w7-p">github.com/HuzaifaAqeel</dd>
          <dt className="w7-h3">WhatsApp</dt><dd className="w7-p">+92 330 5979548</dd>
          <dt className="w7-h3">Location</dt><dd className="w7-p">{owner.location}</dd>
        </dl>
      </section>
    </div>
  );
}

/* ------------------------------ Recycle Bin ---------------------------- */

export function RecycleWindow() {
  const { open, showDialog } = useOS();
  const [sel, setSel] = useState<string | null>(null);
  const oldPortfolio = projects.find((p) => p.id === "old-portfolio");
  return (
    <>
      <div className="w7-nav">
        <span style={{ color: "#3d5a73" }}>
          This folder contains questionable decisions from previous versions.
        </span>
        <div style={{ flex: 1 }} />
        <button
          type="button"
          className="w7-btn"
          onClick={() =>
            showDialog({
              title: "Recycle Bin",
              kind: "warn",
              heading: "Empty Recycle Bin?",
              message:
                "These mistakes are load-bearing — they are the only reason the current work is any good. Keep them?",
              buttons: [{ label: "Keep them", primary: true }, { label: "Also keep them" }],
            })
          }
        >
          Empty Recycle Bin
        </button>
      </div>
      <div className="w7-content">
        <div className="w7-grid">
          {recycleBin.map((item) => (
            <button
              key={item.name}
              type="button"
              className="w7-item"
              title={item.note}
              aria-selected={sel === item.name}
              onClick={() => setSel(item.name)}
              onDoubleClick={() => {
                if (item.name === "Old Portfolio v1" && oldPortfolio) {
                  open({ app: "project", title: `${oldPortfolio.title} — Properties`, icon: "document", payload: { projectId: oldPortfolio.id } });
                } else {
                  showDialog({ title: item.name, kind: "info", heading: item.name, message: item.note, buttons: [{ label: "OK", primary: true }] });
                }
              }}
            >
              <Icon kind={item.name === "Old Portfolio v1" ? "document" : "folder"} size={44} />
              <span className="w7-item-label">{item.name}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="w7-status">
        <span>{recycleBin.length} items</span>
        <span>Kept for perspective, not for reuse</span>
      </div>
    </>
  );
}

/* ----------------------------- Personalize ----------------------------- */

const wallpaperOptions: { id: Settings["wallpaper"]; label: string }[] = [
  { id: "blue", label: "Windows XP Bliss" },
  { id: "dark", label: "Dark Aero" },
  { id: "nature", label: "Nature" },
  { id: "minimal", label: "Minimal Blue" },
];

export function PersonalizeWindow({ wallpapers }: { wallpapers: Record<Settings["wallpaper"], string> }) {
  const { settings, setSettings } = useOS();
  return (
    <div className="w7-pane">
      <h1 className="w7-h1">Change the visuals on your desktop</h1>
      <p className="w7-p" style={{ marginTop: 2 }}>
        Pick a background and icon size. Your choice is remembered on this device.
      </p>
      <div className="w7-sep" />
      <h2 className="w7-h2">Desktop background</h2>
      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", marginTop: 8 }}>
        {wallpaperOptions.map((w) => (
          <button
            key={w.id}
            type="button"
            onClick={() => setSettings({ wallpaper: w.id })}
            aria-pressed={settings.wallpaper === w.id}
            style={{
              padding: 4,
              background: settings.wallpaper === w.id ? "linear-gradient(180deg,#dcefff,#bfe2fb)" : "#fff",
              border: `1px solid ${settings.wallpaper === w.id ? "#7fb8e0" : "#c6d4e0"}`,
              borderRadius: 3,
              cursor: "default",
            }}
          >
            <img
              src={wallpapers[w.id]}
              alt={`${w.label} wallpaper preview`}
              width={220}
              height={124}
              loading="lazy"
              style={{ width: "100%", height: 84, objectFit: "cover", border: "1px solid #b9cede" }}
            />
            <span style={{ display: "block", fontSize: 12, marginTop: 5, color: "#1d3d5c" }}>{w.label}</span>
          </button>
        ))}
      </div>
      <div className="w7-sep" />
      <h2 className="w7-h2">Desktop icon size</h2>
      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        {(["small", "medium", "large"] as const).map((s) => (
          <button
            key={s}
            type="button"
            className={`w7-btn ${settings.iconSize === s ? "w7-btn-default" : ""}`}
            aria-pressed={settings.iconSize === s}
            onClick={() => setSettings({ iconSize: s })}
          >
            {s[0]?.toUpperCase()}{s.slice(1)} icons
          </button>
        ))}
      </div>
      <div className="w7-sep" />
      <h2 className="w7-h2">Sounds</h2>
      <label className="w7-p" style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 6 }}>
        <input type="checkbox" checked={settings.sound} onChange={(e) => setSettings({ sound: e.target.checked })} />
        Play subtle interface sounds (off by default)
      </label>
    </div>
  );
}

/* -------------------------------- winver ------------------------------- */

export function WinverWindow() {
  return (
    <div className="w7-pane" style={{ display: "flex", gap: 14 }}>
      <img src={xpLogo} alt="Microsoft Windows XP logo" width={110} loading="lazy" style={{ width: 110, height: "auto", objectFit: "contain", alignSelf: "flex-start" }} />
      <div>
        <h1 className="w7-h1" style={{ fontSize: 18 }}>About This Portfolio</h1>
        <p className="w7-p" style={{ marginTop: 6 }}>
          Windows XP Portfolio Edition — Muhammad Huzaifa Aqeel
        </p>
        <p className="w7-p" style={{ marginTop: 6 }}>
          Full-stack web and AI agent work, presented as a Windows XP style desktop.
        </p>
        <p className="w7-p" style={{ marginTop: 10, color: "#6b7c8c" }}>
          Every window, button and glass edge here is hand-written CSS. The wallpaper and Start orb
          use the original Windows XP flag, logo and Bliss wallpaper, as requested for this personal portfolio.
        </p>
      </div>
    </div>
  );
}

/* ------------------------------- Browser ------------------------------- */

export function BrowserWindow() {
  const { open } = useOS();
  const featured: Project[] = projects.filter((p) => p.featured);
  return (
    <>
      <div className="w7-nav">
        <div className="w7-address">
          <Icon kind="browser" size={14} />
          <span className="w7-crumb">portfolio.local / featured</span>
        </div>
      </div>
      <div className="w7-pane">
        <h1 className="w7-h1">Featured work</h1>
        <p className="w7-p" style={{ marginTop: 2 }}>The three projects I would show you first.</p>
        <div className="w7-sep" />
        <div style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))" }}>
          {featured.map((p, i) => (
            <button
              key={p.id}
              type="button"
              className="w7-band"
              style={{ textAlign: "left", cursor: "default" }}
              onClick={() => open({ app: "project", title: `${p.title} — Properties`, icon: "document", payload: { projectId: p.id } })}
            >
              <MockShot seed={i + 3} height={110} label={p.title} />
              <h2 className="w7-h2" style={{ marginTop: 8 }}>{p.title}</h2>
              <p className="w7-p">{p.tagline}</p>
              <span className="w7-linkbtn" style={{ marginTop: 6, display: "inline-block" }}>Open project</span>
            </button>
          ))}
        </div>
        <div className="w7-sep" />
        <h2 className="w7-h2">All categories</h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 6 }}>
          {categories.map((c) => (
            <button key={c.id} type="button" className="w7-tag" onClick={() => open({ app: "projects", payload: { category: c.id } })}>
              {c.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
