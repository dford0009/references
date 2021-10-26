---
title: "Searching"
# description:
---

# Searching


### `ls`

`ls` is most useful for its default task – listing alphabetically all the non–hidden files in a directory, in a human–readable form, with color coding for special files like directories, executables and symlinks. When exploring a directory, `ls` and globs can be enough to get a broad idea of where things are.

Unfortunately `ls` is useless for reliable scripting — see [Why you shouldn’t parse the output of ls(1)](https://mywiki.wooledge.org/ParsingLs?action=recall&rev=32) and [Why \*not\* parse \`ls\` (and what to do instead)?](https://unix.stackexchange.com/q/128985/3645) Anything we could possibly want to do *in a script* can be done more reliably with **`find`** or **globs.** With that in mind, here are some handy `ls` options and their scriptable counterparts:

**List all files except `.` and `..`** 

`ls` command: `ls --almost-all`
Scripting: `find` — it lists hidden files by default

**Print file metadata**
- `ls` command: `ls -l` 
- Scripting: `find -printf PATTERN` prints arbitrary metadata

**Reverse order**
- `ls` command: `ls --reverse`
- Scripting: `find EXPRESSION -print0 | sort --reverse --zero-terminated`

**Order by most recent first** 
- `ls` command: `ls -t`
- Scripting:  `find PATH… -printf '%T@\t%p\0' | sort --key=1 --reverse --zero-terminated | cut --fields=2 --zero-terminated`

### `locate`

[`locate` website](https://pagure.io/mlocate)

The mlocate package contains two handy tools: `updatedb` to create and update an index of all the files on your system and `locate` to search through the index. `locate STRING` lists all *paths* which contain the given string. Because mlocate keeps track of paths in a database it is much faster than `find / -path STRING`, but since it’s a separate database it’s not necessarily up–to–date. `updatedb` usually runs as part of a cron job installed as part of the package, for example in /etc/cron.daily/mlocate, but you can also run `sudo updatedb` to update it anytime.

T> `updatedb` may be configured to exclude some filesystems and paths by default. For example, on my system it excludes network file systems (which could take a long time to index) and the /tmp directory, among many others.

When using `locate` we have to be careful not to match too many things. For example, `locate /foo` will print any directory with a name *starting with* “foo” *and* any files inside such directories.

- To limit this to directories with an exact name and all files within them we can use `locate /foo/`.
- To limit it to only files called “foo” we can use `locate --regex '/foo$'`.
- Printing *only* directories with a specific name is not supported, because `locate` doesn’t distinguish between directories and other files.

### `grep`

[`grep` website](https://www.gnu.org/software/grep/)

`grep` searches through files or standard input for *lines* matching specified patterns. By default it prints these lines to standard output, and has an exit code of 0 if there was any match or 1 if there was no match. I would suggest a read–through of the excellent `man grep` to pick out the most relevant options, but suffice it to say that this is a tool everyone who does anything in Bash should know.

Some particularly useful options:

- Search for literal strings rather than patterns: `--fixed-strings`
- Use complex Perl-compatible regular expressions: `--perl-regexp`
- Search for more than one pattern: `--regexp=PATTERN1 --regexp=PATTERN2 …` (any line matching *any* of the patterns is printed, and this option also works with `--fixed-strings` despite the name)
- Ignore case distinctions: `--ignore-case`
- Match whole words rather than anywhere on a line: `--word-regexp` (`grep --word-regexp PATTERN` is equivalent to `grep '\bPATTERN\b'`)
- Match whole lines: `--line-regexp` (`grep --line-regexp PATTERN` is equivalent to `grep '^PATTERN$'`)
- Print a count of matching lines rather than the lines themselves: `--count`
- Print only the filenames of matching files: `--files-with-matches` (by default, when searching through a single file only the matching lines are printed, and when searching through more than one file the filename and lines are both printed with a `:` separator)
- Print the filenames of files with *no* matches: `--files-without-match`
- Print a NUL byte after each filename rather than a newline: `--null` (useful with the two options above to handle arbitrary filenames, for example ones which could contain a newline character)
- Print each match on a separate line without the rest of the line: `--only-matching`
- Don’t print anything on standard output: `--quiet` (this is useful to check whether a file contains something without actually printing that line, as in `if grep --quiet PATTERN`)
- Print N lines around each matching line for context: `--context=N`
- Search through files recursively: `--recursive`
- Treat input and output lines as ending with a NUL character: `--null-data` (useful in a pipeline with NUL-separated records)

W> `grep` is fundamentally a *line-based* tool, and is unsuited for extracting specific parts of *nested* file formats, especially those with flexible formatting such as [JSON](#json) and [XML](#xml).

T> [`ripgrep`](https://github.com/BurntSushi/ripgrep) has similar options to `grep`, but is more developer–focused: it searches recursively by default, and skips a bunch of files and directories which you typically don’t want to search through: hidden files (including the `.git` directory), files listed in `.gitignore`, and binary files.

### By convention

On Linux there are two important standards for the location of files. These can be useful to help you find files with less guesswork.

The [Filesystem Hierarchy Standard](https://refspecs.linuxfoundation.org/fhs.shtml) consists of a  _“set of requirements and guidelines for file and directory placement under UNIX–like operating systems.”_ It explains the purpose of each of the main directories on a \*nix system, such as /etc being used for system–wide configuration files.

The [XDG Base Directory Specification](https://specifications.freedesktop.org/basedir-spec/basedir-spec-latest.html) specifies environment variables which indicate where application data and configuration should be stored. This is especially useful for user–specific configuration, which in some cases still clutter the home directory. By putting configuration in application–specific directories inside `$XDG_CONFIG_HOME` users can trivially distinguish them, even if each application has multiple configuration files.
