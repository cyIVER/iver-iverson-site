#!/usr/bin/env bash
set -euo pipefail

repo="${1:-}"
if [[ -z "$repo" ]]; then
  echo "usage: ./runner/start-runner.sh OWNER/REPO" >&2
  exit 2
fi

if [[ -z "${GH_TOKEN:-}${GITHUB_TOKEN:-}" ]]; then
  echo "GH_TOKEN or GITHUB_TOKEN must be set in the current shell." >&2
  exit 1
fi

token="${GH_TOKEN:-${GITHUB_TOKEN:-}}"
api="https://api.github.com/repos/${repo}/actions/runners/registration-token"
runner_url="https://github.com/${repo}"
image="iver-iverson-site-runner:local"
name="iver-site-$(date +%Y%m%d%H%M%S)"

registration_token="$(curl -fsSL \
  -X POST \
  -H "Authorization: Bearer ${token}" \
  -H "Accept: application/vnd.github+json" \
  "${api}" | jq -r '.token')"

if [[ -z "$registration_token" || "$registration_token" == "null" ]]; then
  echo "failed to obtain runner registration token" >&2
  exit 1
fi

docker build -t "$image" runner
docker run --rm -it \
  --name "$name" \
  -e RUNNER_URL="$runner_url" \
  -e RUNNER_TOKEN="$registration_token" \
  -e RUNNER_NAME="$name" \
  -e RUNNER_LABELS="docker-desktop,ephemeral" \
  "$image"
