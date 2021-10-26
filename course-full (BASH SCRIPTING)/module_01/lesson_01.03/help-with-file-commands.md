---
title: "Help with file commands"
# description:
---

# Help with file commands


Let’s say you’re looking for help with the `ls` command, so you check the type:

{lang="console"}
```
$ type -a ls
ls is aliased to `ls --color=auto'
ls is /bin/ls
```

We can ignore the alias since there’s no help for those. There is no function, keyword or shell builtin called `ls`, but there *is* a file [path](#path). In other words, we want information about the *file command* called `ls`.

File commands have been developed by thousands of mostly independent people over several decades, and have been documented in many different ways. We’ll go over some of the most common ones, but beware that none of them are guaranteed to give results – developers are free to provide documentation in any way they see fit, including not at all. In general, though, popular file commands have excellent documentation, and we can expect any file command which is available on a popular Linux distribution to have at least *some* documentation.

T> **“Executable”** (the technical word for “runnable”) is the preferred noun used to refer to the *file* rather than the *command.* That is, `ls` is a *command* and `/bin/ls` is an *executable.*

W> Some people treat “[binary](https://en.wikipedia.org/w/index.php?title=Binary_file&oldid=1007457677)” (as in the /bin directory) as a synonym for “executable,” but this is an unfortunate misnomer: not all binary files are executable (such as JPEG image files, which are meant to be read but not executed) and not all executables are binary (such as Bash scripts, which are plain text).


### Self–documenting commands

Self–documenting commands can be run in such a way that they print their own documentation. The most common way to trigger this is to pass the `--help` flag:

{lang="console"}
```
$ ls --help
Usage: ls [OPTION]... [FILE]...
List information about the FILEs (the current directory by default).
Sort entries alphabetically if none of -cftuvSUX nor --sort is specified.

Mandatory arguments to long options are mandatory for short options too.
  -a, --all                  do not ignore entries starting with .
  -A, --almost-all           do not list implied . and ..
[…]
```

T> None of the Bash builtins are self–documenting. For example, `echo --help` will just print “--help” followed by a newline. Shell builtins are instead documented with the [`help` command](#builtin-help): `help echo`. This is one example of a difference between a builtin and the file command with the same name: `env echo --help` will print the *file command’s* help text. A more extreme example is the `dir` commands: the builtin and file commands do completely different things; compare `help dir` (the builtin) and `dir --help` (the file command).

Some commands only support short options, such as those from the BSD family of operating systems. For these it’s common to support the `-h` flag to print help:

{lang="console"}
```
$ nc -h
OpenBSD netcat (Debian patchlevel 1.187-1ubuntu0.1)
usage: nc [-46CDdFhklNnrStUuvZz] [-I length] [-i interval] [-M ttl]
	  [-m minttl] [-O length] [-P proxy_username] [-p source_port]
	  [-q seconds] [-s source] [-T keyword] [-V rtable] [-W recvlimit] [-w timeout]
	  [-X proxy_protocol] [-x proxy_address[:port]] 	  [destination] [port]
	Command Summary:
		-4		Use IPv4
		-6		Use IPv6
[…]
```

Some commands will also print their help text (or a special “command error” variant of it) if you run them without any arguments:

{lang="console"}
```
$ nc
usage: nc [-46CDdFhklNnrStUuvZz] [-I length] [-i interval] [-M ttl]
	  [-m minttl] [-O length] [-P proxy_username] [-p source_port]
	  [-q seconds] [-s source] [-T keyword] [-V rtable] [-W recvlimit] [-w timeout]
	  [-X proxy_protocol] [-x proxy_address[:port]] 	  [destination] [port]
```

T> Some commands such as `tail` will “hang” instead at this point. When that happens it usually means the command has gone into a fallback *interactive* mode where it’s waiting for something to process on standard input. If this happens, pressing *Ctrl–d* will tell the command that there is no more input, which means it will exit immediately. If it still does not exit you may have to force it by pressing *Ctrl–c.*


### Manuals

The help text produced in the previous section is often a short summary of the full manual. The manual is often available in the form of a “man page” which you can access by running `man COMMAND`, for example `man git`. This shows a lightly formatted document in a pager for easy navigation. `man` is self–documenting, so to figure out how to use it you can run `man man`. (In brief, use *Page Up,* *Page Down* and the arrow keys to navigate, and *q* to quit.)

Some commands have manuals which are more like a website, with links between sections. You can access these by running `info COMMAND`, for example `info grep`. `info` *can* be self–documenting, so `info info` may work on your system. Otherwise `man info` will show you the basic command line use. To navigate an `info` document you can use the same buttons as for `man` pages, *Enter* to follow a highlighted link, and *l* to go back to the previous section.

T> Some manuals do not correspond to commands on the system. There are also manuals for configuration files (such as `man ssh_config`), filesystems (such as `man ext4`), encodings (such as `man utf-8`), and more.
