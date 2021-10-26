---
title: "Command documentation"
# description:
---

# Command documentation


This chapter will help you find documentation for the commands on your machine.

Each type of command is documented in different ways. There are five types of commands: **alias, keyword, function, builtin** and **file,** in order of decreasing precedence.

> Precedence is the same here as you might be familiar with from arithmetic. For example, multiplication has higher precedence than addition, so 2 + 3 × 4 is equal to 2 + (3 × 4), or 14. A common use case for this is to define a function with the same name as a file command to set some default options. As a quick example, here’s how we would tell `grep` to use colored output by default:
>
> ```shell
> grep() {
>     command grep --color=auto "$@"
> }
> ```
>
> `command` suppresses shell function lookup, forcing Bash to refer to the *file* command within the function. Otherwise, the function would just recurse forever.

- [Aliases](#aliases) don’t provide help, because they are just shorthand for a command with some arguments. They are also considered deprecated in favor of functions because of some technical shortcomings, so we’ll ignore them for now.
- Standalone [function](#functions) are very rarely self–documenting, so we’ll ignore those as well.
- **Keywords** are things like `if`, `time`, and `[[`, which are parsed differently from other commands. For example, `if` *must* be followed by an expression before `then`, and `then` *must* be followed by an expression before `fi`:

   {lang="console"}
   ```
   $ if
   > then
   bash: syntax error near unexpected token `then'
   $ if true
   > then
   > fi
   bash: syntax error near unexpected token `fi'
   ```
- **Builtins** are commands built into Bash that provide functionality which operates on the internals of the shell, such as `command`, `export`, and `trap`.
- **File** commands are all the other familiar commands: `find`, `grep`, `ls`, etc.

Before we go looking elsewhere for help on a command, it is important to know which type it is. We can run **`type -a COMMAND`** to list all the commands with that name in order of decreasing precedence. For example, `echo` is typically available both as a builtin and as a file command:

{lang="console"}
```
$ type -a echo
echo is a shell builtin
echo is /bin/echo
```

Since shell builtins take precedence over file commands, if we run `echo` normally we’re running the shell builtin. We should therefore look up the shell builtin help to learn about it.

T> In arithmetic we would use parentheses to override precedence. We can do the same with Bash commands, to force running a lower precedence command. Unfortunately the rules are a bit complicated:
T>
T> - Aliases are expanded by replacing the first word of a command before other expansions. To ignore aliases we can therefore change the first word in a command in some way, such as quoting it. For example, running `'COMMAND'` (including quotes) will ignore any aliases called `COMMAND`, instead looking for any other command type.
T> - `command COMMAND` ignores both aliases and functions.
T> - `env COMMAND` ignores everything before file commands. Which means that to run `/bin/echo` rather than the builtin with the same name we can run `env echo`. This is rarely necessary, and complicates the script a bit, so we should only do this if we actually *have* to, for example for compatibility between different shells.
