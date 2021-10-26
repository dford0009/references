---
title: "From the Terminal to Production"
# description:
---

# From the Terminal to Production {#walking-skeleton}

The terminal is great for running experiments: massage the input into a usable form, pass it to a processing command, and pull out the interesting bits from the output. However, once you’ve ended up with a useful, working set of commands, putting them together into a maintainable and user–friendly script involves many other pieces. In this chapter we’re going to explore how to go about this, taking an in–depth look at some best practices along the way.  We’re going to discuss the portable shebang line, well–structured documentation, flexible argument handling, strict error handling, cleanup code, and more.

T> The concepts discussed here are central to our goal of writing production–ready, maintainable scripts. However, if there are any concepts that you’re not yet familiar with, feel free to come back to them after reading other chapters.
