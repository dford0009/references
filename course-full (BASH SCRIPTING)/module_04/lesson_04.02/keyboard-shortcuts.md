---
title: "Keyboard shortcuts"
# description:
---

# Keyboard shortcuts


You’re probably already familiar with *Ctrl–c* to copy and *Ctrl–v* to paste. But since these shortcuts have special meanings in terminals, the shortcuts are *Ctrl-Shift–c* and *Ctrl-Shift–v.* These commands interact with what is confusingly called the **“clipboard”** selection. It is identical to the “primary” selection except for how you interact with it.

T> *Ctrl–c* [sends SIGINT](#signals) to the foreground process. *Ctrl–v* runs the `quoted-insert` [`readline`](#readline) command, which inserts the next character verbatim. This can be used to insert for example a Tab character without triggering [autocompletion](#autocompletion).

The contents of the primary and clipboard selections can be different. To see how, select some text and copy it into the clipboard selection using the appropriate keyboard shortcut or context menu. At this point both selections are the same, since we selected some text (putting it into the primary selection) and then did a separate action to also put the same text into the clipboard selection. If we now select some *other* text the primary selection will be overwritten, but the clipboard selection stays the same. This can be used to copy two things at the same time: put something in the clipboard selection, put something else in the primary selection, then paste them separately.

T> Within the terminal you can use *Shift-Insert* to paste the primary selection, but unfortunately this shortcut pastes the *clipboard* selection instead in most other applications. Hopefully this inconsistency will be fixed in future versions of Linux desktop applications.

Bash also has a separate built–in selection. *Ctrl–k* moves the text from the keyboard cursor position up to the end of the line into the Bash selection, and *Ctrl–y* pastes it at the cursor position. This can be useful for example when editing a command, and realizing that we need to run a different command before resuming editing this one. If we press *Ctrl–c* to cancel editing we lose the command. Instead, going to the start of the command and pressing *Ctrl–k* we get a clean command line where we can run something else before pressing *Ctrl–y* to resume editing the previous command. This is mostly useful when not using a mouse.

T> *Ctrl–k* and *Ctrl–y* are mapped to the `readline` functions `kill-line` and `yank`. To get a list of functions and their shortcuts, including more clipboard functions, run `bind -P`. To translate these into more human readable form you can pipe the output to `perl -pe 's/((?<!\\)(?:\\\\)*)\\C/\1Ctrl/g;s/((?<!\\)(?:\\\\)*)\\e/\1Alt-/g'`. If you’re reading this on paper, I’m sorry.
