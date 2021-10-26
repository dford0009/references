---
title: "Installing autocompletions"
# description:
---

# Installing autocompletions


The default autocompletion includes the files in the working directory. For example, if you start a command line with a non–existing command like `foobar`, then press *Space* followed by *Tab,* Bash will suggest the local files:

{lang="console"}
```
$ cd "$(mktemp --directory)"
$ touch aye
$ mkdir bee
$ foobar <Tab>
aye  bee/
```

To complete anything else we need an autocompletion program. These are usually included in the package containing the program. If you find that autocompletion is not enabled after installing, that is, it only suggests working directory files, it might be worth looking for a separate package called “PROGRAM–complete” or similar.

T> I say autocompletion “program” because even though it’s usually a script, it doesn’t *have* to be.
