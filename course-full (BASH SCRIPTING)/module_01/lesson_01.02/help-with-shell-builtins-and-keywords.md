---
title: "Help with shell builtins and keywords"
# description:
---

# Help with shell builtins and keywords


Builtin commands and keywords are *part of* the Bash shell. They are documented in context in `man bash` and summarized by `help`. Running `help` on its own will give you some basic info, and list the builtin and keyword synopses in two columns:

{lang="console"}
```
$ help
GNU bash, version 4.4.20(1)-release (x86_64-pc-linux-gnu)
These shell commands are defined internally.  Type `help' to see this list.
Type `help name' to find out more about the function `name'.
Use `info bash' to find out more about the shell in general.
Use `man -k' or `info' to find out more about commands not in this list.

A star (*) next to a name means that the command is disabled.

 job_spec [&]                            history [-c] [-d offset] [n] or hist>
 (( expression ))                        if COMMANDS; then COMMANDS; [ elif C>
 . filename [arguments]                  jobs [-lnprs] [jobspec ...] or jobs >
 :                                       kill [-s sigspec | -n signum | -sigs>
 [ arg... ]                              let arg [arg ...]
 [[ expression ]]                        local [option] name[=value] ...
 alias [-p] [name[=value] ... ]          logout [n]
[…]
```

T> The `>` at the end of a synopsis means it’s been truncated. Unfortunately it is not possible to fit the full synopses no matter the terminal width. Keywords like `do` and `done` are only used as part of bigger command structures, so they don’t have their own entries.
T>
T> - To list only the *builtins* you can use [`compgen -b`](https://askubuntu.com/a/512952/10371).
T> - To list only the *keywords* you can use [`compgen -k`](https://askubuntu.com/a/513712/10371).

We can use the `help` command to get help about any of these, such as `exit`:

{lang="console"}
```
$ help exit
exit: exit [n]
    Exit the shell.

    Exits the shell with a status of N.  If N is omitted, the exit status
    is that of the last command executed.
```

`help` is also self–documenting:

{lang="console"}
```
$ help help
help: help [-dms] [pattern ...]
    Display information about builtin commands.

    Displays brief summaries of builtin commands.  If PATTERN is
    specified, gives detailed help on all commands matching PATTERN,
    otherwise the list of help topics is printed.

    Options:
      -d	output short description for each topic
      -m	display usage in pseudo-manpage format
      -s	output only a short usage synopsis for each topic matching
    		PATTERN

    Arguments:
      PATTERN	Pattern specifiying a help topic

    Exit Status:
    Returns success unless PATTERN is not found or an invalid option is given.
```
