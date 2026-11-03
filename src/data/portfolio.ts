/**
 * Portfolio data. Add a new project by appending an object to `projects`.
 * Every UI surface (Explorer grid, search, project windows) is generated from here.
 */

export interface Project {
  id: string;
  title: string;
  category: CategoryId;
  year: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  technologies: string[];
  role: string;
  features: string[];
  result: string;
  tags: string[];
  screenshots: string[];
  liveUrl?: string;
  caseStudyUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export type CategoryId =
  | "web"
  | "ai"
  | "finance"
  | "uiux"
  | "marketing"
  | "data"
  | "business"
  | "other";

export interface Category {
  id: CategoryId;
  name: string;
  blurb: string;
}

export const owner = {
  name: "Zeeshan",
  title: "Creative Developer & Digital Specialist",
  location: "Lahore, Pakistan — working worldwide",
  experience: "6+ years across product engineering, automation and design",
  email: "hello@zeeshan.works",
  linkedin: "https://www.linkedin.com/",
  github: "https://github.com/",
  whatsapp: "https://wa.me/0000000000",
  intro:
    "I build software that people actually enjoy using. My work sits where engineering, design and business meet: shipping web products, automating the boring parts with AI, and turning messy numbers into decisions people trust.",
  bio: "I started as a self-taught front-end developer building small business sites, then spent years moving deeper into product engineering, automation and finance tooling. Today I lead builds end to end — discovery, interface design, implementation, measurement — usually for founders who need one person who can cover a lot of ground without dropping quality.",
  specializations: [
    "Product-grade React & TypeScript front ends",
    "AI workflows, agents and retrieval systems",
    "Financial modelling, reporting and reconciliation tooling",
    "Interface design systems and design-to-code",
    "Analytics, dashboards and growth instrumentation",
  ],
};

export const categories: Category[] = [
  { id: "web", name: "Web Development", blurb: "Marketing sites, SaaS front ends and dashboards" },
  { id: "ai", name: "AI & Automation", blurb: "Agents, RAG assistants and workflow automation" },
  { id: "finance", name: "Finance & Accounting", blurb: "Modelling, reporting and reconciliation" },
  { id: "uiux", name: "UI/UX Design", blurb: "Design systems, product flows and prototypes" },
  { id: "marketing", name: "Marketing Projects", blurb: "Campaign systems, landing pages, funnels" },
  { id: "data", name: "Data Analytics", blurb: "Pipelines, dashboards and decision reporting" },
  { id: "business", name: "Business Projects", blurb: "Internal tools and operations platforms" },
  { id: "other", name: "Other Projects", blurb: "Experiments, side builds and odd requests" },
];

export const projects: Project[] = [
  {
    id: "saas-landing",
    title: "Project 01 – SaaS Landing Page",
    category: "web",
    year: "2025",
    tagline: "Conversion-first marketing site for a B2B scheduling SaaS",
    description:
      "A complete marketing front end for a scheduling product: positioning, page architecture, motion and a component library the client's team can extend without a developer.",
    problem:
      "The product converted well in demos but the old site buried the value proposition under three scrolls of jargon. Paid traffic bounced at 71% and the team could not ship a new page without engineering time.",
    solution:
      "I rebuilt the site around a single promise per section, wrote the copy skeleton with the founders, and shipped a typed block library so marketing can assemble new pages in the CMS.",
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "Sanity CMS", "Vercel"],
    role: "Sole developer and interface designer; collaborated with the founders on copy and pricing layout.",
    features: [
      "Composable page blocks driven by CMS content",
      "Interactive pricing calculator with seat tiers",
      "Sub-second LCP with responsive image pipeline",
      "A/B tested hero variants wired to analytics",
    ],
    result:
      "Bounce rate fell from 71% to 43%, demo requests rose 2.4x in ten weeks, and the marketing team now ships pages without developer involvement.",
    tags: ["landing page", "conversion", "cms", "react", "web"],
    screenshots: ["Marketing home", "Pricing calculator", "CMS block editor"],
    liveUrl: "https://example.com/saas-landing",
    caseStudyUrl: "https://example.com/case/saas-landing",
    featured: true,
  },
  {
    id: "portfolio-os",
    title: "Project 02 – Portfolio Website",
    category: "web",
    year: "2026",
    tagline: "A portfolio that behaves like a desktop operating system",
    description:
      "The site you are using right now: a hand-built Aero-style desktop environment with a real window manager, Explorer navigation, search and persisted personalization.",
    problem:
      "Every developer portfolio looks identical — hero, three cards, contact form. Memorable work needs a memorable container, but novelty usually costs usability and performance.",
    solution:
      "I modelled the whole UI as an OS: a window manager with z-ordering, drag and resize, an Explorer with real navigation history, and a reusable dialog system. All chrome is custom CSS, no UI kit.",
    technologies: ["React 19", "TypeScript", "TanStack Start", "Custom CSS", "Web Audio API"],
    role: "Design, architecture and implementation.",
    features: [
      "Window manager: drag, resize, minimize, maximize, stacking",
      "Explorer with breadcrumbs, back/forward history and live search",
      "Right-click desktop menu, personalization control panel",
      "Keyboard support, reduced-motion support, mobile layout",
    ],
    result:
      "Average session time above four minutes and a steady stream of inbound work from people who wanted to 'see the desktop thing' for themselves.",
    tags: ["portfolio", "react", "typescript", "css", "web", "windows"],
    screenshots: ["Desktop with open windows", "Explorer grid", "Start menu"],
    githubUrl: "https://github.com/",
    featured: true,
  },
  {
    id: "ecommerce",
    title: "Project 03 – E-Commerce Store",
    category: "web",
    year: "2024",
    tagline: "Headless storefront for a 900-SKU apparel brand",
    description:
      "A headless storefront with fast faceted search, a rebuilt cart and a checkout that stopped losing mobile shoppers.",
    problem:
      "The legacy theme took 6.8s to become interactive on mobile and the size selector was the single biggest drop-off point in the funnel.",
    solution:
      "I moved the catalogue to a headless setup, pre-rendered category pages, and redesigned variant selection around an inventory-aware size picker.",
    technologies: ["React", "TypeScript", "Shopify Storefront API", "Algolia", "Stripe"],
    role: "Lead front-end engineer; worked with the brand's designer on the variant UX.",
    features: [
      "Faceted search with typo tolerance",
      "Inventory-aware variant picker",
      "One-page checkout with saved addresses",
      "Edge-cached product pages",
    ],
    result:
      "Mobile conversion up 38%, time-to-interactive down to 1.4s, and cart abandonment reduced by 19%.",
    tags: ["ecommerce", "shopify", "react", "performance", "web"],
    screenshots: ["Category grid", "Product page", "Checkout"],
    liveUrl: "https://example.com/store",
  },
  {
    id: "client-dashboard",
    title: "Project 04 – Client Dashboard",
    category: "web",
    year: "2025",
    tagline: "Multi-tenant reporting dashboard for an agency's 40 clients",
    description:
      "A white-label dashboard that replaced 40 hand-assembled monthly PDF reports with live, permissioned views.",
    problem:
      "Account managers spent roughly 60 hours a month copying numbers between ad platforms and slide decks, and clients still complained the data was stale.",
    solution:
      "I built a scheduled ingestion layer into a normalized metrics store, then a themeable dashboard with per-client branding and role-based access.",
    technologies: ["React", "TypeScript", "PostgreSQL", "Row-level security", "Recharts"],
    role: "Full-stack engineer and data modeller.",
    features: [
      "Per-tenant theming and custom domains",
      "Row-level security for client isolation",
      "Scheduled PDF export for stakeholders",
      "Anomaly flags on sudden spend changes",
    ],
    result: "Reporting labour dropped ~85%, and client retention improved by 12% year over year.",
    tags: ["dashboard", "multi-tenant", "postgres", "reporting", "web"],
    screenshots: ["Overview", "Channel breakdown", "Admin settings"],
  },
  {
    id: "ai-web-app",
    title: "Project 05 – AI Web Application",
    category: "web",
    year: "2025",
    tagline: "Document assistant for a legal operations team",
    description:
      "A retrieval-augmented assistant that answers questions across 12,000 contracts with citations back to the source clause.",
    problem:
      "Paralegals were manually searching a shared drive for precedent clauses, averaging 25 minutes per lookup with inconsistent results.",
    solution:
      "I built a chunking and embedding pipeline with clause-level metadata, then a chat interface that always shows the citation and refuses to answer when confidence is low.",
    technologies: ["React", "TypeScript", "pgvector", "OpenAI API", "Edge functions"],
    role: "Product engineer; designed the retrieval strategy and the trust-focused interface.",
    features: [
      "Clause-level citations with jump-to-source",
      "Confidence gating instead of hallucinated answers",
      "Saved research threads per matter",
      "Audit log of every query and document touched",
    ],
    result: "Average lookup time fell from 25 minutes to under 90 seconds across the team.",
    tags: ["ai", "rag", "legal", "react", "web"],
    screenshots: ["Chat with citations", "Document viewer", "Audit log"],
    featured: true,
  },
  {
    id: "support-agent",
    title: "Support Triage Agent",
    category: "ai",
    year: "2025",
    tagline: "Autonomous first-response layer for a 4-person support team",
    description:
      "An agent that reads inbound tickets, classifies intent, drafts a grounded reply and escalates anything it should not touch.",
    problem:
      "First-response time had drifted past nine hours and 60% of tickets were the same eight questions.",
    solution:
      "I built a classifier plus a retrieval-grounded drafting step, with a human-approval queue and hard rules that block the agent from refunds or account changes.",
    technologies: ["TypeScript", "LangGraph-style orchestration", "pgvector", "Zendesk API"],
    role: "Automation engineer and prompt architect.",
    features: [
      "Intent classification with confidence thresholds",
      "Grounded drafts with knowledge-base citations",
      "Human approval queue with one-key send",
      "Hard guardrails on money-moving actions",
    ],
    result: "First-response time down to 11 minutes; 54% of tickets resolved without a human edit.",
    tags: ["ai", "automation", "agents", "support"],
    screenshots: ["Triage queue", "Draft review", "Guardrail config"],
  },
  {
    id: "ops-automation",
    title: "Ops Automation Suite",
    category: "ai",
    year: "2024",
    tagline: "Removing 300 monthly hours of copy-paste from a logistics back office",
    description:
      "A set of automations that read supplier emails and PDFs, extract order data, and push clean records into the ERP.",
    problem:
      "Four coordinators re-typed order data from PDF attachments into the ERP, with a 6% error rate that caused expensive shipping mistakes.",
    solution:
      "I built a document-parsing pipeline with schema validation and a review UI for low-confidence extractions only.",
    technologies: ["Python", "TypeScript", "Vision models", "Zod validation", "Postgres queues"],
    role: "Solution architect and implementer.",
    features: [
      "Layout-aware PDF extraction",
      "Schema validation before any ERP write",
      "Review queue for low-confidence rows",
      "Full replay of any failed job",
    ],
    result: "About 300 hours a month recovered and extraction errors cut to under 0.4%.",
    tags: ["ai", "automation", "python", "documents", "logistics"],
    screenshots: ["Extraction review", "Job monitor", "Error replay"],
  },
  {
    id: "content-engine",
    title: "AI Content Engine",
    category: "ai",
    year: "2026",
    tagline: "Brand-safe content pipeline for a 5-market publisher",
    description:
      "A drafting pipeline that turns research briefs into on-brand drafts in five languages, with editorial review built into every step.",
    problem:
      "Localised content took three weeks per market and drifted badly from brand voice.",
    solution:
      "I encoded the style guide as machine-checkable rules, added a research grounding step, and gave editors a diff-based review rather than a blank page.",
    technologies: ["TypeScript", "Structured prompting", "Vector search", "Next-gen TTS"],
    role: "Systems designer and engineer.",
    features: [
      "Style-guide linting on every draft",
      "Grounding sources attached to each claim",
      "Diff-based editorial review",
      "Per-market tone profiles",
    ],
    result: "Localisation cycle down from three weeks to four days with higher editor approval rates.",
    tags: ["ai", "content", "localisation", "automation"],
    screenshots: ["Brief intake", "Draft diff", "Market profiles"],
  },
  {
    id: "fin-model",
    title: "SaaS Financial Model",
    category: "finance",
    year: "2025",
    tagline: "Driver-based forecast that survived a Series A diligence",
    description:
      "A three-statement model with cohort retention, hiring plan and scenario switching, built for a company raising its first institutional round.",
    problem:
      "The founders' spreadsheet had 14 hardcoded assumptions and broke whenever an investor asked 'what if churn doubles?'.",
    solution:
      "I rebuilt it driver-first with a single assumptions sheet, cohort-level revenue build, and three switchable scenarios with variance reporting.",
    technologies: ["Excel", "Power Query", "SQL", "Looker Studio"],
    role: "Financial modeller working directly with the CEO and CFO.",
    features: [
      "Cohort revenue and churn build",
      "Hiring plan tied to bookings",
      "Base / upside / downside scenarios",
      "Actual-vs-forecast variance pack",
    ],
    result: "Model passed diligence with no rebuild requests; round closed at the target valuation.",
    tags: ["finance", "modelling", "accounting", "excel", "forecast"],
    screenshots: ["Assumptions sheet", "Cohort build", "Scenario summary"],
  },
  {
    id: "recon-tool",
    title: "Reconciliation Automation",
    category: "finance",
    year: "2024",
    tagline: "Month-end close from nine days to two",
    description:
      "A matching engine that reconciles payment processor payouts against the ledger and surfaces only genuine exceptions.",
    problem:
      "Accounting reconciled three processors by hand each month, and unexplained differences were written off rather than investigated.",
    solution:
      "I built a deterministic matcher with tolerance rules and fee decomposition, plus an exception workspace with an audit trail.",
    technologies: ["Python", "PostgreSQL", "Pandas", "Streamlit"],
    role: "Analyst and developer.",
    features: [
      "Multi-processor payout ingestion",
      "Fee and FX decomposition",
      "Tolerance-based auto-matching",
      "Exception workspace with notes and audit trail",
    ],
    result: "Close time cut from nine days to two; £180k of previously written-off differences recovered.",
    tags: ["finance", "accounting", "reconciliation", "python"],
    screenshots: ["Match summary", "Exception workspace", "Audit trail"],
  },
  {
    id: "design-system",
    title: "Product Design System",
    category: "uiux",
    year: "2025",
    tagline: "One library, three products, zero pixel arguments",
    description:
      "A token-driven design system covering typography, colour, spacing, motion and 48 documented components shipped as code and Figma library in parallel.",
    problem:
      "Three product teams had drifted into three visual languages, and every new screen restarted the same debates.",
    solution:
      "I defined semantic tokens first, built the React library against them, and documented usage rules with do/don't examples so decisions stopped being personal.",
    technologies: ["Figma", "React", "TypeScript", "CSS custom properties", "Storybook"],
    role: "Design systems lead.",
    features: [
      "Semantic token layer with theming",
      "48 accessible documented components",
      "Figma library kept in sync with code",
      "Contribution and deprecation process",
    ],
    result: "New feature build time down roughly 30% and accessibility defects down 60%.",
    tags: ["design", "ui", "ux", "figma", "design system"],
    screenshots: ["Token reference", "Component gallery", "Usage docs"],
  },
  {
    id: "app-redesign",
    title: "Mobile Banking Redesign",
    category: "uiux",
    year: "2024",
    tagline: "Rebuilding trust in a payment flow people were abandoning",
    description:
      "An end-to-end redesign of the transfer and confirmation flow for a regional banking app, from research through usability testing.",
    problem:
      "Users abandoned transfers at the confirmation step because nothing explained fees, timing or reversibility.",
    solution:
      "After eleven interviews I restructured the flow around three certainties — who, how much, when it lands — and tested three confirmation patterns.",
    technologies: ["Figma", "Maze", "Prototyping", "Accessibility audit"],
    role: "Product designer and researcher.",
    features: [
      "Plain-language fee and timing disclosure",
      "Reversible review step",
      "WCAG AA contrast and touch targets",
      "Tested prototype with 24 participants",
    ],
    result: "Transfer completion up 27% in the pilot cohort; support contacts about fees down by half.",
    tags: ["ux", "research", "design", "mobile", "photoshop"],
    screenshots: ["Research synthesis", "Transfer flow", "Confirmation variants"],
  },
  {
    id: "campaign-system",
    title: "Campaign Landing System",
    category: "marketing",
    year: "2025",
    tagline: "40 campaign pages a quarter without a developer",
    description:
      "A templated landing page system with built-in tracking, experiment slots and a component set the growth team owns.",
    problem:
      "Every campaign needed a developer for a one-off page, so tests took two weeks to launch and tracking was inconsistent.",
    solution:
      "I built a template system with locked tracking primitives, so pages differ in content while measurement stays identical.",
    technologies: ["React", "TypeScript", "GA4", "Segment", "Tailwind CSS"],
    role: "Engineer and growth partner.",
    features: [
      "Reusable campaign templates",
      "Standardised event schema",
      "Experiment slots with traffic splitting",
      "Automatic UTM and lead-source capture",
    ],
    result: "Test launch time down to two days; cost per qualified lead down 31%.",
    tags: ["marketing", "landing pages", "analytics", "growth"],
    screenshots: ["Template picker", "Live campaign page", "Experiment report"],
  },
  {
    id: "seo-content",
    title: "Programmatic SEO Build",
    category: "marketing",
    year: "2024",
    tagline: "3,200 useful pages, not 3,200 doorway pages",
    description:
      "A programmatic content build for a comparison site, with editorial guardrails to keep pages genuinely useful.",
    problem:
      "The category was dominated by thin aggregator pages and the client had no organic entry point.",
    solution:
      "I designed a data model where each page answers a real query with proprietary data, and gated publication behind a usefulness checklist.",
    technologies: ["TypeScript", "Static generation", "Structured data", "BigQuery"],
    role: "Technical lead.",
    features: [
      "Data-backed page templates",
      "JSON-LD structured data per page type",
      "Internal linking graph",
      "Publication quality gate",
    ],
    result: "Organic sessions from 4k to 96k a month in eight months with a 3.1% signup rate.",
    tags: ["marketing", "seo", "content", "data"],
    screenshots: ["Page template", "Link graph", "Traffic report"],
  },
  {
    id: "analytics-warehouse",
    title: "Analytics Warehouse",
    category: "data",
    year: "2025",
    tagline: "One number, one definition, one source",
    description:
      "A modelled warehouse and metrics layer that ended the weekly argument about which revenue figure was correct.",
    problem:
      "Finance, sales and marketing each computed revenue differently, so leadership meetings started with reconciliation instead of decisions.",
    solution:
      "I built staging and mart layers with tested transformations and a single semantic metrics definition every tool reads from.",
    technologies: ["dbt", "BigQuery", "SQL", "Airflow", "Looker"],
    role: "Analytics engineer.",
    features: [
      "Tested transformation layers",
      "Single semantic metric definitions",
      "Freshness and volume alerting",
      "Self-serve exploration for non-analysts",
    ],
    result: "Reporting disputes effectively eliminated; ad-hoc analyst requests down 45%.",
    tags: ["data", "analytics", "dbt", "sql", "warehouse"],
    screenshots: ["Lineage graph", "Metrics catalogue", "Executive dashboard"],
  },
  {
    id: "churn-model",
    title: "Churn Early-Warning Model",
    category: "data",
    year: "2026",
    tagline: "Knowing which accounts leave, three weeks earlier",
    description:
      "A gradient-boosted churn model wired into the CRM so success managers see risk before renewal conversations.",
    problem:
      "Churn was only visible after cancellation, leaving no window to intervene.",
    solution:
      "I engineered behavioural features from product events, trained and calibrated a model, then surfaced the top three risk drivers per account instead of a bare score.",
    technologies: ["Python", "scikit-learn", "XGBoost", "dbt", "HubSpot API"],
    role: "Data scientist and integration engineer.",
    features: [
      "Behavioural feature store",
      "Calibrated probabilities, not raw scores",
      "Per-account risk driver explanations",
      "Weekly CRM sync with playbook triggers",
    ],
    result: "0.83 AUC in production; 22% of flagged at-risk revenue saved in the first two quarters.",
    tags: ["data", "machine learning", "python", "churn"],
    screenshots: ["Model report", "CRM risk card", "Driver explanations"],
  },
  {
    id: "ops-platform",
    title: "Field Operations Platform",
    category: "business",
    year: "2025",
    tagline: "Replacing a clipboard, three spreadsheets and a WhatsApp group",
    description:
      "A scheduling, dispatch and job-reporting platform for a 60-technician maintenance company, including an offline-capable mobile view.",
    problem:
      "Dispatchers coordinated by phone, job proof lived in a chat group, and invoicing lagged two weeks behind completed work.",
    solution:
      "I built a single job record from booking to invoice, with an offline-first technician view that syncs photos and signatures when signal returns.",
    technologies: ["React", "TypeScript", "PostgreSQL", "Service workers", "Stripe Invoicing"],
    role: "Product engineer working alongside the operations director.",
    features: [
      "Drag-and-drop dispatch board",
      "Offline job capture with photo evidence",
      "Customer signature and instant invoice",
      "SLA breach alerts",
    ],
    result: "Invoicing lag from 14 days to same-day; jobs completed per technician up 17%.",
    tags: ["business", "operations", "react", "offline"],
    screenshots: ["Dispatch board", "Technician job view", "Invoice run"],
  },
  {
    id: "inventory",
    title: "Inventory Control System",
    category: "business",
    year: "2023",
    tagline: "Stock counts that match reality",
    description:
      "A barcode-driven inventory system for a wholesaler with three warehouses and constant stock discrepancies.",
    problem:
      "Quarterly counts routinely disagreed with the system by 8-12%, causing both stockouts and dead capital.",
    solution:
      "I introduced movement-level tracking with barcode scanning and rolling cycle counts instead of one painful quarterly count.",
    technologies: ["TypeScript", "PostgreSQL", "Barcode scanning", "Docker"],
    role: "Developer and process designer.",
    features: [
      "Movement-level audit trail",
      "Rolling cycle counting",
      "Reorder point suggestions",
      "Multi-warehouse transfers",
    ],
    result: "Count variance under 1%, stockouts down 64%, and roughly $210k of dead stock cleared.",
    tags: ["business", "inventory", "operations", "accounting"],
    screenshots: ["Stock overview", "Cycle count", "Transfer log"],
  },
  {
    id: "old-portfolio",
    title: "Old Portfolio v1",
    category: "other",
    year: "2019",
    tagline: "A single scrolling page with a parallax header. We all did it.",
    description:
      "My first portfolio: jQuery, a full-screen video header and a 9MB hero image. Kept here for honesty and perspective.",
    problem: "I wanted to look impressive more than I wanted to be understood.",
    solution: "Time, feedback, and learning that clarity beats decoration.",
    technologies: ["jQuery", "Bootstrap 3", "Regret"],
    role: "Enthusiastic beginner.",
    features: ["Parallax everything", "Autoplaying background video", "Six typefaces"],
    result: "Still got me my first three clients, which is a lesson in itself.",
    tags: ["other", "archive", "easter egg"],
    screenshots: ["The parallax header"],
  },
  {
    id: "cli-tools",
    title: "Open Source CLI Tools",
    category: "other",
    year: "2024",
    tagline: "Small utilities I got tired of rewriting",
    description:
      "A handful of published command-line tools for scaffolding, environment diffing and release notes generation.",
    problem: "Every project restarted the same setup chores.",
    solution: "I extracted the repeated parts into documented, tested packages with sensible defaults.",
    technologies: ["Node.js", "TypeScript", "Vitest", "npm"],
    role: "Maintainer.",
    features: ["Zero-config defaults", "Typed plugin API", "Tested on three runtimes"],
    result: "Around 40k monthly downloads and a steady trickle of good pull requests.",
    tags: ["other", "open source", "node", "cli"],
    screenshots: ["CLI output"],
    githubUrl: "https://github.com/",
  },
];

