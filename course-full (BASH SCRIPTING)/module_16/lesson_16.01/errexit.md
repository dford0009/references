---
title: "errexit"
# description:
---

# errexit


The idea behind this is that the script should exit whenever it encounters an error, also known as a non–zero exit code. This script illustrates the idea:

{lang=bash}
<<[walking-skeleton/errexit-example.bash](./protected/code/src/walking-skeleton/errexit-example.bash)

Running this script is completely safe! The `false` command returns a non–zero exit code; Bash notices this and terminates the script immediately. We’re all safe, at least for now.

Some exceptions to this rule are necessary to be able to write useful programs. We still want to be able to use conditionals, and we can:

{lang=bash}
<<[walking-skeleton/errexit-conditionals.bash](./protected/code/src/walking-skeleton/errexit-conditionals.bash)

T> `[[ … ]]` is a *conditional expression:* it returns either 0 (success) or 1 (failure) depending on a condition. In the above case the condition is checking whether the first argument (`$1`) is an ordinary file (`-f`). The space after `[[` and before `]]` are necessary, because `[[` is just another command with arguments.

Since the root directory is not a plain file the `[[` command returns a non–zero exit code, but because the command runs inside a conditional this does not stop the script: it prints “No” and then “Done”.

Unfortunately determining what `errexit` will do is sometimes an expert–level topic (see [Why doesn’t set -e (or set -o errexit, or trap ERR) do what I expected?](https://mywiki.wooledge.org/BashFAQ/105?action=recall&rev=27) and [Bash: Error handling](https://fvue.nl/w/index.php?title=Bash:_Error_handling&oldid=10894)). Because of this some developers discourage the use of `errexit` altogether. I personally recommend using it for these reasons:

- **Critical scripts should be *[tested](#testing).*** For example, if your script takes one or more files there should be an automated test which verifies that not passing a file results in the expected exit code. `errexit` makes this easy.
- Many of the unexpected ways `errexit` is handled is caused by not writing the simplest code possible. So *using `errexit` indirectly encourages writing simpler code.*
- There are really only three alternatives:
   - Using a different language with better error handling might be an option if we can convince the stakeholders that it will be worth it. If Bash was chosen for good reasons, like fast development and simple stream processing, this might be a difficult sell.
   - Not handling errors at all, which takes on a massive risk even for a simple program.
   - Handling errors yourself. This might seem pragmatic, but appending `|| exit $?` to almost every line is not going to help maintainability and `trap 'exit $?' ERR` is just duplicating what `errexit` does in the first place, with the additional risk of a typo silently breaking the error handling.
