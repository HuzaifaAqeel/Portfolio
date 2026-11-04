/**
 * Portfolio data for Muhammad Huzaifa Aqeel.
 * Every UI surface (Explorer grid, search, project windows) is generated from here.
 * All projects, roles and skills below are taken from his resumes and public GitHub repos.
 * No client outcome is claimed unless it is stated in those sources.
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
  /** A URL that can actually be embedded as a live preview (iframe). Only
   * set when the site is verified live and does not block framing. Code-only
   * projects have no previewUrl — their window shows their real README
   * instead, never a mock screenshot. */
  previewUrl?: string;
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
  name: "Muhammad Huzaifa Aqeel",
  title: "Full-Stack Web Developer & AI Agentic Developer",
  location: "Rawalpindi, Pakistan — working worldwide",
  experience: "2022 — Present · Web & AI development",
  email: "huzaifaa.aqeel@gmail.com",
  phone: "+92 330 5979548",
  linkedin: "https://www.linkedin.com/in/ai-huzaifa-aqeel",
  github: "https://github.com/HuzaifaAqeel",
  portfolio: "https://heylink.me/huzaifaaqeel",
  whatsapp: "https://wa.me/923305979548",
  intro:
    "I build full-stack web products and AI agent systems that people can actually use — React and TypeScript front ends, Node.js APIs, and LLM agents with retrieval, tools and guardrails, shipped end to end from requirements to deployment.",
  bio: "I started building websites at the Rawalpindi Institute of Technology, then worked full-time at Aridian Array Software Society on MERN client and in-house projects, and have freelanced in web and AI since 2023. Alongside that I trained as an AI Agentic Engineer at PIAIC, worked in AI automation at Robox AI, built agents for international clients, and worked remotely at CyberGrabs. I am also the founder of TheHexaSystem, my AI automation agency. My work sits where web, AI and client delivery meet: clear requirements, clean code, and systems that keep working after launch.",
  specializations: [
    "Full-stack React & TypeScript products with Node.js / Express APIs",
    "AI agents, multi-agent orchestration and RAG with hybrid search",
    "WordPress, WooCommerce and Elementor sites, themes and migrations",
    "AI automation, workflows, GoHighLevel funnels and client systems",
    "Deployment on Vercel and Render, GitHub, Docker and CI basics",
  ],
};

export const categories: Category[] = [
  { id: "web", name: "Web Development", blurb: "Full-stack sites, dashboards, landing pages and portals" },
  { id: "ai", name: "AI & Automation", blurb: "Agents, RAG assistants, voice pipelines and workflow automation" },
  { id: "data", name: "Data & Retrieval", blurb: "Hybrid search, vector stores, evaluation and pipelines" },
  { id: "business", name: "Business Projects", blurb: "Agency work, client platforms and internal tools" },
  { id: "other", name: "Other Projects", blurb: "Open source, experiments and side builds" },
];