export interface SkillGroup {
  name: string;
  skills: { name: string; score: number; note: string }[];
}

export const skillGroups: SkillGroup[] = [
  {
    name: "Development",
    skills: [
      { name: "React & TypeScript", score: 9.2, note: "Production apps since 2019" },
      { name: "Web Development", score: 8.5, note: "Front end, APIs, performance" },
      { name: "Node.js & APIs", score: 8.4, note: "REST, RPC, background jobs" },
      { name: "PostgreSQL", score: 8.1, note: "Modelling, RLS, query tuning" },
    ],
  },
  {
    name: "AI & Automation",
    skills: [
      { name: "AI Automation", score: 9.0, note: "Agents, tool use, guardrails" },
      { name: "RAG & Vector Search", score: 8.7, note: "Chunking, evaluation, citations" },
      { name: "Python Pipelines", score: 8.2, note: "Extraction and batch processing" },
    ],
  },
  {
    name: "Design",
    skills: [
      { name: "UI/UX Design", score: 8.0, note: "Product flows and interfaces" },
      { name: "Design Systems", score: 8.6, note: "Tokens, components, docs" },
      { name: "Figma & Prototyping", score: 8.3, note: "Testable prototypes" },
    ],
  },
  {
    name: "Finance",
    skills: [
      { name: "Financial Analysis", score: 9.0, note: "Modelling and diligence support" },
      { name: "Accounting Systems", score: 8.4, note: "Close, reconciliation, controls" },
      { name: "Excel & Power Query", score: 8.8, note: "Driver-based models" },
    ],
  },
  {
    name: "Marketing",
    skills: [
      { name: "Growth Analytics", score: 8.2, note: "Event design and attribution" },
      { name: "Technical SEO", score: 8.0, note: "Programmatic and structured data" },
      { name: "Conversion Optimisation", score: 7.9, note: "Experiment design" },
    ],
  },
  {
    name: "Tools",
    skills: [
      { name: "Git & CI/CD", score: 8.9, note: "Trunk-based, automated releases" },
      { name: "dbt & SQL", score: 8.5, note: "Modelled warehouses" },
      { name: "Docker", score: 7.8, note: "Reproducible environments" },
    ],
  },
];

