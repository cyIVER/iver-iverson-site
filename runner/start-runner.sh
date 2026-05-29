#!/usr/bin/env bash
set -euo pipefail

repo="${1:-}"
if [[ -z "$repo" ]]; then
  echo "usage: ./runner/start-runner.sh OWNER/REPO" >&2
  exit 2
fi

runner_url="https://github.com/${repo}"
image="iver-iverson-site-runner:local"
name="iver-site-$(date +%Y%m%d%H%M%S)"

if command -v gh >/dev/null 2>&1 && gh api "repos/${repo}" >/dev/null 2>&1; then
  registration_token="$(gh api -X POST "repos/${repo}/actions/runners/registration-token" --jq '.token')"
else
  if [[ -z "${GH_TOKEN:-}${GITHUB_TOKEN:-}" ]]; then
    echo "Authenticated gh CLI or GH_TOKEN/GITHUB_TOKEN is required." >&2
    exit 1
  fi
  if ! command -v jq >/dev/null 2>&1; then
    echo "jq is required when using curl token fallback." >&2
    exit 1
  fi
  token="${GH_TOKEN:-${GITHUB_TOKEN:-}}"
  registration_token="$(curl -fsSL \
    -X POST \
    -H "Authorization: Bearer ${token}" \
    -H "Accept: application/vnd.github+json" \
    "https://api.github.com/repos/${repo}/actions/runners/registration-token" | jq -r '.token')"
fi

if [[ -z "$registration_token" || "$registration_token" == "null" ]]; then
  echo "failed to obtain runner registration token" >&2
  exit 1
fi

docker build -t "$image" runner
docker run --rm \
  --name "$name" \
  -e RUNNER_URL="$runner_url" \
  -e RUNNER_TOKEN="$registration_token" \
  -e RUNNER_NAME="$name" \
  -e RUNNER_LABELS="docker-desktop,ephemeral" \
  "$image"
