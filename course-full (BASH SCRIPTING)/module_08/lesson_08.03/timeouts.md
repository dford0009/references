---
title: "Timeouts"
# description:
---

# Timeouts


`timeout DURATION COMMAND` [kills](#kill) the command and returns a non–zero exit code if it is still running after the duration has elapsed. While this command looks helpful, it would be a code smell in a production pipeline. Long–running processes are common, and not necessarily a sign of a problem. Using a flat timeout for the running time of a whole command is usually too simple an approach to be useful. And finally, a lot of programs which deal with requests which may time out, such as `ping` or `curl`, have their own timeout mechanisms which are probably more useful because they will be able to do their own reporting of the failure.
