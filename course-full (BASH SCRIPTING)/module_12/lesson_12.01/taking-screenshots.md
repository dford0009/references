---
title: "Taking screenshots"
# description:
---

# Taking screenshots


### Keyboard shortcuts

Most desktop environments come with a built–in screenshot facility. Try pressing the *Print Screen* button (often labeled with an abbreviation like “PrtScn”), and you might see the screen blink, hear a camera shutter sound, or get some other indication that a screenshot file is available. If this works other variants might be available:

- *Alt–Print Screen* to capture only the currently–focused application
- *Shift–Print Screen* to capture a custom rectangle of the screen

T> Ubuntu saves screenshots in the ~/Pictures directory.

### `gnome-screenshot`

This and many other tools offer convenient features beyond keyboard shortcuts:

- `gnome-screenshot --interactive` opens a window to set up a screenshot.
- `gnome-screenshot --include-pointer` includes the mouse pointer in the image.
- `gnome-screenshot --delay=5` waits for five seconds before taking the screenshot. This allows you to capture any process which would be broken by pressing a key, or to easily capture screenshots at an interval.
- `--file=FILE` allows you to set a custom filename, which you could, for example, use in a loop to create sequential image files:

   {lang=bash,crop-start-line=6}
   <<[images/repeated-screenshot.bash](./protected/code/src/images/repeated-screenshot.bash)

T> Currently it is not easy to disable the screen flash and shutter sound of `gnome-screenshot` ([bug report](https://gitlab.gnome.org/GNOME/gnome-screenshot/issues/2)). If you want to avoid these right now you might want to look into another tool such as `scrot` or `shutter`, or search your package manager for something like “screenshot”.
