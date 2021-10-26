---
title: "Git gud"
# description:
---

# Git gud


At this point there’s still a lot to learn to use Git in a team, where it really shines. There are many resources for learning about Git in depth; I would recommend the free and popular [Pro Git book](https://git-scm.com/book/). If you’re only getting started with version control there are a few things to keep in mind:

- Almost any destructive operation can be reversed, if you’re careful. Slow down, maybe experiment in a copy of the repository, and you won’t lose changes by accident.
- Track the source files and the instructions (or code) to transform it into other formats, but not the files generated from the sources. Tracking generated files usually leads to a messy and bloated repository history. That’s not to say you shouldn’t keep the generated files *somewhere!*
- In the same vein it’s better to track the plaintext version of something than any binary representations. Some formats can be losslessly converted from a binary to a text format, for example by decompressing an [SVGZ](https://en.wikipedia.org/w/index.php?title=Scalable_Vector_Graphics&oldid=1010497114#Compression) file, saving as [FODT](https://en.wikipedia.org/w/index.php?title=OpenDocument_technical_specification&oldid=995351461#Document_representation) rather than ODT, or exporting a spreadsheet to CSV.
