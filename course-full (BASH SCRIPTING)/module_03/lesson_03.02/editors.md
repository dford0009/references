---
title: "Editors"
# description:
---

# Editors


On modern \*nix systems there are heaps of editors available. I’ll cover the minimal basics of two of the most common, `nano` and `vim`, which are available on most systems.

Some commands, such as `crontab -e` to edit the current cron table, need to open an interactive editor. The choice of editor is controlled by `$VISUAL`, which is usually just a command to run such an editor:

{lang="console"}
```
$ echo "$VISUAL"
vim
```

To set a specific default editor we can set the `$VISUAL` variable in `~/.bashrc`.

### Nano

`nano` is probably the most beginner–friendly terminal editor around. To start editing a new or existing file simply run `nano FILE`. If `FILE` does not yet exist it will not be created until you save within the editor, and if `FILE` *does* exist it will be opened and syntax highlighted if applicable. At this point you’ll notice a sort of menu at the bottom of the screen, which shows a number of options depending on the width of the terminal window. The options start with a caret (`^`) character, which is a common symbol for the *Ctrl* key. The characters after the caret are all uppercase, but you don’t need *Shift* or *Caps Lock* to use them, so the `^X` shortcut corresponds to *Ctrl–x.* When exiting, `nano` will ask whether you want to save your changes. *Ctrl–g* shows a help page with more options and descriptions.

### Vim

`vim`, on the other hand, has a famously steep learning curve. One example of this is the famous question [How do I exit the Vim editor?](https://stackoverflow.com/q/11828270/96588). Basically Vim has several *modes:*

1. Vim starts in **normal** mode, which is mostly used to access other modes. Pressing *Escape* takes you back to normal mode from other modes.
1. Pressing *i* or *Insert* in normal mode takes you to **insert** mode, where we can edit the file normally.
1. Pressing */* in normal mode goes to **forward search** mode, where we can enter a basic regular expression and search for it interactively. Pressing *Enter* saves the search and goes back to normal mode. If there are multiple matches we can go to the next one by pressing *n* and the previous one by pressing *Shift–n* in normal mode.
1. Pressing *:* in normal mode goes to **command** mode, where we can enter a command and run it by pressing *Enter.* The most common commands are:
   - `:exit` or `:x` to save (if necessary) and exit
   - `:quit` or `:q` to quit
   - `:quit!` or `:q!` to force quit (for example to abandon changes in a file)

There are many other [Vim modes and commands](https://vimhelp.org/), but this is enough to get started.
