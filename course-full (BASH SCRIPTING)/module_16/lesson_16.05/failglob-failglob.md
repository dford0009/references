---
title: "failglob"
# description:
---

# failglob {#failglob}


One confusing default behavior of [globbing](#globbing), especially because it’s completely different from how [regular expressions](#regular-expressions) work, is that globs expand to *themselves* if there are no matches:

{lang="console"}
```
$ cd "$(mktemp --directory)"
$ for file in ./*
> do
>     grep foo "$file"
> done
grep: ./*: No such file or directory
```

In the spirit of this section you can fail when a glob doesn’t match any existing files:

{lang="console"}
```
$ shopt -s failglob
$ for file in ./*
> do
>     grep foo "$file"
> done
bash: no match: ./*
$ echo "$?"
1
```

Much easier to debug! Another option is to use `shopt -s nullglob` to expand non–matching globs to the empty string. But this comes with its own set of [caveats](https://unix.stackexchange.com/a/204944/3645), because no arguments often means something special such as “read from standard input” (`grep`) or “operate on the current directory” (`find`).
