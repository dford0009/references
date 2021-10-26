---
title: "noclobber"
# description:
---

# noclobber


“Clobbering” a file has a very specific meaning in Bash — it’s when you use the `>` [redirect](#redirects) operator to *overwrite an existing regular file.* Setting `noclobber` results in a non–zero exit code when a script tries to clobber a file, leaving the file untouched. See for example this script, intended to get 32 bytes of random binary data and convert it to hexadecimal so that it can be stored in a configuration file:

T> `noclobber` also applies to symbolic links to regular files. Some special files like /dev/null are not actually changed when you attempt to clobber them. `noclobber` is smart enough to allow such redirects.

{lang=bash}
<<[walking-skeleton/noclobber-example.bash](./protected/code/src/walking-skeleton/noclobber-example.bash)

There’s a simple typo: the `xxd` output should be redirected to `$hex_path`, but instead it’s redirected back to the already existing file.

T> This is a particularly nasty kind of redirect error. A common mistake when trying to create as few files as possible is to run `COMMAND < FILE > FILE`. You might reasonably expect it to start the command, read the file and write the result back to the same file. But because of the way redirects work what *actually* happens is that Bash opens the file for reading, *empties* the file, opens the file for writing, and *then* the command starts. So the command reads an empty file and therefore usually produces an empty output file.

The `xxd` line results in the following error message:

{lang="console"}
```
[…]/secret.bin: cannot overwrite existing file
```

The script exits without ever running the `xxd` command. Because `errexit` is enabled the script also terminates at that line, so it never runs `logger`.

`noclobber` encourages several best practices:

1. Using unique filenames at each step of processing makes it much easier to debug a failing process — you can see the output of every step, and can tweak and retry steps easily until things work they way you expect.
1. `mktemp --directory` is a great way of guaranteeing that you won’t run into clobbering errors because of files from previous runs or unrelated sources in your current working directory.
1. Processing using [pipelines](#pipelines) avoids clobbering, and is generally much faster than the stop–and–go process of creating a new file at each step.
