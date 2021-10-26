---
title: "Readline"
# description:
---

# Editing Commands and Scripts {#editing}

Interactive editing covers basically everything we do in a shell. Here we’ll look into the various ways to edit commands and text files and how they tie together.

# Readline


[Bash command line editing](https://www.gnu.org/software/bash/manual/html_node/Command-Line-Editing.html) is provided by the [GNU Readline](https://www.gnu.org/software/readline/) library, which is also used by many other programs. This is why text editing works remarkably similar in interactive shells for other programming languages – many of them, like Python, also use Readline.

T> The things that keyboard shortcuts bind to in Readline are variously called “commands”, “functions” and “macros” in the documentation. In Readline, “command” and “function” are synonymous. Commands/functions do something to the *state* of the text (like copying a word or changing it to uppercase) while *macros insert some literal text.* I will use “macro” to refer to both Readline commands/function and macros to distinguish them from Bash commands and functions.

Readline comes with a lot of [macros](https://tiswww.cwru.edu/php/chet/readline/readline.html#SEC13) – there are macros even for moving one character to the left (`backward-char`) and “accepting” (usually running) a line (`accept-line`). We’ll look at some common ones here (assuming a default configuration), how to create keyboard shortcuts, and some quality–of–life examples.


### Moving the cursor

The left and right arrows move one character at a time. Combined with the *Ctrl* key they move one *word* at a time. You can also use *Home* and *End* to go to the start and end of the line, respectively.

T> Readline and Bash define “word” differently. Bash uses `$IFS`, the internal field separator variable (by default consisting of a space character, tab character and newline) to split words, while Readline treats only alphanumeric characters as part of words. This means a string like `foo-bar` is one “Bash word” and two “Readline words.”

Editing a command on the command line can get clunky, in particular when working on a command on multiple lines. It’s not possible to go back up to the previous lines to edit them within Bash itself, but we can use the *Ctrl–x + Ctrl–e* shortcut to open the command as a temporary file in an [editor](#editors). That way we can modify multiple lines freely, and when exiting the editor the saved file is executed as if we typed it directly.


### Deleting text

*Backspace* and *Delete* delete backwards and forwards, respectively. *Alt–Backspace* deletes a *word* backwards. The following setting configures *Alt–Delete* to delete a word forwards; see [Configuring Readline](#configuring-readline) for how to add it.

{lang="text"}
```
"\e[3;3~": kill-word
```


### Command history

By default, Bash will:

- **record most new commands in memory,**
- **save them to a file when the shell exits, and**
- **read that file when starting.**

Let’s unpack that with an example session as a brand–new user:

{lang="console"}
```
$ echo "$HISTFILE"
/home/user/.bash_history
```

In other words, `$HISTFILE` is the absolute path to the current history file. Continuing the session above, we’ll try to print the contents of that file using the `cat` (con`cat`enate) command:

{lang="console"}
```
$ cat "$HISTFILE"
cat: /home/user/.bash_history: No such file or directory
```

This matches the description of the behavior above: this file only exists once we exit Bash for the first time as this user. In other words, the Bash history has not yet been written to disk. We can access the previous commands from memory by using the *Up* and *Down* buttons. Basically, after running a command, pressing *Up* will replace the current command line with the previous command we ran, `cat "$HISTFILE"`, and put the cursor at the end of that line. If we press *Up* again it will instead show the `echo "$HISTFILE"` command. We can then edit that line and run it, or continue pressing *Up* and *Down* to find the command we want to run or modify.

If we now replace the shell with a new one (or close the terminal and reopen it), we find that the commands from the previous shell have been written to the history file in the order they ran, oldest first:

{lang="console"}
```
$ exec "$SHELL"
$ cat "$HISTFILE"
echo "$HISTFILE"
cat "$HISTFILE"
exec "$SHELL"
```

Since these have been read into memory when Bash started, it’s as if we never quit the previous shell. A gotcha is that each shell overwrites the history file with what was in the original history file plus what was typed in that shell. So if we have several shells open they end up clobbering each other when exiting, and we end up with only the history from the last shell which exited.

Bash can be configured to keep some commands out of the history. The `$HISTIGNORE` variable, which is usually not set, is a set of colon–separated extended [globbing](#globbing) (`shopt -s extglob`) patterns of commands which will not be written to the history. This may be helpful if we need to type lots of similar commands which include passwords or the like. It is less useful than it could be, because of course we don’t want to store the password itself in a plaintext configuration file, and we instead have to try to match the surrounding command line. The  `$HISTCONTROL` variable normally contains “ignorespace”, which gives us a simpler way to exclude a command from the history file: simply *start the command with a space character.*

Another useful Readline  feature which is enabled by default is **history search.** Pressing *Ctrl–r* starts a reverse text search through history. We can then enter a substring of the command we are interested in. Pressing *Ctrl–r* *again* leafs through older matches for the same string. Once we find the relevant command we can either press *Enter* to run it immediately or *Escape* to put it on the command line, ready to edit.

### Configuring readline {#configuring-readline}

The main reason for configuring Readline is to add custom key bindings. The user configuration file is `~/.inputrc`, and the configuration format is pretty straightforward. Bindings are configured as `"SHORTCUT": ACTION`, where `\C-` means holding down *Ctrl* while pressing the next character, `\M-` means holding down *Left Alt* while pressing the next character, and `\e` means pressing and releasing the *Escape* character. Lines starting with `#` are comments, which in this case mention unbound macros for completeness.

T> Left Alt is referred to as “Meta” in GNU software for [historical reasons](https://en.wikipedia.org/w/index.php?title=Meta_key&oldid=996499923), hence the `\M` above.

W> If `~/.inputrc` is misconfigured in some way it can make terminal use difficult. The easiest way to work around a broken `~/.inputrc` is to rename it using a GUI file manager and then restarting the terminal.

We can use `bind -p` to list the currently configured bindings (limited to the first ten lines by `head` for brevity):

{lang="console"}
```
$ bind -p | head

"\C-g": abort
"\C-x\C-g": abort
"\M-\C-g": abort
"\C-j": accept-line
"\C-m": accept-line
# alias-expand-line (not bound)
# arrow-key-prefix (not bound)
# backward-byte (not bound)
"\C-b": backward-char
```

T> Some bindings are not on that list: *Enter* does the same as `accept-line` but is built into Bash, *Tab* is bound to [`complete`](#autocompletion-writing), and *Alt–Backspace* is bound to `backward-kill-word`. There might be others.

Most of the *Escape* key shortcuts can also be triggered by holding down the *Alt* button while pressing the next character.

Other Readline settings are in the form `set NAME VALUE`:

{lang="console"}
```
$ bind -v
set bind-tty-special-chars on
set blink-matching-paren off
[…]
set keymap emacs
set keyseq-timeout 500
set vi-cmd-mode-string (cmd)
set vi-ins-mode-string (ins)
```

T> The settings in Readline are called “variables” and “variable settings” in the documentation. I chose “settings” to avoid confusion with Bash variables.

Let’s try out some useful configuration. First, [insert](#editors) these lines in `~/.inputrc`:

{lang="text"}
```
# Search through the history for the characters before the cursor using the up
# and down arrows.
"\e[A": history-search-backward
"\e[B": history-search-forward
```

Save and close the file, then run `bind -f ~/.inputrc` to apply the change in the current shell. This example changes the behavior of the up and down arrows on the keyboard. Normally, they replace the current command with the ones from the history file, leafing back and forth with each press of *Up* and *Down.* After the change above they will still do that when the cursor is at the start of the command. Otherwise they will leaf through commands starting with the characters before the cursor. This is easier to understand by just trying it out. For example, if you have several `ls` commands in the command history, typing `ls` on a new command line and then pressing up will leaf through history entries starting with “ls”. This can be quite handy when searching for a command with a specific prefix through a big history file.

T> By default `~/.inputrc` is only applied when starting a shell.

How does the up arrow map to `[A`? The reference is in `man console_codes`, but if you simply want to know the escape sequence for a combination of keys just press and release the *Escape* key and then press the key combination. For example, *Escape,* *Up* prints `[A` at the cursor, and *Escape,* *Alt–Delete* prints `[3;3~`, as seen in the configuration for `kill-word` above.
