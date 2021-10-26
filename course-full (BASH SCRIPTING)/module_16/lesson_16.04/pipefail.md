---
title: "pipefail"
# description:
---

# pipefail


A pipeline only has a single exit code. By default this is the exit code of *the last command in the pipeline.* This is bad — in production–quality code we want to make sure that every non–zero exit code is either explicitly handled or results in the script failing immediately. Take this script for example:

{lang=bash}
<<[walking-skeleton/pipefail-benign-error-example.bash](./protected/code/src/walking-skeleton/pipefail-benign-error-example.bash)

If there is no README.md file in the current directory this script will succeed: `grep` will helpfully report

> grep: ./README.md: No such file or directory

but the exit code of the script will be zero. Often you don’t care about this specific error, but what if the error is something more insidious? Consider this script:

{lang=bash}
<<[walking-skeleton/pipefail-dangerous-error-example.bash](./protected/code/src/walking-skeleton/pipefail-dangerous-error-example.bash)

This *should* show every listening TCP network service running on the machine. Let’s say it’s also part of a bigger system to report targets for security auditing, so we want to make the output easily processable. There’s no option to omit the two–line header from `netstat` output so we use `tail` to print only line three onwards.

There’s a bug in this script, but it’s subtle. Like the “curious incident of the dog in the night–time” from Sherlock Holmes the *absence* of something can indicate a problem. Consider what happens when there *is* no `netstat` command on the system, such as on a minimal installation:

1. The first command fails because `netstat` does not exist on the `$PATH`. Bash reports the missing command, but that information may be silenced or lost in the noise of the overall system.
1. The second command always succeeds, and ends up printing nothing.
1. The exit code of the *second* command is returned by the script.

The result is that it *looks like* there is nothing to report, when in reality the script failed to *check* whether there is anything to report!

The easy way to fix this is with `pipefail`: the exit code of the pipeline becomes the exit code of the last (rightmost) command which failed. If none of the commands fail the exit code is zero. Combining this with `errexit` we get this script:

{lang=bash}
<<[walking-skeleton/pipefail-example.bash](./protected/code/src/walking-skeleton/pipefail-example.bash)

Now if the first command fails for whatever reason the script will fail immediately. We can then either handle or report the error in the caller, all the way to the end user.

T> Some sub–optimal solutions to this problem are common. One possibility would be to use temporary files instead of a pipeline, but that would be inefficient and more complicated. Another would be to check for the existence of the command before using it, but that’s an example of [asking when we should be telling](https://pragprog.com/articles/tell-dont-ask) — it’s a poor substitute for catching the actual error. It would not work if the error was an unknown `netstat` option, for example.

If you want to detect and react to specific exit codes from specific commands in a pipeline there is the `$PIPESTATUS` array variable. For example, let’s expand on the previous script:

{lang=bash}
<<[walking-skeleton/pipestatus-example.bash](./protected/code/src/walking-skeleton/pipestatus-example.bash)

The `grep` manual states that it will return exit code 1 if no lines are output, but in this script that is actually the ideal state – no services are exposed to the world. So in order to be able to detect any *other* issues with this pipeline we have to check each of the return codes and verify that *only* `grep` returned 1, and that all the other commands succeeded.

Since `$PIPESTATUS` is set on *every* command we have to check the entire array in a single command or [copy the array](#indexed-array-copying) to a different one before checking each exit code separately. Which one you choose depends on how detailed error handling you want.
