---
title: "Arithmetic operators"
# description:
---

# Arithmetic operators


Another common numeric context is conditionals with arithmetic operators, documented in the “Conditional Expressions” part of `man bash`. The arithmetic operators are `-eq` (equal), `-ne` (not equal), `-lt` (less than), `-le` (less than or equal), `-gt` (greater than), and `-ge` (greater than or equal). `[[ "$count" -le '3' ]]` is equivalent to `(( "$count" <= '3' ))`: both sides are coerced to numbers and compared as such. The latter form should be more familiar from other languages, but there is another reason for avoiding numeric comparisons in `[[`: confusing numbers with strings. For example, the numeric operators coerce each argument to a number before comparing them:

{lang="console"}
```
$ month='07'
$ [[ "$month" -eq 7 ]]
$ echo "$?"
0
$ [[ "$month" == 7 ]]
$ echo "$?"
1
```

T> You will sometimes see `=` used instead of `==` in `[[` comparisons, and both are valid. Some prefer `=` because it’s defined in [POSIX](#portability), but since most languages use `=` *only* for assignments and `==` *only* for comparisons, following the convention by using `==` in Bash is more universally readable.

In the first example “07” is treated as the number 7, which is equal to the second number 7. In the second example “07” is treated as a string, and is therefore not equal to the second string “7”. “07” is *numerically* equal to “7”, but not string equal.

Using a numeric operator for strings has a different problem — to coerce a string to a number, any non–number characters are removed. If there are no characters left, the value is coerced to zero. So two strings with no numbers in them are both numerically equal to zero:

{lang="console"}
```
$ month='August'
$ [[ "$month" -eq 'June' ]]
$ echo "$?"
0
$ [[ "$month" == 'June' ]]
$ echo "$?"
1
```

W> `(( "$month" == 'June' ))` has the same problem of not reporting invalid numbers.

The following example is much closer to what other languages do — the comparison is in brackets similar to languages like Java, and the numeric comparison operator is `==`:

{lang="console"}
```
$ (( "$month" == 7 ))
$ echo "$?"
0
```

In short, I would recommend using `[[` when dealing with strings and `((` when dealing with numbers.

The range of Bash integers is 2^64^. Over– and underflow are silent, so if you want to deal with numbers outside that range you should probably be using a different language.
