---
title: "Conventions used in this book"
description: First stop, orientation
---

# Conventions used in this book

I use “Linux” almost exclusively when talking about the operating system surrounding the shell, because

- while Bash is available on all the big platforms, [as of 2020 Linux is the most popular platform with professional developers](https://insights.stackoverflow.com/survey/2020#technology-platforms-professional-developers5)
- “[GNU](https://www.gnu.org/)/Linux” never caught on, despite the massive importance of the GNU tools
- Linux is the only Unix–like operating system I’ve used in the last few years

`PATH` *may* refer to a variable name, and `$PATH` *definitely* refers to a variable value. I will use the latter to avoid any confusion between variables and other things.

`[…]` means that some of the command output was omitted for brevity. This should be more readable than a bunch of `cut`, `head` and `tail` commands.

Throughout this book, you will see the following typographical conventions that indicate different types of information:

**In–line code references** will look like this: `echo "$SHELL"`.

**Blocks of code** look like this:

{lang=bash}
<<[walking-skeleton/shebang.bash](./protected/code/src/walking-skeleton/shebang.bash)

[comment]: <GM: what is PS1 and PS2?>

**Shell sessions** include:

- The [prompt](https://www.gnu.org/savannah-checkouts/gnu/bash/manual/bash.html#index-PS1), which is the string printed before the cursor when starting a new command. It’s set as simply `PS1='\$ '` to make it stand out while being short.
- The command itself.
- [Continuation indicators](https://www.gnu.org/savannah-checkouts/gnu/bash/manual/bash.html#index-PS2), which are the strings printed before every line after the first one in a multi–line command. It’s set to the default, `PS2='> '`.
- Command standard output and standard error.

Example:

```
$ cat > credentials.json << 'EOF'
> {"username":"jdoe","password":"sec\\ret"}
> EOF
$ jq . credentials.json
{
  "username": "jdoe",
  "password": "sec\\ret"
}
```

- `cat` is the first command, spread over three lines and with no terminal output.
- [`jq`](#json) is the second command, followed by its output.

T> [`$PS0`](https://www.gnu.org/savannah-checkouts/gnu/bash/manual/bash.html#index-PS0) is empty. [`$PS3`](https://www.gnu.org/savannah-checkouts/gnu/bash/manual/bash.html#index-PS3) and [`$PS4`](https://www.gnu.org/savannah-checkouts/gnu/bash/manual/bash.html#index-PS4) are not relevant to this book.

When relevant, shell sessions may include a `█` character to indicate the position of the cursor after running the last command.

**Tips and tricks** look like this:

T> `mkdir` is short for “make directory.”

**Warnings** look like this:

W> Use More Quotes™!
