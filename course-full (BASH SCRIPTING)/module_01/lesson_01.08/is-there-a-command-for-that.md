---
title: "Is there a command for that?"
# description:
---

# Is there a command for that?


If you only know some keywords relating to what you are trying to do you can use the `apropos` command to search for keywords within man page summaries. `apropos KEYWORD…` matches any of the keywords, and `apropos --and KEYWORD…` matches *all* of the keywords. For example:

{lang="console"}
```
$ apropos --and find file
find (1)             - search for files in a directory hierarchy
findfs (8)           - find a filesystem by label or UUID
findmnt (8)          - find a filesystem
git-pack-redundant (1) - Find redundant pack files
gst-typefind-1.0 (1) - print Media type of file
locate (1)           - find files by name
mlocate (1)          - find files by name
systemd-delta (1)    - Find overridden configuration files
```
