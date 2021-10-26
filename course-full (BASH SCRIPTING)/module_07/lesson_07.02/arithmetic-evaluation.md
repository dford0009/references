---
title: "Arithmetic evaluation"
# description:
---

# Arithmetic evaluation


Sometimes we care about the exit code or side–effect of the expression but not the string value of it. We can **evaluate** (that is, calculate) an expression without printing anything using the syntax `((EXPRESSION))`. One common use case is incrementing a counter:

{lang="console"}
```
$ count='0'
$ ((++count))
$ echo "$count"
1
```

T> Notice how the variable in the arithmetic expression is not preceded by a dollar sign. This is intentional: to increment a variable we need the expression to refer to the *name* of the variable, not its value.

W> `((++count))` is called pre–increment: the variable is incremented and the *new* value is the value of the expression. There is also post–increment, `((count++))`, where the *original* value before incrementing is the value of the expression. In other words, given `count=0`, the value of `((++count))` is 1 and the value of `((count++))` is 0. This relates to an important quirk: **arithmetic evaluations return 1 (indicating failure) if the value of the calculation is zero.** This is why I used pre–increment above: post–incrementing a variable with a value of 0 results in 0, which in turn results in an exit code of 1:
W>
W> {lang="console"}
W> ```
W> $ count=0
W> $ ((count++))
W> $ echo "$?"
W> 1
W> ```
W>
W> For this reason it is important to consider whether any arithmetic evaluation could result in a value of zero, and to handle or avoid this situation to avoid terminating the program early. For a uniformly increasing counter starting at 0 this leads to an obvious pattern: always pre–increment.
W>
W> To be clear, the value of `$count` is incremented even though the exit code is 1. It’s just not very helpful if the program exits because some arbitrary calculation yielded 0.
W>
W> When doing anything more complex it might be worth allowing exit code 1 specifically. For example, when doing arithmetic on user input basically any operation can result in zero. When such an operation fails we can check whether the exit code was 1. This results in a command where exit code 0 or 1 are treated as success, and any other exit code is treated as a failure, as in lines 13 and 15 below:
W>
W> {lang=bash}
W> <<[math/count.bash](./protected/code/src/math/count.bash)

Another common use case is comparison. The exit code of a comparison will be 0 if true and 1 if false:

{lang="console"}
```
$ x='5'
$ y='7'
$ if (("$x" > "$y"))
> then
>     echo "x is bigger"
> else
>     echo "y is bigger"
> fi
y is bigger
```
