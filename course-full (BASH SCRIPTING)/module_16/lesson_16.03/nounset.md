---
title: "nounset"
# description:
---

# nounset


`nounset` treats attempts to reference an undefined variable as an error. The following script assumes that an argument is always passed to it:

{lang=bash}
<<[walking-skeleton/nounset-example.bash](./protected/code/src/walking-skeleton/nounset-example.bash)

T> Strictly speaking `errexit` is redundant in this case, because *`nounset` implies `errexit` when running in a non–interactive shell.* Since this is surprising behavior I still recommend setting `errexit` explicitly.

This script stops with an exit code of 1 at the `dir="$1"` line (again without executing it). Without `nounset` the loop would have iterated over all the files in the root directory, which could be catastrophic depending on the actual processing.

Several projects have done Bad Things™ by not setting `nounset`, such as the ever–popular “remove all files everywhere.“

To explicitly allow referring to an optional variable, you can use the “default if undefined” [string replacement](#string-replacements), for example `${1-.}` to default to the current directory.
