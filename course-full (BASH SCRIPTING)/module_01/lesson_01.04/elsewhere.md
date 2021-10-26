---
title: "Elsewhere"
# description:
---

# Elsewhere


Reference documentation, by its nature, can’t answer many of the important questions you might have during development:

- Which tool is the most convenient to achieve what you want? It can be tempting to treat any Turing–complete language as a [golden hammer](https://en.wikipedia.org/w/index.php?title=Law_of_the_instrument&oldid=1005547888) when much more convenient alternatives exist.
- What is the idiomatic way to achieve what you want? Developer communities will usually gravitate towards one way,  or a small handful of ways of doing anything common, whether it’s how to indent code blocks or check whether a file is empty. Using these patterns makes it easier for others to understand your code, which is one of the most important characteristics of any software.
- What are the important characteristics of this solution? Does it process one line (slow) or buffer (fast) at a time? Does it handle unusual input like newline, backslash, quotes, NUL, empty lines or non–existing paths? Is it robust in the face of third party failures?

This book tries to give you the tools to answer some of these yourself, but for specific questions there are lots of excellent resources online. The following are some of the best in their respective fields:

- [Stack Overflow](https://stackoverflow.com/) for general programming questions.
- [Unix & Linux Stack Exchange](https://unix.stackexchange.com/) for Bash and other \*nix tools questions.
- [Software Engineering Stack Exchange](https://softwareengineering.stackexchange.com/) for more subjective questions around how programming interacts with the real world.
- [Greg’s Wiki](https://mywiki.wooledge.org/) has heaps of good advice.
- [Code Review Stack Exchange](https://codereview.stackexchange.com/) to invite others to review your code.

T> Your favorite search engine can often help, but this is risky. For one thing, it can be difficult to know which search terms to use. Searching for “while read loop” when the idiomatic solution actually pipes the result to a tool you don’t yet know exists could lead to no answers or (even worse) the wrong answers. Search engines also do a poor job of finding the best resources. Top results pretty much by definition come from sites which are good at optimizing for search engines, but their content is often missing crucial details, outdated or even plain wrong.
