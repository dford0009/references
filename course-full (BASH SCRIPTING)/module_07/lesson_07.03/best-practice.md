---
title: "Best practice"
# description:
---

# Best practice


You might have seen bareword variables like `x` in Bash arithmetic, but the use of `"$x"` above is deliberate. First, `"$x"` is consistent with how variables are used in general, and using different syntax in arithmetic contexts is just a needless complexity. Second, a subtle difference is that if `$x` is not set `x` will be coerced to zero while `"$x"` results in a syntax error. Debugging a rogue zero is going to be much more difficult than a syntax error, so we should always quote within arithmetic contexts. Example:

{lang="console"}
```
$ x='5'
$ echo "$(( (x ** 2) - (y ** 2) ))" # Don't do this!
25
$ echo "$(( ("$x" ** 2) - ("$y" ** 2) ))"
bash: (5 ** 2) - ( ** 2) : syntax error: operand expected (error token is "** 2) ")
```

`$(expr EXPRESSION)` is similar to `$((EXPRESSION))`, but **[not recommended](https://unix.stackexchange.com/a/149916).** `expr` requires you to put in quotes any part of the expression which has special meaning, like `*`, and it will be slower because it runs a new process for each expression, unlike `$((EXPRESSION))` which is calculated by the current shell process.

`let EXPRESSION` is similar to `((EXPRESSION))`, but **also not recommended** because (like `expr`) it requires you to quote any parts of the expression which have special meaning.

T> The result of the expansion is a *string representing a base 10* number. It is possible to set an *integer* attribute on a variable by using `declare -i VARIABLE` in order to treat any subsequent assignment to it as an arithmetic expansion, but the value will still be stored in memory as a string. This also makes the code more confusing, because you need to know about the state of a variable to know which value it will take. For these reasons **`declare -i` is not recommended.**

{lang="console"}
```
$ count='2 * 2'
$ echo "$count"
2 * 2
$ declare -i count
$ echo "$count"
2 * 2
$ count='2 * 2'
$ echo "$count"
4
```
