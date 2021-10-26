---
title: "Check shell version"
# description:
---

# Check shell version


**Aim of this section:** Ensure that your script is run with a compatible interpreter.

Portability is a bit of a sore subject in shell scripting. On the one hand, using portable language features means that the code is more likely to do the expected actions when run with different interpreters (or different versions of the same interpreter), which can save users time. On the other hand:

- It is not possible to write a fully portable script, because there are a huge number of interpreters and versions, and the target interpreters are (pretty much by definition) unknown
- The script could do something subtly wrong when run by another interpreter, like doing nothing when it should be doing something
- The script could do something catastrophically wrong when run by another interpreter, like deleting all the user’s files
- A lot of useful tools and [Bash–specific features](https://mywiki.wooledge.org/Bashism?action=recall&rev=83) are not portable, so portable code will be more complex than non–portable code with the same feature set
- When something goes wrong the user is going to have a nasty time trying to debug complex code written by someone else for a most likely unknown set of interpreters and versions

We could flip the situation completely and only support a single version of Bash. That might be reasonable in a project where reliability is extremely important, but has its own costs and risks: developers would have to be able to run the same version of Bash, independent of the operating system’s default interpreter. This could involve a container, a virtual machine, compiling Bash locally, or a package manager which allows multiple Bash versions to be installed at the same time.

A compromise would be to support a range of Bash versions, making sure to test the script with at least the oldest and most recent version in the range. For example, a script supporting versions 4 through 5.0 might look like this:

{lang=bash}
<<[walking-skeleton/version-check.bash](./protected/code/src/walking-skeleton/version-check.bash)

T> Similarly you can [check the value of `$OSTYPE`](https://stackoverflow.com/q/394230/96588) if your script only supports a specific operating system or needs to do things differently depending on the same.
