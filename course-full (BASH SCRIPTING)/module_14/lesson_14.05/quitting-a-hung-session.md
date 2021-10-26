---
title: "Quitting a hung session"
# description:
---

# Quitting a hung session


If the SSH connection has died for some reason, such as disconnecting the network or the server restarting, it is possible for the remote shell to become unresponsive. At this point nothing you type shows up in the terminal, and it could take a very long time before the client overshoots a relevant timeout and disconnects automatically. Luckily there’s a simple key sequence which you can send to tell the client to close immediately: *Enter, ~ (tilde), . (full stop).*

- *Enter* is necessary because the sequence is only detected at the start of a line.
- Tilde is the default SSH client escape character (`-e escape_char` in `man ssh`).
- Full stop finally tells the client to close the connection.
