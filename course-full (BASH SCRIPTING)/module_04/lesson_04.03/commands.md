---
title: "Commands"
# description:
---

# Commands


We can also copy and paste using only the command line. `xclip` interacts with the same primary and clipboard selections mentioned above, reading from standard input and printing selection contents to standard output. This can be useful in many situations. For one thing, it guarantees that what you are copying is *exact* – it will include any non–printable characters as they are:

{lang="console"}
```
$ printf 'a\tb\0c' | xclip
$ xclip -out | od --address-radix=n --format=c --width=1
   a
  \t
   b
  \0
   c
```

In the first command, `printf` outputs the characters `a`, Tab (`\t`), `b`, NUL (`\0`) and `c` to standard output. `xclip` reads that from standard input and saves it to the default (primary) selection of the [X Window System](https://en.wikipedia.org/w/index.php?title=X_Window_System&oldid=1010669063) clipboard. In the second command we print the contents of the primary selection to standard output and format it using `od` into their individual characters.

T> The `od` options in detail: `--address-radix=n` disables printing the offset of each line, ` --format=c` formats printable characters as themselves and non–printable characters as their `printf`-style backslash escapes, and `--width=1` outputs one byte per line.

We can also do things like passing an image directly from a browser to a command line tool. Right–click on a raster image in a web browser and copy it. At this point the image and some metadata are in the clipboard selection, and we can ask `xclipt` about output formats:

{lang="console"}
```
$ xclip -out -selection clipboard -target TARGETS
TIMESTAMP
TARGETS
MULTIPLE
SAVE_TARGETS
text/html
text/_moz_htmlinfo
text/_moz_htmlcontext
image/png
image/bmp
image/x-bmp
image/x-MS-bmp
image/x-icon
image/x-ico
image/x-win-bitmap
image/vnd.microsoft.icon
application/ico
image/ico
image/icon
text/ico
image/jpeg
image/tiff
```

T> The uppercase names are [metadata](https://tronche.com/gui/x/icccm/sec-2.html#s-2.6.2) entries such as the X server timestamp at which the selection was made. The rest of the entries are [media types](https://en.wikipedia.org/w/index.php?title=Media_type&oldid=1010519184).

We can now paste the image in any of the `image/…` formats. For example, to get the image in PNG format, resize it to 16 pixels wide while conserving aspect ratio, and then [Base64](https://en.wikipedia.org/w/index.php?title=Base64&oldid=1010775054) encode it:

{lang="console"}
```
$ xclip -out -selection clipboard -target image/png | convert -resize 16 - - | base64
iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJN
AAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAACJVBMVEUXFxcuLi5SUlK7u7v/
//////8uLi7t7e3///9WVlb/////+O3/s3H/gRb/gRT/gRX/gBX/iRf/phL/tAb+swWDfX38sAXz
[…]
```
