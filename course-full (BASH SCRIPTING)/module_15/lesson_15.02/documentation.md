---
title: "Documentation"
# description:
---

# Documentation


**Aim of this section:** Create easily–readable structured script documentation.

You wouldn’t write a script which did something trivial, so you should help out those people running it in the future (such as yourself) by including enough documentation to at the very least know what it is meant to do and how to run it.

There is no commonly–accepted format for this documentation. Some use existing languages like troff (the source language of `man` pages) or Markdown, but the problem with such languages is that the documentation in the actual script file is then no longer plain text.

If you want to produce stand–alone or typeset documentation for your script I would recommend putting it in a separate file and adding the plaintext version to the script in a post–processing step when releasing a new version. This way the documentation in the script is always readable, and you don’t need to keep two versions of it in sync.

If instead you’re fine with documenting the script using plain text within it, there’s a simple trick to make it easily readable:

1. Resize the terminal window until it is as wide as your script’s maximum line length (anywhere from 78 to 120 characters is common) *minus two.* So if you want the text of a line of documentation to be maximum 100 character, use a terminal width of 98. You can use `echo $COLUMNS` to check the width after resizing.
1. Run `man man`.
1. Use that manual page as your template by prefixing each line with `#` and a space (hence the “minus two” above).

This should make the documentation easily readable for anyone familiar with the most ubiquitous command line documentation format in existence.

An example of 80 characters wide documentation:

{lang=bash,,crop-start-line=2}
<<[walking-skeleton/documentation.bash](./protected/code/src/walking-skeleton/documentation.bash)

These sections should be fairly self–explanatory, and are relevant for almost any program. Which sections you choose to include is of course up to you, and I would encourage browsing the `man` pages of similar programs to get ideas for other useful sections.
