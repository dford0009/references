---
title: "Linting"
# description:
---

# Linting


The definitive linting tool for shell scripts is [`shellcheck`](https://www.shellcheck.net/). It will catch many common issues; let’s look at an example script:

{lang=bash}
<<[quality-assurance/shellcheck-example.bash](./protected/code/src/quality-assurance/shellcheck-example.bash)

Depending on how familiar you are with shell scripting, that script may look fine or horrendous. Let’s check:

{lang="console"}
```
$ shellcheck ./shellcheck-example.bash

In ./shellcheck-example.bash line 1:
#!bash
^-- SC2239: Ensure the shebang uses an absolute path to the interpreter.


In ./shellcheck-example.bash line 5:
if [ -z $1 ]
        ^-- SC2086: Double quote to prevent globbing and word splitting.


In ./shellcheck-example.bash line 10:
targets = "$PWD/$@/*"
        ^-- SC1068: Don't put spaces around the = in assignments.
          ^---------^ SC2124: Assigning an array to a string! Assign as array, or
use * instead of @ to concatenate.


In ./shellcheck-example.bash line 12:
cat $targets/*.txt | wc --lines | read lines
    ^------^ SC2086: Double quote to prevent globbing and word splitting.
                                  ^--^ SC2162: read without -r will mangle
backslashes.
                                       ^---^ SC2030: Modification of lines is local
(to subshell caused by pipeline).


In ./shellcheck-example.bash line 14:
echo $lines
     ^----^ SC2031: lines was modified in a subshell. That change might be lost.
     ^----^ SC2086: Double quote to prevent globbing and word splitting.

For more information:
  https://www.shellcheck.net/wiki/SC1068 -- Don't put spaces around the = in ...
  https://www.shellcheck.net/wiki/SC2239 -- Ensure the shebang uses an absolu...
  https://www.shellcheck.net/wiki/SC2124 -- Assigning an array to a string! A...
```

Ouch! As you can see, there’s a problem on almost every line:

- the [shebang line](#shebang) should use an absolute path
- variables in conditionals should be [quoted](#quotes) (this would not be a problem with `[[`)
- [assignments](#assignments) do not work the same as they do in most programming languages
- you have to be explicit about creating [associative arrays](#associative-arrays)
- [`read`](#read)’s defaults are not safe
- assignments are local to the current shell

{lang=bash}
<<[quality-assurance/cleaned.bash](./protected/code/src/quality-assurance/cleaned.bash)
