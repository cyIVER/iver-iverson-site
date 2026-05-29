#!/usr/bin/env bash
set -euo pipefail

: "${RUNNER_URL:?RUNNER_URL is required}"
: "${RUNNER_TOKEN:?RUNNER_TOKEN is required}"
: "${RUNNER_NAME:=docker-desktop-ephemeral}"
: "${RUNNER_LABELS:=docker-desktop,ephemeral}"

cleanup() {
  ./config.sh remove --unattended --token "$RUNNER_TOKEN" || true
}
trap cleanup EXIT INT TERM

./config.sh \
  --url "$RUNNER_URL" \
  --token "$RUNNER_TOKEN" \
  --name "$RUNNER_NAME" \
  --labels "$RUNNER_LABELS" \
  --unattended \
  --ephemeral \
  --replace

exec ./run.sh
