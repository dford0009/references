---
title: "Plain gzip"
# description:
---

# Plain gzip


One .gz file corresponds to one decompressed file. This is why files are often tarballed first – it’s just easier to deal with a single file than several, especially if you want to retain the directory structure. Raw gzip comes up rarely, but when it does the relevant tools are `gzip` to compress and `gunzip` to decompress. If you’re dealing with a stream of compressed data you’ll want to use the `--stdout` flag with both commands to send the streams to standard output rather than creating intermediate files.
