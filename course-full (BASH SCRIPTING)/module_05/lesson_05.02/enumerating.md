---
title: "Enumerating"
# description:
---

# Enumerating


### Globs {#globbing}

A common task in shell scripts is to loop over a changing but well–defined set of files, for example to delete all the log files after a successful run of a program. The names of such files often include the date and/or time they were created, so you can’t simply hard–code a path in the cleanup script. You need some way of referring to all the log files, regardless of their actual name, in other words a *pattern,* where the unknown part of a path might be matched by a *wildcard.*

Globs are patterns. By far the most common wildcard in globs is the asterisk, `*`. It matches any number of characters (including zero) at that point in the path:

{lang="console"}
```
$ cd "$(mktemp --directory)"
$ touch ./2000-12-31.log ./2000-12-31.log.tar.gz ./output.txt
$ echo ./*.log
./2000-12-31.log
```

T> If you’re wondering why I don’t just `echo *.log` see the start of [Including Files](#including-files) and the excellent [Back To The Future: Unix Wildcards Gone Wild](https://www.defensecode.com/public/DefenseCode_Unix_WildCards_Gone_Wild.txt), which has several examples of why starting an argument with a wildcard character is a bad idea.

If we care about the number of characters but not their contents we can use the `?` wildcard. It matches any *single* character:

{lang="console"}
```
$ cd "$(mktemp --directory)"
$ touch ./001.png ./2.png
$ echo ./???.png
./001.png
```

T> Those familiar with [regular expressions](#regular-expressions) will recognize that `*` is equivalent to `.*`, and `?` is equivalent to `.`. But there are important differences:

- Globs are always *anchored.* That is, `./*.log` is equivalent to `^\./.*\.log$` (with the modifier that `.` includes newline characters), which is why it does *not* match “./2000-12-31.log.tar.gz”.
- `.` in globs is a literal dot, *not* a wildcard.

In general, it’s best to think of them as two different languages which just happen to have some superficial similarities.

If we care about the specific characters we can specify the characters we want to match at that location, in square brackets:

{lang="console"}
```
$ cd "$(mktemp --directory)"
$ touch ./1.png ./2.png ./a.png ./b.png
$ echo ./[abcde].png
./a.png ./b.png
```

A handy but dangerous shortcut is matching *character classes.* For example, we can match any lowercase ASCII character using the `[[:lower:]]` pattern:

{lang="console"}
```
$ export LC_ALL=en_US.UTF-8
$ cd "$(mktemp --directory)"
$ touch ./A.png ./a.png ./ç.png
$ export LC_ALL=POSIX
$ echo ./[[:lower:]].png
./a.png
```

T> Character classes and more are explained in detail in `man 7 regex`. This is one example where the functionality of globs and regexes blend together.

Hold on, what’s with `LC_ALL`? And why isn’t the cedilla treated as a lowercase character? The answer to both comes back to *[locales](#encoding),* which for the purposes of this chapter can be treated as the mapping from bytes to what is loosely called “characters.” Basically, to ensure that the code has a chance of treating strings identically across configurations you must declare the locale first. `LC_ALL` is a locale override variable, and the value “POSIX” refers to the [POSIX locale](https://pubs.opengroup.org/onlinepubs/009695399/basedefs/xbd_chap07.html#tag_07_02) which is the only one guaranteed to be available on all modern \*nix installations. In the POSIX locale `[[:lower:]]` maps to `[abcdefghijklmnopqrstuvwxyz]`.

#### Globbing tips

**TIP:** Use a **slash** at the end of a glob to match **only directories:**

{lang="console"}
```
$ cd "$(mktemp --directory)"
$ mkdir ./a ./b
$ touch ./1
$ echo ./*/
./a/ ./b/
```

**TIP:** Globs **won’t match dotfiles** by default:

{lang="console"}
```
$ cd "$(mktemp --directory)"
$ touch ./.hidden ./shown
$ echo ./*
./shown
```

**TIP:** Set the `dotglob` shell option to **match dotfiles:**

{lang="console"}
```
$ shopt -s dotglob
$ echo ./*
./.hidden ./shown
$ shopt -u dotglob
$ echo ./*
./shown
```

**TIP:** Globs are not recursive by default:

{lang="console"}
```
$ cd "$(mktemp --directory)"
$ mkdir --parents ./a/b
$ touch ./1.jpg ./a/2.jpg ./a/b/3.jpg
$ echo ./*.jpg
./1.jpg
```

**TIP:** Set the `globstar` shell option to make the special pattern `**` match recursively:

{lang="console"}
```
$ shopt -s globstar
$ echo ./**/*.jpg
./1.jpg ./a/2.jpg ./a/b/3.jpg
```

T> Note that `./**.jpg` does *not* do the same thing, because `**` only matches full file and directory names, *not* a directory path *plus* a filename.

### `find` {#find}

[`find` website](https://www.gnu.org/software/findutils/manual/html_mono/find.html)

The `find` command takes **two sets of parameters** – a _list of directory paths_ followed by an _expression_ which is like a separate language. For example, to look for PNG files in the “assets” and “images” directories, you would run `find ./assets ./images -type f -name '*.png'`. A few things to note about this command:

1. Unlike commands like `sed` and `awk` the expression is *several* words, not a single word. This makes it harder to distinguish between shell and `find` features in the command.
1. `find` supports globs in a similar way to Bash, but Bash will expand globs unless quoted or escaped before passing the argument to `find`. For example, if we forgot to quote `*.png` above we would get this broken behavior:

   {lang="console"}
   ```
   $ cd "$(mktemp --directory)"
   $ mkdir ./assets
   $ touch ./logo.png ./assets/arrow.png
   $ find ./assets -name *.png
   ```
   The `find` command does not output anything, because after Bash expands the glob the command which actually runs is `find ./assets -name logo.png`. And if the glob does *not* happen to match anything in the current directory the behavior would depend on whether [`failglob` or `nullglob`](#failglob) is set, and would only work by accident if both were unset.
1. The exit code is zero even if no files are found.
1. The expression has a truth value per file. This becomes relevant for more complex expressions.
1. There is an implicit `-print` flag which prints the filenames matching the preceding expression terminated by a newline at the end of the expression. For any kind of looping over files you should instead use `-print0` (or `-exec printf '%s\0' {} +` if it’s not available) to use a NUL terminator.
1. The command is recursive by default. This can be controlled with the `-mindepth N` and `-maxdepth M` expressions. For example, `find . -mindepth 1 -maxdepth 1` lists all the files within the current directory, *excluding* the directory itself, “.”.
1. The ever–present link to the parent directory — “..” — is *not* part of the results.

**Run commands on matching files with `-execdir`**

One of `find`’s superpowers is *running commands on files.* The easiest way to do this is with `-execdir`. A common use case is to combine it with `grep` to search through an arbitrarily complex set of files:

{lang=bash,crop-start-line=6,crop-end-line=8}
<<[listing-files/find-and-grep.bash](./protected/code/src/listing-files/find-and-grep.bash)

- The first argument is the starting point, which expands to the quoted arguments.
- `-type f` specifies that this applies only to “regular” files, as opposed to directories, symlinks etc.
- `-mtime +1` specifies that the modification time of the files must be at least *two* days in the past, because [`find` always rounds the modification time *down*](https://unix.stackexchange.com/a/92351/3645).
- The rest of the arguments follow the synopsis `-execdir COMMAND ARGUMENT… {} +`. The arguments are passed unchanged to the command.
- The `{}` indicates where in the command line the paths will be inserted.
- The `+` tells `find` to run as few commands as possible (can be more than one command for [technical reasons](https://www.in-ulm.de/~mascheck/various/argmax/)) to get through all the matching files. If you *need* to run a single command per file, for example [if `{}` is not the last argument](https://www.gnu.org/software/findutils/manual/html_mono/find.html#Multiple-Files), you can instead pass a quoted or escaped semicolon character:

{lang=bash,crop-start-line=6,crop-end-line=7}
<<[listing-files/flatten.bash](./protected/code/src/listing-files/flatten.bash)

T> A common use case for `find` is to delete files matching some complex criteria. There’s a simple `-delete` flag which is basically equivalent to `-execdir rm --force --recursive {} +`. For example, to delete all `.tmp` files in the current directory and all subdirectories we would first run `find . -name '*.tmp'` to check that the command matches the right files and then run `find . -name '*.tmp' -delete` to actually delete them.

**Using `find` with `or`**

`find` will act on files which match *all* the tests in the expression. If we want to do something with files which match *either* one or another expression we need to use `-or` and group the sub–expressions using literal parentheses to override operator precedence. For example, let’s expand the example at the beginning of this section to list *both* JPEG and PNG files with NUL terminators:

`find ./assets ./images -type f \( -name '*.jpg' -or -name '*.png' \) -print0`.
