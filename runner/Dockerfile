FROM ubuntu:24.04

ARG RUNNER_VERSION=2.324.0

RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    ca-certificates curl git jq libicu-dev sudo tar \
  && rm -rf /var/lib/apt/lists/*

RUN useradd -m -s /bin/bash runner \
  && echo "runner ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/runner

USER runner
WORKDIR /home/runner

RUN curl -fsSL -o actions-runner-linux-x64.tar.gz \
    "https://github.com/actions/runner/releases/download/v${RUNNER_VERSION}/actions-runner-linux-x64-${RUNNER_VERSION}.tar.gz" \
  && mkdir actions-runner \
  && tar xzf actions-runner-linux-x64.tar.gz -C actions-runner \
  && rm actions-runner-linux-x64.tar.gz

WORKDIR /home/runner/actions-runner
COPY --chown=runner:runner entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
