---
title: "Listing Files"
# description:
---

# Listing Files

“Listing” files can refer to two separate types of tasks: **[searching](#searching)** and **[enumerating](#enumerating)**.

**Searching** for files means you don’t yet know which files you’re looking for. For example, you might be looking for something you suspect exists on the filesystem but can’t pinpoint yet. It is also useful to work out and validate assumptions about which paths you care about, for example during prototyping.

Basic **enumeration** is when you know the exact paths to the files you’re interested in, and you need to refer to them in your project, by absolute or relative paths. More advanced enumeration involves *patterns* of metadata, such as “every file within a specific directory”, or “every empty file”.
- Simple path patterns are easy to handle reliably in scripts using shell builtin syntax called **[globs](#globbing).**
- Complex patterns or other metadata searches often require the use of the **[`find`](#find)** command.
