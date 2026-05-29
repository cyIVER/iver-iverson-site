export const site = {
  name: "Iver Iverson",
  title: "AI-era cyber investigator",
  description:
    "Authority portfolio for agentic threat hunting, autonomous triage, MCP architecture, and cyber education platforms.",
  repoName: "iver-iverson-site",
  email: "contact@example.com"
};

export function withBasePath(path: string) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  if (!path.startsWith("/")) return path;
  return `${basePath}${path}`;
}
