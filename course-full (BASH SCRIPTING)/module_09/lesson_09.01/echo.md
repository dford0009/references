---
title: "echo"
# description:
---

# echo


You might have heard of `echo` as *the* command to “print lines.” Technically it emits each of the arguments in turn, separated by a space character, and prints a single newline at the end. Let’s explore this with some examples.

{lang="console"}
```
$ echo "It’s pitch black. You’re likely to be eaten by a grue."
It’s pitch black. You’re likely to be eaten by a grue.
$ █
```

As you can see the cursor appears on a new line below the output. Since the prompt does not contain a newline, that newline must be part of the output of `echo`. We can confirm this by printing the output character representations:

{lang="console"}
```
$ echo 'A' | od --address-radix=n --format=c --width=1
   A
  \n
```

T> `od` is a tool for converting arbitrary data between different formats. In this case we’re telling it to:
T> - not display address offsets periodically (`--address-radix=n`)
T> - format the input as printable ASCII character equivalents (`--format=c`)
T> - print one byte representation per line (`--width=1`)
T>
T> `hexdump` and `xxd` have similar features, but they have different ways of expressing the same conversions.

This shows us that the `echo` command emitted a byte corresponding to the ASCII character “A” plus a byte corresponding to a newline. This is a very common requirement when dealing with human–readable output, but most of the time it’s best to follow the [Unix philosophy](https://en.wikipedia.org/w/index.php?title=Unix_philosophy&oldid=1005332227) and think of the output of your program as the input to another program. For that, there’s `printf`.
