---
title: "Testing"
# description:
---

# Testing


Before getting into to the details there’s a popular myth which needs dispelling: that testing shell scripts is basically pointless. I suspect this is an unfortunate side–effect of the most common style of shell script: a bunch of commands with many responsibilities and side–effects. As a community, developers moved away from that many years ago in most programming except shell scripting. One reason for this is probably that shell scripts can be difficult to handle as a unit when [split up](#source) — a set of shell scripts are much less of a unit than a set of Java classes or even a Python package. But by splitting up scripts we can make them much easier to test. We just need to make sure they stay together into production, so that they still work as a unit.

Another common myth is that testing is an all–or–nothing proposition. Instead, every test should improve the project a little bit, *allowing the long–term quality and speed of development to become good enough and stay good enough.*

Probably the highest value testing to get started with is a simple side–effect–free transformation. Code without side–effects is easy to test, because it doesn’t matter in which order the tests run. They can even run in parallel, which is *really* helpful once your test run times crawl up over the one second mark. A lot of shell scripts are written so that almost every line has side–effects, but usually those side–effects can be isolated so that the remaining code can be tested easily. And transformations are really common in shell scripts.

Let’s start with a typical example: your application stores database connection information in a JSON configuration file. You want to write a backup script, and have decided that doing this as Bash is easiest for now. But the database client takes this configuration as command line arguments, so you need to transform it. You might already be thinking about something like `database_client $(grep --regexp=… config.json | sed --expression=…) STATEMENT` – let’s see how you might test that transformation.

config.json:

{lang="json"}
```
{
  "username": "user",
  "password": "pass"
}
```

We want our new script to print “user” followed by “pass”, each NUL–terminated:

{lang=bash}
<<[quality-assurance/test-config-transformer.bash](./protected/code/src/quality-assurance/test-config-transformer.bash)

T> [`shunit2`](https://github.com/kward/shunit2/) is probably the leading framework for testing shell scripts. It is focused on portability, so if you do need to write portable shell scripts it is a good choice for testing all of them with the same script. Unlike [ordinary scripts](#walking-skeleton) we should not `set -o errexit` etc. in test scripts, because these options would interfere with the way shunit2 works.

Our first test run:

{lang="console"}
```
$ ./test-config-transformer.bash
test_should_print_username_and_password
./test-config-transformer.bash: line 10: ./config-transformer.bash: No such file or directory
ASSERT:expected:<user> but was:<>
ASSERT:expected:<pass> but was:<>
shunit2:ERROR test_should_print_username_and_password() returned non-zero return
code.

Ran 1 test.

FAILED (failures=3)
```

T> Sometimes writing a bit of boilerplate is necessary to be able to get a useful error message. In this example creating config-transformer.bash first would not substantially change the test result, so I’ve skipped that step.

Let’s try a naive implementation:

{lang=bash}
<<[quality-assurance/config-transformer.bash](./protected/code/src/quality-assurance/config-transformer.bash)

Our second test run:

{lang="console"}
```
$ ./test-config-transformer.bash
test_should_print_username_and_password

Ran 1 test.

OK
```

This gets the job done for our oversimplified example, but you’ve probably already spotted some terrible bugs:

- The `grep` command matches other lines with names or values containing “username” or “password”.
- JSON escapes are not reversed, so the output may contain redundant backslashes.
- The script relies on a particular pretty–print format of JSON, where each property is on a separate line.

All of these point to the same cause: `grep`, `tr` and `cut` are line–based tools, not JSON tools. The easiest fix is to use an actual [JSON parser](#json) such as `jq` for this. And because of how we’re writing tests we won’t have to modify the existing ones when swapping out the application code.

T> I would recommend looking into the *red, green, refactor test–driven development (TDD)* approach to end up with robust shell scripts. It is a difficult technique, but well worth it to end up with simple production code and short, orthogonal tests.

As a more complete example, this is the test suite for `multigrep.bash`, shown in the [Exit Codes](#exit-codes) chapter:

{lang=bash}
<<[exit-codes/test-multigrep.bash](./protected/code/src/exit-codes/test-multigrep.bash)
