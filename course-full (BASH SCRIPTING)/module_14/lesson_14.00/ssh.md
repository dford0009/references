---
title: "SSH"
# description:
---

# SSH {#ssh}

By far the most popular way to connect securely to other hosts from Bash is using the [OpenSSH](https://www.openssh.com/) suite of tools. If you administer *any* \*nix host there’s a good chance it’s already running an SSH service. This chapter looks into common use cases and pitfalls.

T> If you’re unsure whether you are running an SSH service you can check the output of `ps ax | grep '[/]sshd'` – it should list one or more processes if it’s running. You could also try to connect to the local service by running `ssh 127.0.0.1`, but interpreting the results might actually be a bit harder. A “Permission denied” error message, password prompt or simply getting a Bash prompt with no output are sure signs that an SSH service is running.
