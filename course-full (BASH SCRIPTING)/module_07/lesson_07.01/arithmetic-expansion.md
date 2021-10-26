---
title: "Arithmetic expansion"
# description:
---

# Arithmetic expansion


If you want to perform a calculation and *use the resulting base 10 string for something* the syntax is `$((EXPRESSION))`. This is called **arithmetic expansion** because Bash expands (replaces) the arithmetic expression with a string when running the command, and the inside of the parentheses is called a **numeric context** because the expression is treated as arithmetic rather than a string. An example, printing the result of x² – y², should make this clearer:

{lang="console"}
```
$ x='5'
$ y='3'
$ echo "$(( ("$x" ** 2) - ("$y" ** 2) ))"
16
```

T> Strictly speaking, the inner parentheses are not needed, because exponentiation has higher precedence than subtraction, but it often pays to be explicit. Also, whitespace is ignored but helpful.