export interface Job {
  company: string;
  role: string;
  duration: string;
  summary: string;
  responsibilities: string[];
  achievements: string[];
}

export const experience: Job[] = [
  {
    company: "Independent Consultant",
    role: "Product Engineer & Digital Specialist",
    duration: "2022 — Present",
    summary:
      "Working directly with founders and operations leaders to ship products, automate workflows and make the numbers legible.",
    responsibilities: [
      "Own delivery end to end: discovery, design, build, measurement",
      "Design data models and automation pipelines",
      "Advise on technical hiring and architecture decisions",
    ],
    achievements: [
      "Delivered 20+ production projects with a 100% completion rate",
      "Automated an estimated 9,000 hours of manual work per year across clients",
      "Three clients raised institutional funding using models and dashboards I built",
    ],
  },
  {
    company: "Northline Digital",
    role: "Senior Front-End Engineer",
    duration: "2020 — 2022",
    summary: "Led the front-end practice for a product studio serving fintech and logistics clients.",
    responsibilities: [
      "Led front-end architecture across four concurrent products",
      "Built and maintained the shared component library",
      "Mentored three mid-level engineers",
    ],
    achievements: [
      "Cut average project setup from two weeks to two days with a shared starter",
      "Improved Core Web Vitals pass rate from 34% to 91% across the portfolio",
    ],
  },
  {
    company: "Meridian Accounting Services",
    role: "Financial Analyst (Systems)",
    duration: "2019 — 2020",
    summary:
      "Sat between finance and engineering, building the reporting and reconciliation tooling the practice ran on.",
    responsibilities: [
      "Built monthly reporting packs for 30+ SME clients",
      "Automated bank and processor reconciliation",
      "Trained staff on the tooling I shipped",
    ],
    achievements: [
      "Reduced month-end close from nine days to two",
      "Recovered a six-figure sum of previously written-off differences",
    ],
  },
];

