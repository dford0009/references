---
title: "Floating-point and advanced math"
# description:
---

# Floating-point and advanced math


As mentioned, Bash only supports integer math. Trying to use non–integer numbers results in an error message like this:

{lang="console"}
```
$ echo "$((2 * 1.1))"
bash: 2 * 1.1: syntax error: invalid arithmetic operator (error token is ".1")
```

`bc` is commonly used for math involving large or decimal numbers. It can be run in an interactive shell by running it with no parameters and without standard input. In the shell you can type expressions to get answers:

{lang="console"}
```
$ bc --quiet
2 ^ 100
1267650600228229401496703205376
quit
```

T> `--quiet` avoids printing a few lines of extra information when starting the shell.

The first and last lines after the command are input, and the second is the output. As we can see there are two differences from Bash arithmetic: The power operator is `^` rather than `**` and the values do not wrap at 2^63^ – 1. In fact, `bc` can handle both huge and tiny numbers. The operators and limits are documented in `info bc`.

T> Floating-point numbers are fixed–precision. That is, each floating-point number uses a specific number of bits to store a value, which means it has practical limits to both size and precision. As far as I can tell `bc` does not support [IEEE 754 floating-point](https://en.wikipedia.org/w/index.php?title=IEEE_754&oldid=1011394259) math, but most popular programming languages do.

You can also run `bc` non–interactively by passing expressions on standard input. This is the default way:

{lang="console"}
```
$ bc <<< '4 * 3'
12
```

By default `bc` does not print decimal digits, and rounds toward 0:

{lang="console"}
```
$ bc <<< '5 / 3'
1
$ bc <<< '-5 / 3'
-1
```

The `scale` variable controls how many digits `bc` prints after the decimal point. It defaults to zero — hence the integer results above. We can set `scale` to a positive number to get a decimal number:

{lang="console"}
```
$ bc <<< 'scale = 2; 2/3'
.66
```

We can also control both the input and output bases with the `ibase` and `obase` variables, respectively. For example, we can convert hexadecimal 0xff to binary:

{lang="console"}
```
$ bc <<< 'ibase = 16; obase = 2; FF'
11111111
```

T> The hexadecimal characters must be *uppercase,* otherwise the input is coerced to zero.

Another important feature of `bc` is the square root function, `sqrt`:

{lang="console"}
```
$ bc <<< 'scale = 2; sqrt(2)'
1.41
```

Anything much more advanced than this should probably be implemented in another language.
