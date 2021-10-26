---
title: "Interpret using the shebang line"
# description:
---

# Interpret using the shebang line


Another way to run scripts is to enter just the path to the script:

{lang="bash"}
```
./script.bash
```

If you run a path to a file directly the kernel will check how the file starts in order to determine how it should be run. If it starts with the characters `#!` (hash followed by exclamation mark) the remainder of the line is considered a [shebang line](#shebang). The shebang line is syntactic sugar to explicitly set the interpreter as part of the script itself, allowing the user to run the script without knowing which interpreter to use. In the vast majority of cases this is what you want, because as we mentioned shell portability is *difficult.*

One thing to bear in mind is that in order to run a script directly like this (rather than explicitly interpreting it as we did above) you need to have the**execute** [permission](#permissions) in addition to the normal **read** permission.