export const projects: Project[] = [
  {
    id: "thehexasystem",
    title: "TheHexaSystem — AI Automation Agency",
    category: "business",
    year: "2025",
    tagline: "Founder-built agency site for AI automation, voice agents and funnels",
    description:
      "TheHexaSystem is Huzaifa's own AI automation agency. The site presents its services, process, pricing calculator, booking and FAQ, and is built as a large TanStack Start front end with a full design-system component library.",
    problem:
      "An agency needs one place that explains what it does, how it works, what it costs and how to book — without a generic template look.",
    solution:
      "Built the site as a complete product: service pages, a ten-service menu, a workflow section, a calculator, booking requests and an SEO foundation (sitemap, robots, llms.txt, JSON-LD and canonicals), with no invented metrics, ratings or prices.",
    technologies: ["React", "TypeScript", "TanStack Start", "Tailwind CSS", "Vercel", "Resend"],
    role: "Founder and sole developer — design, build, SEO foundation and deployment.",
    features: [
      "Service, process, calculator, booking and FAQ sections",
      "Design-system component library and mega-menu navigation",
      "Styled enquiry and call-request emails (Resend, visitor as reply-to)",
      "Calendar submissions kept as requests, not confirmed bookings",
    ],
    result:
      "Live as a complete agency site at thehexasystems.com, with its codebase maintained on GitHub.",
    tags: ["agency", "ai automation", "tanstack", "react", "web"],
    screenshots: ["Home and services", "Process section", "Calculator and booking"],
    liveUrl: "https://thehexasystems.com",
    previewUrl: "https://thehexasystems.com",
    githubUrl: "https://github.com/HuzaifaAqeel/TheHexaSystem",
    featured: true,
  },
  {
    id: "multi-agent-orchestration",
    title: "Multi-Agent Orchestration Platform",
    category: "ai",
    year: "2025",
    tagline: "Reliability-first multi-agent platform on an 18-node LangGraph graph",
    description:
      "A multi-agent platform with supervisor routing, shared state and human-in-the-loop plan approval, built so long-running agent workflows complete safely and observably.",
    problem:
      "Multi-agent work fails quietly: a bad tool call or an unchecked plan can derail a whole run.",
    solution:
      "Built an 18-node LangGraph graph with supervisor routing, retry policies, structured outputs and tool-use guardrails, plus a sandboxed coding agent, evals and deployment.",
    technologies: ["Python", "LangGraph", "LangChain", "MCP", "A2A protocol"],
    role: "Designer and builder — orchestration, guardrails, evals and deployment.",
    features: [
      "Supervisor routing with shared state and HITL plan approval",
      "Retry policies and structured outputs for long runs",
      "Tool-use guardrails and evidence adjudication",
      "Sandboxed coding agent, evals and deployment",
    ],
    result:
      "Shipped as a complete open-source platform on GitHub, used as a reference for reliable agent work.",
    tags: ["agents", "langgraph", "orchestration", "python", "ai"],
    screenshots: ["Agent graph", "HITL approval", "Run timeline"],
    githubUrl: "https://github.com/HuzaifaAqeel/Multi-Agent-Orchestration",
    featured: true,
  },
  {
    id: "hybrid-rag-lab",
    title: "Hybrid RAG Lab",
    category: "data",
    year: "2025",
    tagline: "BM25 + Milvus dense retrieval, fused with RRF and reranked",
    description:
      "An experimental RAG lab that fuses BM25 lexical search with Milvus dense-vector retrieval via Reciprocal Rank Fusion, adds a cross-encoder reranker, and compares results side by side in Streamlit.",
    problem:
      "Keyword search misses meaning and dense search misses exact terms — either alone gives weak answers.",
    solution:
      "Combined both retrievers with RRF fusion and cross-encoder reranking, then benchmarked chunking strategies and top-k settings to find the accuracy and latency sweet spot for production Q&A.",
    technologies: ["Python", "BM25", "Milvus", "Reciprocal Rank Fusion", "Cross-encoder reranking", "LangChain", "Streamlit", "Gemini"],
    role: "Designer and builder — retrieval design, benchmarking and UI.",
    features: [
      "BM25 + Milvus hybrid retrieval with RRF fusion",
      "Cross-encoder reranking and side-by-side comparison",
      "Benchmarks across chunking strategies and top-k settings",
      "LangChain retriever interface for reuse",
    ],
    result:
      "Published on GitHub as a reusable hybrid-retrieval reference with measured retrieval trade-offs.",
    tags: ["rag", "hybrid search", "milvus", "reranking", "ai"],
    screenshots: ["Retrieval comparison", "Reranker view", "Benchmark table"],
    githubUrl: "https://github.com/HuzaifaAqeel/Hybrid-RAG-Lab",
    featured: true,
  },
  {
    id: "agentic-text-to-sql",
    title: "Agentic Text-to-SQL",
    category: "ai",
    year: "2025",
    tagline: "One execute_sql tool, a frontier model, and self-correcting SQL",
    description:
      "A text-to-SQL agent that exposes a single execute_sql tool to a frontier model, explores the schema, writes SQL, self-corrects on errors, and is checked by an evaluation suite before execution.",
    problem:
      "Natural-language database questions usually produce plausible but wrong SQL, with no check before it runs.",
    solution:
      "Used schema-aware prompting, a single tool, self-correction on errors, SQL validation and a 50+ metric eval suite to catch bad queries before execution, with traces, scenarios and an MCP improvement loop.",
    technologies: ["Python", "LLM Agents", "SQL", "MCP", "Pydantic"],
    role: "Designer and builder — agent loop, validation and eval suite.",
    features: [
      "Single execute_sql tool with schema-aware prompting",
      "Self-correction on SQL errors",
      "SQL validation and 50+ correctness metrics",
      "Traces, scenarios and MCP improvement loop",
    ],
    result:
      "Published on GitHub with traces and an eval suite for text-to-SQL work.",
    tags: ["agents", "sql", "evaluation", "python", "ai"],
    screenshots: ["Agent trace", "SQL correction", "Eval report"],
    githubUrl: "https://github.com/HuzaifaAqeel/Agentic-Text-to-SQL",
  },
  {
    id: "mcp-framework",
    title: "MCP Framework (Python)",
    category: "other",
    year: "2025",
    tagline: "Minimal, spec-faithful framework for MCP servers and clients",
    description:
      "A minimal Python framework for building Model Context Protocol servers and clients — tools, resources and prompts over a standard transport — including a codebase MCP server that turns any codebase into a queryable knowledge base.",
    problem:
      "Agents need a standard way to call tools and read resources, and codebases need a standard way to be queried.",
    solution:
      "Built a spec-faithful MCP framework, then a codebase server on top of it with tree-sitter parsing, hybrid BM25 + vector retrieval, reranking and citations.",
    technologies: ["Python", "Model Context Protocol", "Tree-sitter", "BM25", "Vector retrieval"],
    role: "Designer and builder — framework and codebase server.",
    features: [
      "MCP tools, resources and prompts over standard transport",
      "Codebase server with tree-sitter parsing",
      "Hybrid retrieval with reranking and citations",
      "Minimal, documented, reusable design",
    ],
    result:
      "Published on GitHub as a reusable MCP building block for coding agents.",
    tags: ["mcp", "python", "open source", "agents"],
    screenshots: ["MCP server", "Codebase query", "Citation view"],
    githubUrl: "https://github.com/HuzaifaAqeel/MCP-Framework-Python",
  },
  {
    id: "pathfinder-ai",
    title: "Pathfinder AI — Career Guidance Platform",
    category: "web",
    year: "2025",
    tagline: "Careers, learning roadmaps, resume analysis, jobs and an AI coach",
    description:
      "A full-stack platform that helps users discover careers, build learning roadmaps, analyze resumes, find jobs and chat with an AI career coach, built as a pnpm monorepo.",
    problem:
      "Career guidance is scattered across job boards, resume tools and courses, with no single guided path.",
    solution:
      "Architected a pnpm monorepo with a React front end, a dedicated Express API server, and a shared API-spec package with code-generated, type-safe hooks and Zod schemas.",
    technologies: ["React", "TypeScript", "Node.js", "Express", "Zod", "pnpm monorepo"],
    role: "Full-stack developer — architecture, front end, API and type-safe hooks.",
    features: [
      "Career discovery and learning roadmaps",
      "Resume analysis and job search",
      "AI career coach chat",
      "Code-generated, type-safe API hooks with Zod schemas",
    ],
    result:
      "Built as a complete full-stack product on GitHub, from architecture to deployment-ready code.",
    tags: ["full-stack", "react", "node", "careers", "web"],
    screenshots: ["Career discovery", "Roadmap view", "AI coach"],
    githubUrl: "https://github.com/HuzaifaAqeel/Pathfinder",
  },
  {
    id: "wizards-detailing",
    title: "Wizards Detailing — Business Website & Platform",
    category: "web",
    year: "2025",
    tagline: "Car detailing business site with services, booking and admin",
    description:
      "An end-to-end website for a car detailing business with service listings, booking flows and an admin management area, with a polished, accessible UI.",
    problem:
      "A service business needs bookings and service information in one place, with an admin view it can actually manage.",
    solution:
      "Built the Express back end with modular routes and middleware (auth, validation, error handling) and a PostgreSQL data layer, plus a Radix/shadcn UI with React Hook Form and schema validation, deployed on Vercel.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "shadcn/ui", "Express", "PostgreSQL", "Vercel"],
    role: "Full-stack developer — front end, back end, booking flows and deployment.",
    features: [
      "Service listings and booking flows",
      "Admin management area",
      "Modular Express routes with auth and validation",
      "PostgreSQL data layer and Vercel deployment",
    ],
    result:
      "Delivered as a complete business website and platform on GitHub.",
    tags: ["business", "booking", "react", "postgres", "web"],
    screenshots: ["Services page", "Booking flow", "Admin area"],
    githubUrl: "https://github.com/HuzaifaAqeel/Wizards-Detailing",
  },
  {
    id: "aura-robot",
    title: "AURA Robot System — Face-Recognition Attendance",
    category: "web",
    year: "2025",
    tagline: "University attendance with face recognition and a web admin panel",
    description:
      "A university attendance and information system combining a face-recognition service with a full web admin panel, including a kiosk-mode face-scanner interface.",
    problem:
      "Manual attendance is slow, error-prone and hard to audit across students, teachers and timetables.",
    solution:
      "Built an admin panel with secure login, student face enrollment, and teacher, subject and timetable management, plus a kiosk-mode scanner interface.",
    technologies: ["JavaScript", "Python", "Node.js", "Face recognition"],
    role: "Full-stack developer — admin panel, enrollment and kiosk interface.",
    features: [
      "Secure login and student face enrollment",
      "Teacher, subject and timetable management",
      "Kiosk-mode face-scanner interface",
      "Attendance records in a web admin panel",
    ],
    result:
      "Built as a complete attendance system on GitHub, from scanner to admin panel.",
    tags: ["face recognition", "attendance", "admin", "web"],
    screenshots: ["Admin panel", "Face enrollment", "Kiosk scanner"],
    githubUrl: "https://github.com/HuzaifaAqeel/Aura-Bot",
  },
  {
    id: "multipdf-rag-chatbot",
    title: "MultiPDF RAG Chatbot",
    category: "data",
    year: "2024",
    tagline: "Chat with multiple PDFs, with citations per document",
    description:
      "A Streamlit RAG chatbot that lets users upload multiple PDFs, chunk and embed them with FAISS, and ask questions answered by Gemini with per-document citations.",
    problem:
      "Answers from long PDFs are hard to trust when you cannot see which document they came from.",
    solution:
      "Used PyPDF2 extraction, LangChain chunking, FAISS retrieval and Gemini, with citations back to each source document.",
    technologies: ["Python", "Streamlit", "LangChain", "FAISS", "Gemini", "PyPDF2"],
    role: "Designer and builder — extraction, retrieval, chat and citations.",
    features: [
      "Multiple PDF upload and chat",
      "LangChain chunking and FAISS retrieval",
      "Gemini answers with per-document citations",
      "Streamlit interface for non-technical users",
    ],
    result:
      "Published on GitHub as a complete, reusable PDF chat product.",
    tags: ["rag", "pdf", "gemini", "faiss", "ai"],
    screenshots: ["PDF upload", "Chat with citations", "Document view"],
    githubUrl: "https://github.com/HuzaifaAqeel/MultiPDF-RAG-Chatbot",
  },
  {
    id: "youtuberag",
    title: "YoutubeRAG — Chat with YouTube Videos",
    category: "ai",
    year: "2024",
    tagline: "Paste a YouTube link or upload, get the transcript, then ask questions",
    description:
      "A Streamlit app that takes a YouTube link or upload, gets the transcript, and lets users chat with the video content via Gemini.",
    problem:
      "Long videos are hard to search — you want the answer, not to rewatch the whole thing.",
    solution:
      "Built transcript extraction plus a Gemini chat layer over the transcript, so questions are answered from the video itself.",
    technologies: ["Python", "Streamlit", "Gemini", "YouTube transcripts"],
    role: "Designer and builder — transcript pipeline and chat.",
    features: [
      "YouTube link and upload support",
      "Transcript extraction",
      "Gemini chat over video content",
      "Streamlit interface",
    ],
    result:
      "Published on GitHub as a complete video-chat product.",
    tags: ["youtube", "rag", "gemini", "streamlit", "ai"],
    screenshots: ["Video input", "Transcript view", "Chat"],
    githubUrl: "https://github.com/HuzaifaAqeel/YoutubeRAG",
  },
  {
    id: "realtime-voice-assistant",
    title: "Realtime Voice Assistant",
    category: "ai",
    year: "2025",
    tagline: "Voice pipeline: VAD, Groq Whisper, Llama responses, ElevenLabs speech",
    description:
      "A realtime voice assistant pipeline with microphone voice activity detection, Groq Whisper transcription, Llama responses and ElevenLabs speech, built for low-latency conversation.",
    problem:
      "Voice assistants feel slow when transcription, reasoning and speech are not streamed as one pipeline.",
    solution:
      "Wired VAD, streaming Whisper transcription, Llama reasoning and ElevenLabs TTS into a single low-latency conversational loop.",
    technologies: ["Python", "Groq Whisper", "Llama", "ElevenLabs", "Voice Activity Detection"],
    role: "Designer and builder — voice pipeline and conversational loop.",
    features: [
      "Microphone VAD and streaming transcription",
      "Llama responses over the live transcript",
      "ElevenLabs speech output",
      "Low-latency conversational design",
    ],
    result:
      "Published on GitHub as a complete realtime voice pipeline.",
    tags: ["voice", "whisper", "llama", "ai"],
    screenshots: ["Voice interface", "Transcript stream", "Response loop"],
    githubUrl: "https://github.com/HuzaifaAqeel/Realtime-Voice-Assistant",
  },
  {
    id: "agent-red-team-eval",
    title: "Agent Red-Team Eval",
    category: "ai",
    year: "2025",
    tagline: "280+ prompt-injection and tool-exfiltration probes for AI agents",
    description:
      "A red-team security evaluation harness for AI agents with 280+ prompt-injection and tool-exfiltration probes, a synthetic gateway and CI-ready reports.",
    problem:
      "Agents that use tools can be tricked into leaking data or taking unsafe actions, and teams need a repeatable way to test that.",
    solution:
      "Built a probe harness with a synthetic gateway and CI-ready reports, so agent safety can be tested the same way on every change.",
    technologies: ["Python", "Agent evaluation", "Prompt injection testing", "CI reporting"],
    role: "Designer and builder — probes, gateway and reports.",
    features: [
      "280+ injection and exfiltration probes",
      "Synthetic gateway for safe testing",
      "CI-ready evaluation reports",
      "Repeatable agent safety checks",
    ],
    result:
      "Published on GitHub as a reusable agent-safety evaluation harness.",
    tags: ["evaluation", "safety", "red-team", "agents", "ai"],
    screenshots: ["Probe suite", "Gateway view", "Eval report"],
    githubUrl: "https://github.com/HuzaifaAqeel/Agent-Red-Team-Eval",
  },
  {
    id: "wordpress-woocommerce",
    title: "WordPress & WooCommerce Client Sites",
    category: "web",
    year: "2024",
    tagline: "Custom themes, Elementor builds, WooCommerce shops and migrations",
    description:
      "WordPress websites and WooCommerce shops for local and international clients: custom and child themes, Elementor and Theme Builder layouts, Figma-to-WordPress builds, and performance, SEO and security work.",
    problem:
      "Small businesses need a site that looks custom, loads fast, sells, and can be updated without a developer every time.",
    solution:
      "Built custom themes and page templates, customized plugins, resolved theme and plugin conflicts, and handled speed optimization, backups, updates and migrations through cPanel and hosting.",
    technologies: ["WordPress", "Elementor", "WooCommerce", "PHP", "MySQL", "ACF", "Gutenberg"],
    role: "WordPress developer — themes, builds, shops, fixes and maintenance.",
    features: [
      "Custom and child themes, custom post types and ACF",
      "Elementor and Theme Builder headers, footers and archives",
      "WooCommerce shop, cart and checkout customization",
      "Speed, on-page SEO, security hardening and migrations",
    ],
    result:
      "Delivered as ongoing client work since 2023, alongside MERN and AI projects.",
    tags: ["wordpress", "woocommerce", "elementor", "php", "web"],
    screenshots: ["Theme build", "Shop page", "Elementor layout"],
  },
  {
    id: "portfolio-os",
    title: "Portfolio OS — This Windows XP Portfolio",
    category: "web",
    year: "2026",
    tagline: "A portfolio that behaves like a Windows XP desktop",
    description:
      "The site you are using right now: a hand-built Windows XP style desktop with a window manager, Explorer navigation, Start menu, search and personalization — rebuilt with Huzaifa's real projects, skills and experience.",
    problem:
      "Most developer portfolios look identical — hero, three cards, contact form. Memorable work needs a memorable container, without losing usability.",
    solution:
      "Modelled the whole UI as an OS: drag, resize, minimize and maximize windows, Explorer with navigation history, a Start menu with search, and a reusable dialog system, all in hand-written Aero-style CSS.",
    technologies: ["React 19", "TypeScript", "TanStack Start", "Custom CSS", "Vercel"],
    role: "Design, architecture and implementation.",
    features: [
      "Window manager: drag, resize, minimize, maximize, stacking",
      "Explorer with breadcrumbs, back/forward history and live search",
      "Start menu with search, right-click desktop menu and personalization",
      "Keyboard support, reduced-motion support, mobile layout",
    ],
    result:
      "Live at huzaifaaqeel.vercel.app, with its code on GitHub for future edits.",
    tags: ["portfolio", "react", "typescript", "css", "web", "windows"],
    screenshots: ["Desktop with open windows", "Explorer grid", "Start menu"],
    liveUrl: "https://huzaifaaqeel.vercel.app",
    previewUrl: "https://huzaifaaqeel.vercel.app",
    githubUrl: "https://github.com/HuzaifaAqeel/Portfolio",
    featured: true,
  },
];

