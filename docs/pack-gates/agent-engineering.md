# agent-engineering Gate

Automation design:

- Static Next.js export with deterministic local gates.
- GitHub Pages deploy workflow uses `npm ci`, lint, typecheck, content gate, public-safety gate, build, and internal link check.
- Repo-scoped Docker Desktop runner setup lives in `runner/`.
- Runner scripts use environment tokens only and request short-lived registration tokens from GitHub.

Failure modes:

- Missing/invalid token blocks GitHub repo setup and runner registration.
- Docker daemon unavailable blocks local runner start.
- Browser install unavailable blocks Playwright verification.
