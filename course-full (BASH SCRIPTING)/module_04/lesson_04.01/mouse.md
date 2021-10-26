---
title: "Mouse"
# description:
---

# Mouse


Most Linux applications including [terminals](#copying-and-pasting-terminal) support quick copying and pasting using a mouse. Simply click and drag over some text with the left button, and as soon as you lift your finger the selection will be copied into what is called the “primary selection,” where it stays until you select something else. You can then *middle–click* to paste the selection in basically any application.

Left–clicking and dragging as above selects one character at a time. You can also select a word or line by double- or triple–clicking, respectively, and select multiples by holding down the mouse button after the last click and dragging.

T> A “line” in this case really means up to and including a newline character or “hard” line break in the terminal backlog, and *not* what is called a “soft” line break caused by a long line overflowing to the next in your terminal. Soft line breaks are not part of the terminal backlog, and so will not be part of any text you copy. The difference becomes obvious if you resize the terminal: soft line breaks are introduced when the width is lowered, but disappear when you make the terminal wide enough to fit up to the hard line break.

In most terminals, holding down *Alt* or *Ctrl* when starting a selection will select a *rectangle* of text, which is mostly useful if you have some column–aligned text you want to extract from some output with irrelevant content such as leading timestamps in a log.

Starting a selection and then *Shift*-clicking elsewhere will extend the selection to include the text up to that point. This can be helpful if,  for example, what you want to select can’t fit into a window: simply start the selection at either end, release the mouse button (and keyboard, if you’re doing a rectangular selection), scroll to the other end of the text, and *Shift*-click where you want the selection to end. You can easily correct if you missed the exact character by *Shift*-clicking or *Shift*-clicking and dragging. This will only adjust the end of the selection you expanded *last.* If you want to correct the *opposite* end of the selection you can *Shift*-click outside that end of the selection to be able to adjust it. This is a bit clunky to explain, so I’d encourage simply playing with it for a bit.
