---
title: "Run via $PATH"
# description:
---

# Run via $PATH {#run-path}


Even simpler is just to enter the filename of the script. This will work if the script is saved in one of the directories in your $PATH variable.

{lang="bash"}
```
script.bash
```

A typical `$PATH` looks something like this:

{lang="bash"}
```
$ echo "$PATH"
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
```

If you place an executable file called `script.bash` inside one of those directories (the ones in *your* `$PATH`, not mine) you can run it by just typing `script.bash` and pressing *Enter.* This is a great convenience – it means you can run the script without remembering its path no matter what the current working directory is. It also means you have to write the script to not depend on being in a specific working directory.

T> /usr/local/sbin is a good place for your system tools, such as background services. /usr/local/bin is a good place for your own command–line tools. The rest of the paths are for the kind of executables provided by system packages. The [Filesystem Hierarchy Standard](https://wiki.linuxfoundation.org/lsb/fhs) explains this in detail.

When installing a script to one of these directories it is common to remove the file extension, which is simply noise to the person using it. For example, to install `abc.bash` as the command `abc` in `/usr/local/bin` you could run `sudo install abc.bash /usr/local/bin/abc`. The `install` command is similar to `cp`, but in addition to copying the file across it will:

- Set the file owner and group to *root*
- Allow root to read, write and execute the file
- Allow everyone else to read and execute the file

This behavior can be modified; see `man install`.

If an alias or function already exists with the same name as a file on your `$PATH` you can force Bash to run the file command by using any of these:

- The path, for example `/bin/ls` or `./ls`
- `command FILE`, for example `command ls`
- `\FILE`, for example `\ls`
- `env FILE`, for example `env ls`

I would generally recommend the last option as it is well documented and is often used in the [shebang line](#shebang).
