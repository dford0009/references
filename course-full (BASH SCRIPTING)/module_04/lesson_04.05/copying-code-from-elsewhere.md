---
title: "Copying code from elsewhere"
# description:
---

# Copying code from elsewhere


There are *three* errors in the following code snippet:

   {lang="bash"}
   ```
   grep –color=always “some pattern” ./𝘮𝘪𝘥𝘥𝘭𝘦
   ```

These and other errors are common on the web, but can come from anywhere. Sometimes they are caused by user ignorance and other times by the platform itself. Can you tell what the issues are? In order of their appearance:

1. The funny–looking horizontal line before `color` is not a double dash, and not even a single dash, but rather an *[en dash](https://en.wikipedia.org/w/index.php?title=Dash&oldid=1010505144#En_dash).* WYSIWYG tools often convert double dashes to en dashes automatically. But en dashes are not used to prefix options, so the whole word is going to be treated as a pattern and the rest of the arguments will be treated as paths, leading to a confusing result:

   {lang="console"}
   ```
   $ grep –color=always “some pattern” ./middle
   grep: “some: No such file or directory
   grep: pattern”: No such file or directory
   grep: ./middle: No such file or directory
   ```
1. As you can see from the error message above, the quotes around `some pattern` are not syntactic. That is, instead of marking the start and end of the filename they are treated as *part of* the filename. That is because they are *typographic* quotes, another piece of common automatic formatting by WYSIWYG tools. And since there are no [syntactic quotes](#quotes) that part of the command is split into words.
1. The string `middle` is slanted or italicized, which hints at the problem for anyone familiar with Markdown and similar formats. These formats are sent through a preprocessor program to produce HTML. And a common way to produce italicized text in the resulting HTML is to surround the text with asterisks, which we know as [globbing](#globbing) characters!

So the original command was probably something like this:

{lang=bash}
<<[copy-paste/example.bash](./protected/code/src/copy-paste/example.bash)

“Probably” is the best we can do without more information. Although the typographic characters would normally set off alarms they could of course be intentional. And the text which resulted in `𝘮𝘪𝘥𝘥𝘭𝘦` could also be from any other common italicization such as `_middle_` or `/middle/`.

### Copy/paste exploit

There is an even worse problem with copying from a WYSIWYG context like the web directly into a terminal: **it is trivial to hide exploits in WYSIWYG code!** If you can insert arbitrary JavaScript, CSS or even HTML into a web page it is really easy to do this. For example, does this code look safe to copy?

{lang="shell"}
``` script
echo foo
```

What if I told you that the underlying markup is an example of [WYSINWYC (what you see is not what you copy)](http://www.ush.it/team/ascii/hack-tricks_253C_CCC2008/wysinwyc/what_you_see_is_not_what_you_copy.txt):

{lang=html}
<<[copy-paste/css-exploit.html](./protected/code/src/copy-paste/css-exploit.html)

T> This exploit is of course harmless – it simply sets your terminal prompt to one which starts with the string “exploited”.

When you select `echo` and `foo` you are also selecting the off–screen exploit code, which includes a literal newline because of the HTML line break `<br>`. So when pasting, the exploit code is run even if it looked like you only selected a single line.

T> A more advanced exploit could hide the fact that anything was run at all, for example by inserting carriage returns, running a background process, scheduling a download of a bigger script and other tricks.

Many websites have implemented protections against such exploits, typically by forbidding arbitrary JavaScript and CSS and only allowing a safe subset of HTML in user–contributed content. Even so, it’s easy to trip up and accidentally allow something unsafe. Fortunately the fix is pretty simple:

**Paste and check untrusted code in a GUI plaintext editor before running it!**

- It’s important that it’s a GUI editor because the exploit could contain [control characters which could start a shell within command line editors](https://unix.stackexchange.com/q/355610/3645) such as Vim.
- It’s important that it’s a plaintext editor such as an IDE to avoid auto–formatting as we’ve seen above. Also, the paste buffer could contain some safe WYSIWYG contents but an unsafe plaintext string, so that completely different things are pasted into a WYSIWYG application and your terminal. For example:

{lang=html}
<<[copy-paste/img-exploit.html](./protected/code/src/copy-paste/img-exploit.html)

Again, this shows up as `echo foo` in a browser. And copying the text into a WYSIWYG editor also rendered the result as “echo foo”. Only when pasted as plain text does the exploit code show up, since the alternative text is meant to be a stand–in when the image is unavailable.

T> Some combinations of browsers, terminals and editors may give different results, but the general exploit is unlikely to be fixed because it would require solutions which would break many web sites.
