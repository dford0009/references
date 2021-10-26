---
title: "tar"
# description:
---

# tar


This is by far the most used compression tool on Linux, and is famously difficult to use:

[![`tar`](./public/images/compression/tar.png)](https://www.xkcd.com/1168/)

[XKCD by Randall Munroe](https://www.xkcd.com/)

This may have something to do with the huge range of options available and the fact that some `tar` implementations only support short options like `-t` which lis*t*s (!) files within a tarball, resulting in obtuse shorthands like `tar -zxvf`. Fortunately the long option names are obvious, so you’ll be disarming nukes in no time.

To **create a tarball:** `tar --create --file=./backup.tar.gz --gzip ./project`

- `--create` is the flag to create a new archive.
- `--file=FILE` is the key/value option to set the archive file we’re working with. `.tar.gz` is the conventional extension, since the resulting file is a tarball contained within a gzip archive.
- `--gzip` specifies that the file is to be compressed — this is not the default!

T> To add other files and directories to the tarball, simply enter them after `./project`.

After running, `./backup.tar.gz` will contain the `project` directory and all the files in it, recursively.

T> As you can see, `tar` doesn’t have bareword subcommands like Git’s `commit` or `pull` — subcommands are just another set of flags. The main purpose of `tar` isn’t actually compression, but rather creating *tarballs,* an evocative name for a collection of files placed back–to–back within another file.

The other things you may want to do with archives is to *list* files and *extract*:

To **list the files in a tarball:** `tar --list --file=./backup.tar.gz --gzip`

And to **extract a tarball:** `tar --extract --file=./backup.tar.gz --gzip`

T> The `--gzip` flag in the listing and extraction commands is not strictly speaking necessary: in a test run, `tar --extract --file=./backup.tar.gz` did the same thing as the command above. It even worked after renaming the file to `backup.tar`, so `tar` must be looking at what are literally called [magic patterns](https://linux.die.net/man/5/magic) within the file to determine what type it is. Such shortcuts can save you seconds when writing the command — at the expense of risking minutes or hours of debugging.

The only other flag you are likely to use often is `--verbose`, which prints the paths as they are added to or extracted from the tarball.

### Streaming files to another machine

**`tar --create . | ssh example.org tar --directory=/tmp --extract`** will recursively copy the current directory into the /tmp directory on example.org. This pattern is useful in lots of situations:

- the transfer needs to be automated
- physical access to the source or target machine is restricted, for example on a third–party cloud
- an archive of the data and the decompressed files are too big to fit on the filesystem at the same time
- you can’t or don’t want to install extra tools or services on either machine, especially in case of a one–time transfer
- speed is of the essence (for example, the target machine could start processing files immediately rather than having to wait for the user to mount some external storage device, copy the files across, unmount, go to the other machine, mount the device and start copying)

Sometimes [sneakernet](https://en.wikipedia.org/w/index.php?title=Sneakernet&oldid=1006394889) is appropriate, but networks today have so much bandwidth that the above could be the fastest and easiest solution. If you’re moving around lots of data it’s probably worth comparing them. If the data is highly compressible it might also be faster to add `-C` to the `ssh` command to enable gzip compression.
