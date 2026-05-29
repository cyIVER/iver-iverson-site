#!/usr/bin/env bash
set -euo pipefail

repo="${1:-}"
if [[ -z "$repo" ]]; then
  echo "usage: ./runner/preflight.sh OWNER/REPO" >&2
  exit 2
fi

need() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "missing required command: $1" >&2
    exit 1
  fi
}

need git
need node
need npm
need docker
need curl
need jq

if ! docker info >/dev/null 2>&1; then
  echo "Docker is installed but the daemon is not reachable." >&2
  exit 1
fi

if [[ -z "${GH_TOKEN:-}${GITHUB_TOKEN:-}" ]]; then
  echo "GH_TOKEN or GITHUB_TOKEN must be set in the current shell." >&2
  exit 1
fi

token="${GH_TOKEN:-${GITHUB_TOKEN:-}}"
api="https://api.github.com/repos/${repo}"

status="$(curl -sS -o /tmp/iver-site-gh-preflight.json -w "%{http_code}" \
  -H "Authorization: Bearer ${token}" \
  -H "Accept: application/vnd.github+json" \
  "${api}")"

rm -f /tmp/iver-site-gh-preflight.json

if [[ "$status" != "200" ]]; then
  echo "GitHub API preflight failed for ${repo} with HTTP ${status}." >&2
  exit 1
fi

echo "preflight passed for ${repo}"
