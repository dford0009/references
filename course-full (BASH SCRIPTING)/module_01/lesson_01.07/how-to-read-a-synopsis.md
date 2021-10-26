---
title: "How to read a synopsis"
# description:
---

# How to read a synopsis


T> Also called **“usage string”** or simply **“usage.”**

The synopsis is a formatted string, usually a single line towards the beginning of the documentation, which shows how to write commands for a specific program. It starts with the program name. The words after that usually align with the following patterns:

- A word in all *uppercase* is a placeholder for a word you have to provide. For example, the synopsis `foo PATH` means a command like `foo './some file.txt'` is valid, but `foo` (no file) or `foo ./1.txt ./2.txt` (two files) is not valid. This word can also reference several other parameters, such as `OPTIONS` referring to any of the options documented elsewhere.
- A word in all *lower case* is literal – it should be entered verbatim in the command. For example, the synopsis `foo [--help]` means that `foo` and `foo --help` are the only valid commands.
- A word enclosed in *square brackets* means it’s optional. For example, the synopsis `foo [PATH]` means that both `foo` and `foo './some file.txt'` are both valid.
- A word followed by an *ellipsis* means that the word can be repeated. For example, the synopsis `foo PATH…` means that `foo` takes *one* or more `PATH` arguments, meaning `foo ./first` and `foo ./first ./second` are both valid, but `foo` is not.
- A *pipe* character separates mutually exclusive choices. For example, the synopsis `foo --force|--dry-run` means that `foo --force` and `foo --dry-run` are valid, but `foo --force --dry-run` is not.
- An equals sign separates an option name from its value. For example, the synopsis `foo [--config=FILE]` means that `foo` and `foo --config=/etc/foo.conf` are both valid, but `foo --config` and `foo --config=` are not.
- Complex commands sometimes have more than one synopsis, based on fundamentally different use cases.

T> `PATH` usually means any path (not to be confused with the `PATH` variable, referred to in this book as `$PATH`), including one pointing to a directory, while `FILE` means a path to a non–directory, the sort of file you can read from.

W> Unfortunately there are many variations of the above:
W>
W> - Using lower case for both literals and placeholders. Should be avoided since it makes the synopsis ambiguous.
W> - Using angle brackets for placeholders. For example, `<file>` being equivalent to `FILE`. Not recommended since `<` and `>` are used for [redirects](#redirects).
W> - Using a space character rather than `=` between options and values. This is ambiguous: `--foo bar` could mean a *[flag](#argument-handling)* `--foo` and a completely separate argument `bar` or could mean that the value of “foo” is “bar”. Sometimes we can guess based on the name of the words that they belong together, but `--foo=bar` is less ambiguous.
W> - Making the space between options and values optional. For example, `-cFILE` being equivalent to the longer but unambiguous `--configuration=FILE`.
W> - Using ellipses even though the values are not shell words. For example, the synopsis may say `FILE…` but the documentation specifies that each file must be separated by a comma.
W> - Printing all the short options as one word prefixed with a hyphen. Quick, what do you make of `[-AcdrtuxGnSkUWOmpsMBiajJzZhPlRvwo?]`?
W>
W> Make sure to read the documentation if it’s unclear.

In short: `PLACEHOLDER`, `literal`, `[optional]`, `repetition…` and `first choice|second choice`.

Based on this, let’s see what we can learn from the following synopsis:

{lang="text"}
```
dwim [--verbose] pack|unpack PATTERN FILE…
dwim [--version|--help]
```

- `dwim`, `--verbose`, `pack`, `unpack`, `--version` and `--help` are literals.
- `PATTERN` and `FILE` are placeholders.
- The most common use cases are `dwim pack PATTERN FILE…` and `dwim unpack PATTERN FILE…`.
- When running `dwim pack` or `dwim unpack` we need to specify exactly one pattern and at least one file.
- The `--verbose` flag is optional.
- We can run `dwim --version` to print `dwim`’s version information.
- We can run `dwim --help` to print `dwim`’s documentation.
