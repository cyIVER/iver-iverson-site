# Iver Iverson Site

Static authority portfolio for Iver Iverson: **AI-era cyber investigator**.

## Stack

- Next.js App Router with `output: "export"` for GitHub Pages.
- Markdown/MDX content in `content/`.
- Build-time Markdown rendering with `gray-matter`, `unified`, `remark-gfm`, and `rehype-stringify`.
- Playwright smoke tests for responsive, console, and interaction checks.

## Dependency Notes

- `@phosphor-icons/react`: one icon family for UI controls and external/download cues.
- Markdown pipeline packages: render local `.mdx` content during static export without a server runtime.
- Playwright: browser QA gate for navigation, filtering, screenshots, and console checks.

## Local Commands

```bash
npm install
npm run dev
npm run qa
```

## GitHub Pages

The deploy workflow sets `NEXT_PUBLIC_BASE_PATH=/iver-iverson-site` for project-page hosting.

## Runner

Repo-local Docker Desktop runner automation lives in `runner/`. It uses `GH_TOKEN` or `GITHUB_TOKEN` from the environment and never writes PATs to disk.
