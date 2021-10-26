---
title: "Cleaning up"
# description:
---

# Cleaning up


### Variable scope

**Aim of this section:** Understand how variables are scoped to avoid namespace pollution and associated bugs.

It can get really difficult to tell what is happening when there is a lot of global state. Here we’ll look at some ways to reduce the scope of variables to avoid namespace pollution.

#### Command scope

A variable **assigned in the prefix of a command is scoped to that command.** For example, it is common practice to ensure consistent sorting by setting the `$LC_COLLATE` variable. Compare

{lang="console"}
```
$ printf '%s\n' a A | LC_COLLATE=en_US.utf8 sort
a
A
```

to

{lang="console"}
```
$ printf '%s\n' a A | LC_COLLATE=POSIX sort
A
a
```

T> `LC_COLLATE` is a special [locale](#encoding) setting. “POSIX” is a special locale which is available on all modern \*nix systems, which makes it ideal for portability.

Please note that the assignment becomes part of the context of the *command,* not the shell, so assigning one before a shell builtin does not work:

{lang="console"}
```
$ name=Smith echo "$name"
[prints an empty line]
```

#### Function scope

A variable can be **scoped to a function:**

{lang=bash,crop-start-line=6}
<<[walking-skeleton/local-variable-example.bash](./protected/code/src/walking-skeleton/local-variable-example.bash)

This scope is separate from the shell scope, so we can even use the same variable outside the function:

{lang="console"}
```
$ line='original value'
$ quote <<< 'example text'
> example text
$ echo "$line"
original value
```

Using the same variable for different things within the same script is not recommended, even when using local variables, but this at least makes the function *reusable* in other scripts and free of one kind of side effect.

#### Shell scope {#export}

**Exported variables are scoped to the declaring and descendant shells.** This basically means that once a variable is exported it is in context for the remainder of that script, including any subshells. This can be handy for consistency. For example, to ensure consistent locale handling in the entire script we can put `export LC_ALL=POSIX` near the top. The flip side of this convenience is that these are effectively global variables — they should be used sparingly, when the convenience of having the variable available everywhere is more important than the added complexity in the context with the associated risk of unintended side effects.

In interactive shells variables such as `$HOME` and `$USER` are automatically exported — you can list the currently exported variables with `declare -x` or its shorthand `export`.

Variables are otherwise **scoped to the shell they are declared in.**

Scope can be confusing, because “the shell” refers to any *code* written in the shell, not the *commands* which run inside the shell. For example, non–exported variables are readable in subshells, but any subshell value changes are local:

{lang="console"}
```
$ unset value
$ value=outer
$ (echo "$value"; value=inner; echo "$value";)
outer
inner
$ echo "$value"
outer
```

Basically, non–exported variables used within a subshell work similarly to exported variables used within another script.

### Taking out the files {#temporary-files}

**Aim of this section:** Remove temporary files when the script ends to avoid clutter and crashes.

Storing the intermediary results of your script in temporary files can be handy to debug a complex or evolving process. It’s important to clean up these files after running or you risk running into any of these issues:

- **No more disk space.** This usually is fairly easy to fix, but can often cause arbitrary processes to crash.
- **No more inodes.** If your script produces a lot of files, even tiny ones, you can run into this. `df --inodes` will give you the relevant numbers. The symptoms are usually going to be the same as running out of disk space.
- **No more memory.** Temporary directories are often mounted as virtual memory filesystems for performance reasons:

   {lang="console"}
   ```
   $ stat --file-system --format=%T /tmp
   tmpfs
   ```

   Running out of memory is usually going to result in processes having a bad time.

In addition it’s just *nice* to clean up after running — less clutter and easier debugging. We also want to make sure that the cleanup process is as simple as possible, to avoid bugs like deleting the wrong files or leaving some files behind. This is a perfect use case for [traps](#traps):

{lang=bash,crop-start-line=6}
<<[walking-skeleton/cleanup-always.bash](./protected/code/src/walking-skeleton/cleanup-always.bash)

Now, unless your script is [killed](#kill) with `SIGKILL` (which bypasses all traps) every file in the temporary directory will be removed when the script exits. This means your script no longer needs to keep track of which temporary files it creates, which makes the cleanup process simple and reliable. Another advantage of this is that if `mktemp` succeeds you are *guaranteed* that the files you are working with will not collide with files created by other users — creating a directory is an atomic operation on most local filesystems, and only the creator and root have access to the contents.

You may want to make sure the files are *not* deleted in case of an error. A simple tweak will ensure this:

{lang=bash}
<<[walking-skeleton/cleanup-on-success.bash](./protected/code/src/walking-skeleton/cleanup-on-success.bash)

This will alert the user in case of error, so they know where to find the temporary files. For example:

{lang="console"}
```
$ ./cleanup-on-success.bash
Script failed. Temporary directory: /tmp/tmp.jy9eCZjFVK
$ ls /tmp/tmp.jy9eCZjFVK
result.txt
```
