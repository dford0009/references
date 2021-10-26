---
title: "Handling signals"
# description:
---

# Handling signals


A *trap* is a signal handler specified in Bash. To set up a trap for any number of signals, use `trap COMMAND SIGNAL…`. Whenever the script receives any of these signals it will execute the command. `trap` supports some important pseudo–signals (that is, they can be trapped but are not “real” signals, so we can’t send them with `kill`):

- The `DEBUG` trap runs *before* every command. We can use it to print useful context such as the value of a variable or even to step through each line: `trap 'read -p "$BASH_COMMAND"' DEBUG`.
- The `ERR` trap runs when any of the conditions triggering `errexit` occur (it doesn’t override `errexit` though, so the script will still exit at that point). This can be useful to print specific debugging information, for example: `trap 'echo "$counter"' ERR`..
- The `EXIT` trap runs when a script is exiting. This is really helpful to do the kind of cleanup which should happen after the script has nothing else left to do, such as removing any temporary directories. This trap does not interrupt the termination of the script, so there is no need to run `exit` at the end of the `EXIT` trap code.
- The `RETURN` trap is similar to `EXIT`. It runs when a function or sourced script (that is, `. FILE` or `source FILE`) finishes.

For example:

{lang=bash,crop-start-line=6}
<<[signals/sigcont-trap-external.bash](./protected/code/src/signals/sigcont-trap-external.bash)

When this script starts it sets up the traps and sleeps repeatedly unless interrupted. Let’s explore how this works. Run the script, then press *Ctrl–z* to pause it, and then resume the script in the foreground by running `fg`. At this point the script should print “Continuing…”. Press *Ctrl–c* to terminate the script.

When triggering a trap this can be thought of as queuing a command to run after the current foreground process. This has some important side–effects:

- The code inside a trap can itself be interrupted. For example, try adding `sleep infinity;` to the start of the trap above. The trap ends up running forever, but we can still cancel it using *Ctrl–c.* In this case, the `echo` command never runs.
- The trap code might never even start. Starting from the original code above, try changing the `sleep` delay in the loop to `infinity`. When pressing *Ctrl–z* the `echo` command is scheduled, but the `sleep` command never finishes so `echo` never runs.

Bash builtin commands are *part of* the current foreground process. Unlike separate programs like `sleep` this means they will be suspended while the trap code runs. For example:

{lang=bash,crop-start-line=6}
<<[signals/sigcont-trap-builtin.bash](./protected/code/src/signals/sigcont-trap-builtin.bash)

When starting this program, it will wait until it receives a line of input. It then prints the line and exits. If we instead press *Ctrl–z* and run `fg`, the script prints “Continuing…” and then resumes waiting for input.

Since the trap command string is executed verbatim, it has the same issues as running code with `eval`. Therefore, it should be as simple as possible; simpler than normal code. One option is to put the command in a function, as in [`trap cleanup EXIT`](#temporary-files). The trap command runs in the same namespace as the command at which point it was invoked, so it has access to any context (like variables) which has changed during the script.

W> A common bug in traps is using double quotes around a command with a variable: `trap "echo \"$index\"" USR1`. The problem is that any variable within double quotes is going to be expanded *immediately,* not when the script receives a USR1 signal. Better to use single quotes (`trap 'echo "$index"' USR1`). Even better, call a function which just runs `echo "$index"`.

Whenever we set the code for a signal it replaces any existing code. This makes it difficult to modify signal handlers, since we have to not only deal with the complexity of `eval` but also have to avoid issues such as double command separators (ending up with nonsense like `first; && second`, for example), conflicting side effects, and whether the commands may end up running in a different order. Better to push that complexity into a function or script which can figure out which actions to take.