export interface SkillGroup {
  name: string;
  skills: { name: string; score: number; note: string }[];
}

export const skillGroups: SkillGroup[] = [
  {
    name: "Web Development",
    skills: [
      { name: "React & TypeScript", score: 9.0, note: "Production apps since 2022" },
      { name: "Node.js & Express APIs", score: 8.8, note: "JWT auth, RBAC, Zod validation" },
      { name: "Tailwind CSS & shadcn/ui", score: 8.8, note: "Design systems and dashboards" },
      { name: "MongoDB & PostgreSQL", score: 8.5, note: "Schema design, indexing, aggregation" },
    ],
  },
  {
    name: "AI & Agents",
    skills: [
      { name: "LangChain & LangGraph Agents", score: 9.0, note: "Multi-agent, ReAct, HITL" },
      { name: "RAG & Hybrid Search", score: 8.9, note: "BM25 + Milvus/FAISS, RRF, reranking" },
      { name: "MCP Servers & Clients", score: 8.6, note: "Spec-faithful Python framework" },
      { name: "Voice AI Pipelines", score: 8.2, note: "VAD, Whisper, streaming TTS" },
    ],
  },
  {
    name: "WordPress & CMS",
    skills: [
      { name: "WordPress Themes & Elementor", score: 8.8, note: "Custom, child and Theme Builder" },
      { name: "WooCommerce", score: 8.4, note: "Shops, cart and checkout" },
      { name: "PHP & MySQL", score: 8.3, note: "Snippets, functions.php, integrations" },
    ],
  },
  {
    name: "Automation & Tools",
    skills: [
      { name: "AI Automation & Workflows", score: 8.7, note: "n8n, GoHighLevel, Gmail and CRM flows" },
      { name: "Python & FastAPI", score: 8.8, note: "Pipelines, APIs and Streamlit apps" },
      { name: "Git, GitHub & Vercel", score: 9.0, note: "Deployment, CI basics, Docker" },
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
    company: "TheHexaSystem",
    role: "Founder — AI Automation Agency",
    duration: "2025 — Present",
    summary:
      "Founder of his own AI automation agency, building client systems and the agency site itself, from services and funnels to voice agents and automation.",
    responsibilities: [
      "Own the agency site, services, process and booking flow end to end",
      "Build AI automation, GoHighLevel funnels and client workflows",
      "Handle client requirements, revisions and delivery directly",
    ],
    achievements: [
      "Agency site live at thehexasystems.com with a full design-system codebase",
      "GoHighLevel qualification funnels and automation work delivered for clients",
    ],
  },
  {
    company: "Robox AI",
    role: "AI Automation Engineer",
    duration: "2025 · 6 months",
    summary:
      "Automated repetitive business operations by combining LLM agents with workflow automation — API chaining, scheduled jobs and webhooks — into end-to-end pipelines.",
    responsibilities: [
      "Build document-intelligence automations with Pydantic-validated extraction and human-in-the-loop review",
      "Create email-processing automations: classification, summarization and draft replies via the Gmail API",
      "Connect CRMs, spreadsheets and notification channels into autonomous workflows",
    ],
    achievements: [
      "Document, email and CRM automations shipped as end-to-end pipelines",
    ],
  },
  {
    company: "PIAIC",
    role: "AI Engineer — Projects for International Clients",
    duration: "2025",
    summary:
      "Delivered AI projects for international clients through the PIAIC program, owning scoping, build and deployment.",
    responsibilities: [
      "Build custom RAG chatbots and AI assistants grounded in client documents",
      "Prototype agent-based systems (research agents, support copilots) with LangChain and Gemini",
      "Iterate on tool design and prompts with clients",
    ],
    achievements: [
      "Client RAG and agent prototypes delivered through the program",
    ],
  },
  {
    company: "CyberGrabs (Remote, International)",
    role: "AI Agentic Engineer",
    duration: "2024 · 6 months, remote",
    summary:
      "Designed and built autonomous AI agents with LangChain and LangGraph for lead qualification, support triage and document processing.",
    responsibilities: [
      "Build tool-using ReAct agents wired into CRMs, email and internal APIs",
      "Build RAG pipelines over company knowledge bases (FAISS + Gemini embeddings)",
      "Engineer prompt templates, guardrails and fallback logic for production conversations",
    ],
    achievements: [
      "Production agent workflows with grounding, guardrails and fallbacks",
    ],
  },
  {
    company: "Aridian Array Software Society",
    role: "Full-Time Web Developer",
    duration: "2024 — 2025 · 1 year",
    summary:
      "Worked full-time on client and in-house web projects across the MERN stack, from feature development to production deployment.",
    responsibilities: [
      "Build responsive React + TypeScript front ends with Tailwind CSS and reusable components",
      "Develop secure Node.js/Express REST APIs with JWT auth, role-based access and Zod inputs",
      "Design MongoDB schemas with Mongoose, aggregation pipelines and indexing",
      "Work in Agile sprints with Git branching and code reviews",
    ],
    achievements: [
      "Client and in-house MERN projects shipped to Vercel and Render",
    ],
  },
  {
    company: "Rawalpindi Institute of Technology (RIT)",
    role: "Web Developer",
    duration: "2022 — 2023",
    summary:
      "Developed and maintained the institute's official website, covering admissions, academic programs, faculty profiles, and news and events.",
    responsibilities: [
      "Build an online admission enquiry system with validated forms and an admin panel",
      "Implement student notices and results display pages",
      "Improve mobile responsiveness and page-load performance, and fix cross-browser bugs",
      "Coordinate with institute administration on content and updates",
    ],
    achievements: [
      "Institute website, enquiry system and academic pages maintained and improved",
    ],
  },
  {
    company: "AWF Pvt. Ltd.",
    role: "Web Developer (MERN) & Associate WordPress Developer",
    duration: "1 year, full-time",
    summary:
      "Developed full-stack web applications with React, Node.js, Express and MongoDB, and maintained WordPress sites with Elementor.",
    responsibilities: [
      "Build full-stack apps with auth, forms and database workflows",
      "Build and maintain WordPress sites: theme customization, responsive fixes and content updates",
      "Integrate third-party APIs, payment and form workflows, and authentication",
      "Test, debug and optimize performance across browsers",
    ],
    achievements: [
      "MERN and WordPress projects delivered with post-launch maintenance",
    ],
  },
  {
    company: "Freelance — Web & AI",
    role: "Freelance Full-Stack Web Developer & AI Engineer",
    duration: "2023 — Present",
    summary:
      "Designed and delivered full-stack web applications and AI systems for startups and individual clients, owning the full lifecycle from requirements to deployment and maintenance.",
    responsibilities: [
      "Build responsive React + TypeScript front ends and secure Node.js/Express APIs",
      "Embed AI/LLM features (chat, summarization, document Q&A) via Python microservices and Gemini",
      "Deliver WordPress sites, landing pages and MERN projects for international clients",
      "Manage client requirements, revisions and timelines directly",
    ],
    achievements: [
      "30+ AI systems and multiple full-stack client products delivered",
    ],
  },
];

export const education = [
  {
    school: "University Institute of Information Technology (UIIT), Rawalpindi",
    award: "BS Computer Science",
    duration: "2022 — 2026",
    note: "CGPA 3.5/4.0. Degree complete.",
  },
  {
    school: "Presidential Initiative for Artificial Intelligence & Computing (PIAIC)",
    award: "AI Agentic Engineer",
    duration: "2023 — 2024",
    note: "Agentic AI training: LangChain, LangGraph, RAG and agent systems.",
  },
  {
    school: "Fazaia Inter College, Jinnah Camp, Nur Khan",
    award: "Pre-Engineering",
    duration: "2019 — 2021",
    note: "975/1100.",
  },
  {
    school: "Certifications (selected)",
    award: "Meta, DeepLearning.AI, LangChain Academy, MongoDB, freeCodeCamp",
    duration: "2022 — Present",
    note: "Meta Front-End and Back-End, DeepLearning.AI (Deep Learning, NLP, Generative AI, LangChain, Vector Databases), LangChain Academy (AI Agents in LangGraph), MongoDB Associate Developer, freeCodeCamp JavaScript and Responsive Web Design.",
  },
];

export const interests = [
  "Building AI agents, RAG systems and multi-agent platforms",
  "Open-source AI projects on GitHub — RAG, MCP, evaluation and voice",
  "Full-stack client work: WordPress, MERN and AI automation",
  "Learning new LLM tools, frameworks and deployment patterns",
];

export const recycleBin = [
  { name: "Single-Prompt Wrappers", note: "Agents with one prompt and no tools, retrieval or guardrails. Not real agent work." },
  { name: "Unfinished Ideas", note: "A note-taking app. Everyone has one. Mine is 40% done." },
  { name: "Bugs I Pretend Never Happened", note: "The timezone incident. We do not discuss it." },
  { name: "Rejected Concepts", note: "A client site with an intro animation you could not skip." },
  { name: "Sleep Schedule", note: "Deleted during deadline week. Recovery attempts ongoing." },
  { name: "Old Demo Projects", note: "Template projects from a remix, replaced by real work. Kept for perspective." },
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
