---
title: "Connecting to a host interactively"
# description:
---

# Connecting to a host interactively


`ssh HOST`, for example `ssh example.org`, is the most common SSH connection command. If everything is set up properly you should now be running a shell on the server. If this does not work out of the box you may want to check with the system administrator. Depending on the setup changes might be necessary on the client or server to enable this simplicity.

T> The shell on the other host might not be Bash, but if it’s any common shell you should be able to tell by running `echo "$SHELL"`. If that does not end in `/bash` you could try running `exec bash` to replace the current shell with a Bash shell. If that doesn’t work you might just have to familiarize yourself with another shell or ask the system administrator to install a familiar shell.
