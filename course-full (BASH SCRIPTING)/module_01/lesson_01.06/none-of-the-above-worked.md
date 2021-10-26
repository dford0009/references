---
title: "None of the above worked!"
# description:
---

# None of the above worked!


In the worst case the documentation might be so big (or the developers so conservative about using disk space) that the documentation is in a separate package. In that case you’ll have to go through a more difficult process:

1. Figure out which package manager installed the package you want the documentation for.
1. Ask the package manager what the package name is for your tool.
1. Ask the package manager for other packages with names containing the package name found above. Sometimes there is a separate package with a name like `COMMAND-doc` containing extensive documentation.

This process is unfortunately completely package–specific, and there is no guarantee of success. Fortunately this situation is uncommon, and with massive storage being the norm it will probably become even less common over time.
