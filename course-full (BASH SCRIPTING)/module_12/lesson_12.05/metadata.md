---
title: "Metadata"
# description:
---

# Metadata


It is common for digital cameras to embed metadata such as date, time, location and camera model in the files they create in the form of an [Exif](https://en.wikipedia.org/w/index.php?title=Exif&oldid=1011074115) header. This information can be useful for editing tools and web sites, but sometimes you might want to inspect or even change it locally.

By default the `exif` tool simply prints all the Exif “tags” (key/value pairs) it finds in the file, if any:

{lang="console"}
```
$ exif ./image.jpg
EXIF tags in './image.jpg' ('Intel' byte order):
--------------------+----------------------------------------------------------
Tag                 |Value
--------------------+----------------------------------------------------------
Manufacturer        |Canon
Model               |Canon EOS 500D
[…]
Focal Plane Resoluti|Inch
GPS Tag Version     |2.2.0.0
--------------------+----------------------------------------------------------
EXIF data contains a thumbnail (10716 bytes).
```

A common use case is adding or replacing copyright information in an image. Let’s say we’re starting with a default copyright value:

{lang="console"}
```
$ exif --tag=Copyright --machine-readable ./image.jpg
[None] (Photographer) - [None] (Editor)
```

We can set this to a more useful value and verify the result:

{lang="console"}
```
$ full_name="$(getent passwd "$USER" | cut --delimiter=: --fields=5)"
$ exif --ifd=0 --output=./new.jpg --set-value="Copyright ${full_name}" \
> --tag=Copyright ./image.jpg
Wrote file './new.jpg'.
$ exif --tag=Copyright --machine-readable ./new.jpg
Copyright Victor Engmark (Photographer) - [None] (Editor)
```

T> I believe the mandatory `--ifd=0` parameter denotes a *part* of the Exif header, but I don’t know the details.

T> The “Editor” part of the “Copyright” tag is a bit of a mystery. It doesn’t show up in `exif --list-tags ./image.jpg | grep Editor`.
