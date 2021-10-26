---
title: "Sending signals"
# description:
---

# Sending signals


`kill [-SIGNAL] PID…` sends the given signal to all the given process IDs (except for signals 0, SIGKILL, SIGSTOP and SIGTSTP, which sends the given signal to the kernel). For example, `kill -TERM 123` sends SIGTERM to the process with ID 123. Each process can either “[trap](#traps)” the signal or let the kernel perform the default action on the process, as documented in `man 7 signal`.

T> The signal can also be specified with the “SIG” prefix, as in `kill -SIGTERM PID…`, or with the signal number, as in `kill -15 PID…`.

`kill` is a shell builtin, but `help kill` is not very detailed. Some of the documentation in `man kill` applies to the builtin as well, except for things like the different options.
