---
title: "Running a script on another host non–interactively"
# description:
---

# Running a script on another host non–interactively


Once you can connect to a host using SSH you can of course run commands interactively while in the remote shell. You can also run a single command on the server and exit immediately with `ssh HOST COMMAND [ARGUMENT…]`. For example, `ssh example.org export` will start a remote shell, run the `export` command in the remote shell, and then exit the remote shell immediately.

There is a major issue with running anything but the most trivial commands this way: any characters which have a special meaning to the *shell* need to be escaped or quoted, otherwise they apply to the *local* shell. For example, `ssh example.org cd /tmp '&&' echo "\$PWD"` will open a shell on the server, change the working directory to /tmp, and finally print the value of `$PWD` as set by the server. This is cumbersome and error–prone.

A more subtle issue is that *`ssh HOST COMMAND [ARGUMENT…]` [will consume the client’s standard input to pass it to the remote command](https://mywiki.wooledge.org/BashFAQ/089?action=recall&rev=20).* Here’s a common way to run into this issue:

{lang=bash,crop-start-line=7}
<<[ssh/broken-stdin-handling.bash](./protected/code/src/ssh/broken-stdin-handling.bash)

T> [`shellcheck` detects this issue](https://github.com/koalaman/shellcheck/wiki/SC2095), but `shellcheck` can’t detect *all* such issues. Testing with more than one input line is the best way to make sure the loop works as intended.

This script is meant to try to connect to all the IPs listed in /etc/hosts to check which are reachable using SSH, but it will actually only run at most *one* `ssh` command! What happens is that `read` consumes the first line of the input, then the `ssh` command consumes the rest of the input. Once the `read` command comes around again there’s no more input to be read, so the loop stops prematurely.

If you want to run anything non–trivial you can instead pass a script into standard input of the `ssh` command, for example `ssh example.org < dwim.bash`. That way you don’t have to transfer the script to the server first, *and* avoid the issues described above. Just beware that *everything* in the script runs remotely: if the script depends on commands, files or variables which are not available on the server it will fail.

T> `ssh -n` will achieve the same result, but is completely application–specific. Passing data on standard input or plugging it with `< /dev/null` is applicable to *all* commands.

The exit code from an `ssh` command is the exit code of the command passed to it, so you can check for that locally after running the command just like you would if the command ran locally. The only exception is exit code 255, which is reserved for SSH client errors.
