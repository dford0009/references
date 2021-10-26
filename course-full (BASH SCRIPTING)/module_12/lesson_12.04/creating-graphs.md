---
title: "Creating graphs"
# description:
---

# Creating graphs


[DOT](https://www.graphviz.org/documentation/) is a text format for representing abstract graphs, for example architecture.gv below:

T> “DOT” is not an abbreviation, just an all–caps name.

{lang=dot}
<<[images/architecture.gv](./protected/code/src/images/architecture.gv)

T> Replace `graph` with `digraph` and `--` with `->` to create a *directed* graph.

T> The last few lines of the DOT file were used to create an image suitable for inclusion in this book, and are completely optional. `bgcolor = transparent;` sets the background to be transparent rather than a fixed color. `dpi = 300;` sets the dots per inch to use to calculate the resulting image resolution. `size = "8.5,11!";` creates an image scaled up to where either the width is 8.5", the height is 11", or both, at the given DPI.

The [Graphviz](https://graphviz.org/) package contains the `dot` tool which converts DOT files (usually with a `.gv` extension) to [images](https://graphviz.gitlab.io/_pages/doc/info/output.html):

{lang="console"}
```
$ dot -Tpng architecture.gv > architecture.png
```

T> `-Tpng` specifies the output format as [Portable Network Graphics](https://en.wikipedia.org/w/index.php?title=Portable_Network_Graphics&oldid=1008317236), a popular bitmap image format. Other output formats are documented in `man dot`. `-Tsvg` for [Scalable Vector Graphics](https://en.wikipedia.org/w/index.php?title=Scalable_Vector_Graphics&oldid=1010497114) output is probably the most popular vector image format.

The resulting image:

![Example graph](./public/images/images/architecture.png)

As you can see, architecture.gv contains absolutely no directives about how the graph should be presented, only the nodes and their connections. The layout is created by `dot`, which tries to position the nodes in a sensible way automatically so that there is minimal or no overlap in nodes or connections. Which in turn means you can create simple (and even [not so simple](https://www.graphviz.org/gallery/)) graphs really quickly and even programmatically. A common use case is generating diagrams such as package dependencies as part of a CI/CD pipeline to include in documentation and as a developer aid.

Graphviz also comes with `neato`, which takes the same command line options as `dot` but uses a different layout algorithm. If you’re generating complex graphs I would recommend comparing the outputs of both to see which one works best. If neither of them creates usable graphs you can still salvage the situation by splitting the graph, creating [subgraphs](https://graphviz.gitlab.io/_pages/doc/info/lang.html), or [tweaking the graph properties](https://graphviz.gitlab.io/_pages/doc/info/attrs.html).

W> Even though the settings allow it, I would not recommend manually positioning the nodes. At that point most of the usefulness of the layout tools is gone, and you might as well use a manual graphing tool.

The [Wikipedia article](https://en.wikipedia.org/w/index.php?title=DOT_(graph_description_language)&oldid=1010360796) does a good job of going through the basics of the DOT language, and the [online documentation](https://graphviz.org/documentation/) is a good technical reference.

T> A heavily interconnected graph can become unreadable very quickly, at maybe 10 nodes or so. Lightly connected nodes such as a typical package dependency graph can easily go into hundreds of nodes before it’s unreadable, since most of the time we’re only interested in part of the graph rather than the overall structure. Judicious use of grouping, different formats for different types of items, and other advanced settings and techniques can make an otherwise impenetrable graph much more useful.
