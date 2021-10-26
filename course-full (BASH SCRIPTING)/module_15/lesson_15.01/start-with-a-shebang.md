---
title: "Start with a shebang"
# description:
---

# Start with a shebang


**Aim of this section:** Make the script runnable as long as Bash in is the `$PATH`.

**The first line of a script is special.** If it starts with the characters `#!` the rest of that line is used as the path to the *interpreter* for the script when [run](#running-scripts) directly. This line is usually called the *shebang,* from the “hash” and “bang” characters.

On some systems the path to the Bash interpreter command is `/bin/bash`, on others it’s `/usr/bin/bash`. Part of the freedom of a Linux system is that you can literally install anything anywhere, but these are by far and wide the two most common options. In short, this is not standardized, so there’s no single Bash path we can use in a shebang directly. Fortunately there’s a [tool](https://en.wikipedia.org/w/index.php?title=Shebang_(Unix)&oldid=1009017241#Portability) called `env` which can be used to find the path of an executable on your `$PATH` and run *that.* `env` has a much more reliable path, so this is a **portable shebang line:**

{lang=bash}
<<[walking-skeleton/shebang.bash](./protected/code/src/walking-skeleton/shebang.bash)

Because this is “free” portability, and because [the development community seems to like it](https://stackoverflow.com/a/10383546/96588), I recommend just using the line above, and you won’t have to worry about it again. Of course, if for whatever reason your Bash executable is not on the `$PATH` then by all means use the path directly, with the caveat that it will need editing to run on most other platforms.
