#!/usr/bin/env bash
set -euo pipefail

repo_name="${1:-iver-iverson-site}"
description="Portfolio site for Iver Iverson: AI-era cyber investigator."

if ! command -v gh >/dev/null 2>&1; then
  echo "gh is required" >&2
  exit 1
fi

if gh repo view "$repo_name" >/dev/null 2>&1; then
  echo "repository already exists: ${repo_name}"
else
  gh repo create "$repo_name" --public --description "$description" --source . --remote origin
fi

gh api \
  -X POST \
  -H "Accept: application/vnd.github+json" \
  "/repos/:owner/${repo_name}/pages" \
  -f source='{"branch":"gh-pages","path":"/"}' >/dev/null 2>&1 || true

echo "repository ready: ${repo_name}"
