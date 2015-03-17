Kalabox Rsync
===================

A simple plugin to add rsync commands to your apps.

```

# docker build -t kalabox/git .

FROM kalabox/git:stable

RUN \
  apt-get update && \
  apt-get install -y rsync && \
  apt-get clean -y && \
  mkdir -p /usr/local/bin && \
  mkdir -p /root/.ssh

COPY krsync /usr/local/bin/krsync
COPY ssh-config /root/.ssh/config

RUN chmod +x /usr/local/bin/krsync

WORKDIR /data
ENTRYPOINT ["/usr/local/bin/krsync"]

```
