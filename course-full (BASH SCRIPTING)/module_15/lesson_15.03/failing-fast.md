---
title: "Failing fast"
# description:
---

# Failing fast


**Aim of this section:** Avoid cascading failures and hard–to–debug situations by exiting the script at the first sign of trouble.

T> See [Fail–Fast Settings](#fail-fast-settings) for an in–depth discussion of why, how and when these settings protect you.

A [fail–fast](https://en.wikipedia.org/w/index.php?title=Fail-fast&oldid=988127386) script exits as soon as it encounters an error. You can think of it as pre–flight checks: everything has to line up *just so* for the script to do its job properly. Continuing in case of an error does not guarantee failure, but

- there are generally many more ways a command can fail than succeed,
- the failure modes are usually not tested, and
- failure modes compound when running more commands with broken state.

So you will be very lucky to get the result you want despite an error, and pretty lucky if all you have to do is tweak something before re–running the command. Permanent data loss (even unrelated to the input data) or ending up in an unknown state are common results.

One common example is using a command which is on the `$PATH` to do some pre–processing. `$PATH` will be defined in an interactive shell, but *not* in a crontab. If you don’t stop the script when the pre–processing fails, the rest of the script often runs like a train wreck: it gets into an infinite loop, fills up the disk with useless data until it crashes, or modifies files it should never have touched.

This is not an academic problem. For example, the Linux client for the massively popular Steam gaming platform had a devastating [bug](https://github.com/ValveSoftware/steam-for-linux/issues/3671) which in some circumstances **deleted every single file on the machine which was owned by the current user!**

By default, Bash does not fail fast. In interactive shells that’s useful – you don’t want your terminal to quit just because of a typo – but in scripts you’ll want to err on the safe side. To enable several safeguards you can simply add the following as the first code, after the shebang line and documentation but before doing anything else:

{lang=bash,crop-start-line=3}
<<[walking-skeleton/error-handling-flags.bash](./protected/code/src/walking-skeleton/error-handling-flags.bash)

T> For simplicity’s sake I’ve left some of these out of scripts where they don’t apply, but it’s generally safer to just start with all of them enabled.
