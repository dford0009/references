---
title: "Signals"
# description:
---

# Signals {#signals}

Prerequisites: Before reading this chapter, you should be familiar with [running scripts](#running-scripts).

Signals are a limited form of inter–process communication, used to send asynchronous notifications to processes. Within Bash, signals can be sent using [the `kill` command](#kill) and are handled by *[traps](#traps).* When a process is running in the foreground (that is, we’re waiting for it to finish before being able to run another command) we can also send some signals to the foreground process using keyboard shortcuts.

Let’s start by looking into the above in terms of a signal you might already be familiar with. **SIGINT,** the *keyboard interrupt* signal, is sent to the foreground process when pressing *Ctrl–c.* Try running for example `sleep infinity`, which would normally run forever in the foreground. Press *Ctrl-c* to interrupt it. At this point, Bash prints `^C` at the cursor position to indicate where in the output stream of the foreground process the shortcut was pressed, terminates the `sleep` process, and returns to the prompt:

{lang="console"}
```
$ sleep infinity
^C
$ █
```

T> `^C` is an example of one format for representing a keyboard shortcut: pressing *Ctrl* (`^`) followed by a letter (in this case `C`). The letter is always printed in uppercase, whether or not *Shift* is involved in the keyboard shortcut.

Pressing *Ctrl-c* on the Bash prompt itself also prints `^C` followed by a new prompt, but does not exit the Bash process. This is a handy way to cancel editing the current command without having to erase it before starting the next command.

T> This chapter just covers the most common signals; see `man 7 signal` and the “Signals” section of `man bash` for details.

0 (zero) is not a “real” signal – it is used to check whether a process is still running. `kill -0 PID…` checks whether the given PIDs are still running and returns successfully if at least one of them still is. Can’t be [trapped](#traps) since the kernel is responsible for keeping track of which processes are running.

T> There is no “SIG…” name for signal 0.

**SIGINT,** the *keyboard interrupt* signal, is sent to the foreground process when pressing *Ctrl–c.* By default it terminates the process. Some interactive applications when receiving this signal will prompt the user asking what they want to do, in particular in the middle of a process which shouldn’t be interrupted.

**SIGKILL** is the overkill option. It should never be used in production code, mainly because it doesn’t allow the process to trap it or do any kind of cleaning up after itself. This can result in all sorts of nasty breakage, including unrecoverable errors like corrupted files. Basically treat `kill -KILL` (or `kill -9`, which is synonymous) as a bug.

**SIGQUIT,** the *quit* signal, by default terminates the process and [dumps core](https://en.wikipedia.org/w/index.php?title=Core_dump&oldid=1003589067). *Ctrl-\\* (backslash) sends SIGQUIT to the foreground process.

**SIGTERM,** the *termination* signal, is sent when not specifying a signal in the `kill` command, as in `kill PID…`. In a non–interactive program this is probably the signal we’ll want to use to terminate a child process.

**SIGSTOP and SIGTSTP,** the stop and terminal stop signals, *pause* the execution of the process until it receives SIGCONT, the *continue if stopped* signal. *Ctrl–z* sends SIGTSTP to the current foreground process. SIGSTOP can’t be trapped.

All the named signals above have numeric equivalents (listed by `kill -l`), but the names are easier to read and to look up, so that’s what this book uses. The numbering of signals is also system–dependent, so this is another case where the portable code is also more readable.
