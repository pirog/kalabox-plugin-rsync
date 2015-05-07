# docker build -t kalabox/git .

FROM kalabox/debian:stable

RUN \
  mkdir -p /usr/local/bin && \
  mkdir -p /root/.ssh

COPY krsync /usr/local/bin/krsync
COPY ssh-config /root/.ssh/config

RUN chmod +x /usr/local/bin/krsync

ENTRYPOINT ["/usr/local/bin/krsync"]
