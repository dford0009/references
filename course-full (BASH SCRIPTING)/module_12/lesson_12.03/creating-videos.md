---
title: "Creating videos"
# description:
---

# Creating videos


Creating a video from a set of images is simple with [`ffmpeg`](https://www.ffmpeg.org/faq.html#How-do-I-encode-single-pictures-into-movies_003f):

{lang=bash,crop-start-line=6}
<<[images/time-lapse.bash](./protected/code/src/images/time-lapse.bash)

This assumes that the files are called 1.png, 2.png, etc, like the ones created by the screenshot loop above. Because `%d` in the pattern specifically means an *integer without leading zeros* FFmpeg inserts the images into the video in *numeric* order, which is typically what you want. You can also use `-pattern_type glob -i './*.png'` to match a [glob](#globbing). This is useful for *alphabetically* ordered files (for example, screenshots with RFC 3339 datetimes like “2101-12-31 23:59:59.png”). Just be aware that alphabetic ordering is not the same as numeric ordering:

{lang="console"}
```
$ cd "$(mktemp --directory)"
$ touch ./{1..10}.png
$ echo ./*
./10.png ./1.png ./2.png ./3.png ./4.png ./5.png ./6.png ./7.png ./8.png ./9.png
```

Another common option is `-framerate VALUE`, which must be put *before* `-i`. `-framerate 60` creates a 60 FPS video. This option also supports fractions such as `-framerate 1/5` and [abbreviations](https://ffmpeg.org/ffmpeg-utils.html#Video-rate) such as `-framerate ntsc`.
