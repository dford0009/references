---
title: "Jump server"
# description:
---

# Jump server


When working with a service consisting of many separate hosts it is common to have a dedicated host which is used as an entry point for SSH connections. Usually this jump server has no other services running on it. This can make connecting to a host behind the jump server cumbersome, having to first `ssh JUMP_HOST` to get a shell on the jump server and then `ssh SERVICE` to get to the relevant service host. If most of the work is on the service host it is convenient to set up the SSH client to automatically connect via the jump server. This is easily achieved within ~/.ssh/config. For example, with “jump.example.org” as the externally available jump server and  “service” as the internal host:

{lang="text"}
```
Host service
    ProxyJump jump.example.org
```

This way connecting to the service host via the jump server is as simple as `ssh service`.