export const education = [
  {
    school: "University of the Punjab",
    award: "BSc, Computer Science",
    duration: "2015 — 2019",
    note: "Final year project: automated document classification for archival records.",
  },
  {
    school: "Professional certifications",
    award: "ACCA (Applied Knowledge), Google Data Analytics",
    duration: "2020 — 2023",
    note: "Formalised the finance and analytics side of the work.",
  },
];

export const interests = [
  "Restoring old operating system interfaces (clearly)",
  "Long-distance cycling and very average photography",
  "Teaching juniors — I run a free monthly code review session",
  "Mechanical keyboards, which is its own kind of expense",
];

export const recycleBin = [
  { name: "Bad Designs", note: "Seven hero sections with three competing gradients." },
  { name: "Unfinished Ideas", note: "A note-taking app. Everyone has one. Mine is 40% done." },
  { name: "Bugs I Pretend Never Happened", note: "The timezone incident of 2023. We do not discuss it." },
  { name: "Rejected Concepts", note: "A client site with an intro animation you could not skip." },
  { name: "Sleep Schedule", note: "Deleted 2019. Recovery attempts ongoing." },
  { name: "Old Portfolio v1", note: "Parallax header, 9MB hero image, jQuery. It happened." },
];

export function searchProjects(query: string): Project[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/);
  const matches = (haystack: string, term: string) =>
    new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "i").test(haystack);
  return projects.filter((p) => {
    const haystack = [
      p.title,
      p.tagline,
      p.description,
      p.role,
      categories.find((c) => c.id === p.category)?.name ?? "",
      p.technologies.join(" "),
      p.tags.join(" "),
    ]
      .join(" ")
      .toLowerCase();
    return terms.every((t) => matches(haystack, t));
  });
}

export function projectsIn(category: CategoryId): Project[] {
  return projects.filter((p) => p.category === category);
}

export function categoryName(id: CategoryId): string {
  return categories.find((c) => c.id === id)?.name ?? "Projects";
}
