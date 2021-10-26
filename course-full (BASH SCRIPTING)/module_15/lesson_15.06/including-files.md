---
title: "Including files"
# description:
---

# Including files


**Aims of this section:**

- Understand the difference between absolute and relative paths
- Understand what the working directory is
- Know how to deal with references to other files in simple and not–so–simple cases

A [path](#path) starting with “/” is called “absolute.” It refers to one particular file in any given context, independent of current working directory. So there can be only one /dev/hostname within the current context. Of course, the particular path may not exist, or the file contents and metadata may change at any time. There are also many ways to change which file an absolute path refers to:

- mounting over the path or any ancestor path or
- entering a chroot jail, container, VM or other host.

If your script needs to change such a context it is important that you are clear about which code runs within each context. The simplest way to clarify this is usually to put any code you need to run within a different context into a separate script, even if it’s just a single line. That way a context change in your code is represented by a context change in your editor. Another advantage of this approach is that you will never have to escape code within other code, which gets really complicated really fast.

A path starting with any other character is relative to *the current working directory.* It may be confusing that **this is *not* the directory your script is in!** If your shell’s working directory is /home/user and you call `./scripts/pdf2png.bash ./report.pdf` the working directory of the script is /home/user. This is handy in most cases, because it means that pdf2png.bash will look for /home/user/report.pdf rather than /home/user/scripts/report.pdf.

{#explicitly-relative-paths}
Paths starting with “.” are “explicitly relative.” Most of the time adding `./` to the start of a path makes no difference, but they are easier to deal with than the alternative. Consider for example the perfectly valid filename “#tags.txt”. If you pass that as is, unquoted, to a command it will be treated as a comment! Try for example `cat #tags.txt` – it will do nothing, because `cat` has been called without an argument and its behavior in that case is to print anything you enter on its standard input. You’ll have to press *Ctrl–c* to cancel it or *Ctrl–d* to indicate end of file. `cat '#tags.txt'` or `cat ./#tags.txt` will do what you expect. This gets even more complex if the filename starts with a hyphen – what happens now depends on the argument handling of the application. For example:

{lang="console"}
```
$ cat -losses.csv
cat: invalid option -- 'l'
Try 'cat --help' for more information.
```

Quoting doesn’t help here, because the issue is with the application rather than the shell:

{lang="console"}
```
$ cat '-losses.csv'
cat: invalid option -- 'l'
Try 'cat --help' for more information.
```

This finally brings us to actually including files. As you can see from the above, referring to absolute paths in both arguments and within the code makes things simpler – the working directory doesn’t matter. But two desirable features mean that we have to deal with relative paths:

- We want to be able to relocate the script and its dependencies. Whether the files are in /home/user/scripts or /usr/bin should not affect the functionality.
- We want to be able to pass relative paths as arguments for convenience.

T> `readlink` is often used to convert relative paths to absolute ones, but it doesn’t help with this problem: if the relative path isn’t correct, `readlink` isn’t going to find the correct file — classic garbage in, garbage out. It’s just going to make debugging harder by obfuscating the input.

To deal with files located relative to the script we need to know the directory of the script itself. The simplest case should work if you completely control the environment the script runs in, and nobody is doing anything weird or actively trying to break things:

{lang=bash}
<<[walking-skeleton/simple-script-directory.bash](./protected/code/src/walking-skeleton/simple-script-directory.bash)

Unfortunately this doesn’t handle many [corner cases](https://stackoverflow.com/q/59895/96588), and the code can get unbearably complex. We’ll look at some issues in the following sections.

### Different directories

A sourced file is in a different directory than the sourcing file, and needs to know its own directory. Anything derived from `$0` won’t help here, because that is not changed when sourcing. The fix for this is simple — replace `$0` with the first element of the `$BASH_SOURCE` array:

{lang=bash}
<<[walking-skeleton/simple-file-directory.bash](./protected/code/src/walking-skeleton/simple-file-directory.bash)

### Running via a symbolic link

Somebody creates a symbolic link to your script in another directory, and your script relies on other files relative to itself which are not linked. For example, given a script:

{lang=bash}
<<[walking-skeleton/source-directory-example.bash](./protected/code/src/walking-skeleton/source-directory-example.bash)

and its utilities.bash:

{lang=bash}
<<[walking-skeleton/utilities.bash](./protected/code/src/walking-skeleton/utilities.bash)

both in for example ~/bin. Somebody then creates a symbolic link to the main script, and tries to run it:

{lang="console"}
```
$ sudo ln --symbolic ~/bin/example.bash /usr/local/bin/example
$ /usr/local/bin/example
/usr/local/bin/example: line 7: /usr/local/bin/utilities.bash: No such file or directory
```

There is no “obviously best” solution to this problem. Depending on your situation, one of the following may be appropriate:

- Treat it as an application error, and run `script_directory="$(readlink --canonicalize-existing -- "$script_directory")"` repeatedly until it stops changing to make sure you get back to the original script directory. This adds a fair bit of complexity for something which should be the most trivial part of the code.
- Treat it as a packaging error, and inline the script at deployment time so there is only ever one file.
- Treat it as a user error, and expect the user to fix it themselves by creating another symlink or inlining the file.

### Newline at end of filename

The script path ends with a newline. Yes, this happens. All it takes is accidentally closing a quote after pressing *Enter:*

{lang="console"}
```
$ sudo ln --symbolic ~/bin/example.bash '/usr/local/bin/example
> '
```

Bash will even [autocomplete](#autocompletion) that path — it is valid, after all — so it might be some time before anyone even notices the strange name. The problem is a detail of how command substitutions work. [Lines](#newlines) end in a newline character, so most programs will use newline terminators. But when processing lines of text individually you typically don’t care about this “extra” character, because it’s not really part of the line. So command substitutions *remove* any trailing newlines. This means that whenever you *do* want the exact output of a command substitution, for example a filename, you have to “neutralize” this trimming:

{lang=bash}
<<[walking-skeleton/newline-at-end-of-filename.bash¶](./protected/code/src/walking-skeleton/newline-at-end-of-filename.bash␊)
Nothing is trimmed in [variable expansions](#variable-expansion), so this can handle almost any filename. Wait, almost? Read on…

### Hyphen at start of filename

Remember how hyphens at the start of filenames usually means the filenames are treated as options instead? And `$BASH_SOURCE` just contains whatever was typed on the command line. At this point you have to make the path *explicitly* relative before using it in commands:

{lang=bash}
<<[walking-skeleton/hyphen-at-start-of-path.bash](./protected/code/src/walking-skeleton/hyphen-at-start-of-path.bash)

All this is to say that it can get complicated to deal with every possible situation, and to be careful to strike a balance between robust and maintainable code.
