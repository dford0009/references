---
title: "printf"
# description:
---

# printf


`printf` takes a *format specifier* as the first argument, and substitutes the following arguments in the format repeatedly, giving us complete control of the output. We’ll look into the two main placeholders used in the format specifier, `%s` and `%q`. See `man 1 printf` for more details.

### `%s` - String

{lang="console"}
```
$ names=('Ada Lovelace' 'Alan Turing')
$ printf 'Name: %s\n' "${names[@]}"
Name: Ada Lovelace
Name: Alan Turing
```

Let’s deconstruct that format specifier:

- `%s` formats an argument as a string. This is the part of the format string which is replaced by subsequent arguments (from the `$names` array variable in the above code).
- The rest of the string (the prefix “Name: ” and the escaped newline “\n”) is printed as–is every time the format is repeated.

To reproduce this with `echo` we would have to loop over the entries in the array manually. Analogous to HTML and CSS in web development, `printf` cleanly separates the content (the `$names` array) from the formatting (the “Name: ” prefix, string substitution and newline suffix).

### `%q`

We can also put several `%` format specifiers within a format string to consume more than one entry at a time. One handy use case for this is if we have an array with *pairs* of keys and values, and want to create a Bash configuration file with `key=value` assignments to [source](#source) later. Let’s try it using the `%s` format specifier:

{lang="console"}
```
$ assignments=('developer' 'Ada Lovelace' 'license' 'GPLv3+')
$ printf '%s=%s\n' "${assignments[@]}" > settings.bash # Don't do this!
$ cat settings.bash
developer=Ada Lovelace
license=GPLv3+
$ . settings.bash
Lovelace: command not found
```

What happened here? The main problem is that `developer=Ada Lovelace` is *two* words as far as Bash is concerned, because the space character is neither quoted nor escaped. So the meaning of this line is that Bash tries to run the `Lovelace` command with `developer=Ada` as part of its context. Fortunately it’s easy to avoid this by using the `%q` format specification, which automatically quotes or escapes the output so that it’s reusable in Bash:

{lang="console"}
```
$ printf '%q=%q\n' "${assignments[@]}" > settings.bash
$ cat settings.bash
developer=Ada\ Lovelace
license=GPLv3+
$ . settings.bash
$ echo "$developer"
Ada Lovelace
```

T> Unfortunately, trying to share setting files like this one between languages is generally a Bad Idea™. Variable assignment rules are completely different in different languages, and reimplementing one language’s parsing rules in another language is going to be time consuming and brittle. In such situations I recommend using a well–supported language like JSON to store assignments. At least then the only thing we should have to worry about is the value [encoding](#encoding).
