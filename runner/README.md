# Repo-Scoped Docker Desktop Runner

This folder contains a disposable self-hosted GitHub Actions runner setup for `iver-iverson-site`.

## Security Model

- Uses authenticated `gh` CLI when available, otherwise `GH_TOKEN` or `GITHUB_TOKEN` from the current shell.
- Does not write the PAT to disk.
- Requests a short-lived runner registration token from GitHub.
- Registers the container as repo-scoped with labels `self-hosted,docker-desktop,ephemeral`.
- Default container run is disposable. Remove the container after use.

## Commands

```bash
./runner/preflight.sh cyIVER/iver-iverson-site
./runner/start-runner.sh cyIVER/iver-iverson-site
```

If auth lacks access, refresh `gh` auth or export a valid token in the current shell. Do not place tokens in files.
