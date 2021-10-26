---
title: "Argument handling"
# description:
---

# Argument handling


**Aim of this section:** Handle arguments in a simple, flexible and recognizable manner.

An “argument” is a *word* passed to a command. Most commands require arguments to do something useful, such as deploying to a specific environment or processing some files.

T> A “word” in Bash is a strange concept, only vaguely related to natural language words. A Bash word is any sequence of bytes (excluding NUL) bracketed on either side by the start of a simple command, an unescaped, unquoted space, tab or newline character, or the end of a simple command. Examples of *single* words include:
T>
T> - `./dwim.bash`, since it is bracketed by the start and end of the command
T> - `./my\ documents/`, since the space character is escaped with a backslash
T> - `'./my documents'`, since the string is quoted
T> - `./dwim.bash | tac` is two sets of single words, `./dwim.bash` and `tac` (which reverses lines), because `|` separates two commands
T>
T> Examples of *multiple* words include:
T>
T> - `./dwim.bash ./my documents` is *three* words, `./dwim.bash`, `./my` and `documents`, because none of the spaces are escaped or quoted
T> - `./dwim.bash "./$user"' 'documents` is *two* words, because Bash supports mixing quoted and unquoted strings in the same word
T> - `./dwim.bash ./$user documents` is *at least three* words, because word splitting happens *after* expanding variables, and `$user` might contain any number of words, including zero

Arguments are stored — in order — in the parameter array `$@`, and can be accessed individually as `$1` (the first parameter) onwards. Basically we can think of the parameter as the *name,* *key* or 1–based *index,* and the argument as the *value.*

T> You need to use curly brackets to refer to the tenth and subsequent arguments, as in `${10}`.

T> `$0` is the command name itself, and is not considered a parameter or part of the parameter array.

So we can break a command like `grep 'foo.*bar' './some file.txt' > ./output.txt` into `$0`, which is `grep`, `$1`, which is `foo.*bar`, and `$2`, which is `./some file.txt`. The redirection is *not* part of the arguments.

An “option” is an argument which *modifies* the behavior of the program. Options can be either “flags” such as `--verbose`, which toggle a boolean, or a key/value pair such as `--configuration=./my.conf`. Option arguments may be followed by “non–option arguments”, which is the input the command will work with, such as a file name. An optional separator of `--` is sometimes used to keep options and non–options apart. This allows specifying non–option arguments starting with hyphens as in `grep foo -- -test.txt`, although as we’ll see this is an antipattern with a simple [workaround](#explicitly-relative-paths).

Putting *options before arguments* when writing commands is a good habit to get into. `some-command /some/path --some-option` will work with *some* commands, but argument parsing is implemented in countless different ways, and some programs will do unexpected things (or just fail) if we mix these together.

T> Hold on though, what about `find`? Doesn’t it put the paths to search for in the *middle* and the options (like `-type d`) at the *end?* It’s confusing, but the synopsis in the GNU `find` manual page explains this: it starts with a handful of rarely–used options, followed by the “starting points,” and the rest of the arguments all make up an *expression* which filters and manipulates the files within the starting points. The keywords in the expression just happen to look like options.

The following script shows how you might set up argument handling:

{lang=bash}
<<[walking-skeleton/argument-handling.bash](./protected/code/src/walking-skeleton/argument-handling.bash)

This does pretty much what you would expect:

{lang="console"}
```
$ ./argument-handling.bash --verbose './first file' '/path/to/second file'
Using configuration path /etc/example.conf
Processing ./first\ file
Processing /path/to/second\ file
```

Step by step:

1. Start the script with the [shebang line](#shebang) and [error handling directives](#fail-fast-settings).
1. Set up the version string near the top of the script so that it’s easy to find and change when updating the script.
1. Create utility functions for non–trivial reusable code.
1. Set up option defaults for easy modification and to avoid undefined variable errors.
1. Run `getopt` to produce a string which can be used to re–set the parameter array in a standard way. `getopt`  splits up key/value pairs, so you can use the unambiguous form `--key=value` but your parameter array will contain `--key` and `value` separately.
1. Override the parameter array using the string produced by `getopt`. This replaces `$@` with a more easily parseable set of arguments. Some things to note:
   - `getopt` inserts a standard option delimiter argument `--` if it’s not already present after the last option it recognizes in the input:

      {lang="console"}
      ```
      $ getopt --options='' --longoptions=help --name="dwim" -- --help
       --help --
      ```
   - It splits up `--key=value` arguments into two arguments `--key` and `value` for easier looping:

      {lang="console"}
      ```
      $ getopt --options='' --longoptions=x: --name="dwim" -- --x=1
       --x '1' --
      ```
   - It handles whitespace such as newlines in arguments:

      {lang="console"}
      ```
      $ getopt --options='' --longoptions=x: --name="dwim" -- --x=$'1\n2'
       --x '1
      2' --
      ```
   - It’s important to note that the output contains *literal* quotes, which is why we have to use `eval` to treat them as syntactic quotes. Using just `set -- "$arguments"` would result in adding literal quotes to some of the values.
   - We’re not using short option names, but unfortunately we still have to use the `--options`/`-o` key/value flag for it to work:

      {lang="console"}
      ```
      $ getopt --longoptions=help --name="dwim" -- --help
       --
      ```
   - `getopt` prints useful error messages and returns exit code 1 when passing wrong arguments (but still outputs what it was able to parse):

      {lang="console"}
      ```
      $ getopt --options='' --longoptions=x: --name="dwim" -- --x
      dwim: option '--x' requires an argument
       --
      $ getopt --options='' --longoptions=help --name="dwim" -- --help --foo
      dwim: unrecognized option '--foo'
       --help --
      ```
1. `shift [N]` left shifts the parameter array by N (default 1) positions, so when we have handled a flag like `--verbose` we have to run `shift` and when we have handled a key/value pair we need to `shift 2` to start working on the next parameter. For example, using the `getopt` output above as a template:

      {lang="console"}
      ```
      $ set -- --flag --key value -- './some  file.txt'
      $ echo "$1"
      --flag
      $ shift
      $ echo "$1"
      --key
      $ shift
      $ echo "$1"
      value
      $ shift
      $ echo "$1"
      --
      $ shift
      $ echo "$1"
      ./some  file.txt
      ```
1. Once we encounter `--` processing is finished.
1. If we ever encounter anything else (`*` matches any string) that means we must’ve passed an option to `getopt` which we have not yet handled in the `case` statement, so we need to report that as an implementation error.
1. Once we’re done processing the arguments we can set the resulting configuration read–only to avoid accidentally changing them later in the script.
1. A final check verifies that there’s still at least one argument left after option parsing, to fit with the synopsis.

T> See /usr/share/doc/util-linux/getopt/getopt-parse.bash for a canonical example of `getopt` use.
