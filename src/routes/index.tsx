import { createFileRoute } from "@tanstack/react-router";
import { Desktop } from "@/components/win7/Desktop";

const title = "Muhammad Huzaifa Aqeel - Portfolio Desktop | Full-Stack & AI Agentic Developer";
const description =
  "Explore Muhammad Huzaifa Aqeel's portfolio the way you would explore a computer: open folders, browse his web and AI projects, and read case studies inside a hand-built Windows XP style desktop.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <Desktop />;
}
