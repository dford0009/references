---
title: "Development environment"
# description:
---

# Development environment


This book was written using Bash 4.2 and 5.0 on Linux. The majority of the contents should be applicable to versions long before and after those, and to other Unix–like operating systems. However, since *everything* on Linux is configurable, absolute statements such as “`$PATH` will not be defined in a crontab” should be treated as a pragmatic shorthand for providing a virtual machine with the configuration I used when writing. It is not even theoretically possible to write a piece of software which will behave the same no matter how and where it is run. So the only way to *know* what some command will actually do is to run it, and no statement in this book should be treated as absolute truth. In the same vein, the code in this book is written to make a best effort at doing the right thing in a reasonable set of circumstances.

The included scripts have been linted using ShellCheck. Some of them have been tested using shunit2.
