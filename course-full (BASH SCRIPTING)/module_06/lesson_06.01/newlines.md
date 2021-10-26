---
title: "Newlines"
# description:
---

# Newlines


In one of the great tragedies of computing history, the three main operating system classes chose three different ways to indicate the separation between one line of text and the next one. Two of these are still with us:

- **Linux** uses a *line feed,* Unicode code point [U+000A](https://codepoints.net/U+000A),  as the line *terminator,* meaning that each line *including* the last one in a file has a trailing line feed character.
- **Windows** uses a *carriage return,* Unicode code point [U+000D](https://codepoints.net/U+000D) *followed by a line feed* as a *two–character line separator,* meaning that the last line in a file by convention does *not* have a trailing carriage return + line feed. This means that a Windows file which ends in a carriage return and line feed has an empty last line.
- The third style, a *carriage return terminator,* was used by **older Apple operating systems**.

T> Synonyms for “line feed” include:
T>
T> - The abbreviation **LF**
T> - [The *symbol* for line feed](https://codepoints.net/U+240A)
T> - “Newline”, abbreviated as **NL**
T> - [The *symbol* for newline](https://codepoints.net/U+2424)
T> - ASCII/UTF–8 hexadecimal byte value **0A**
T> - “End of line”, abbreviated as **EOL**

Carriage return is a valid character within a Bash script, but maybe not in the way you might think. Try creating a simple script like this, containing Windows newlines:

{lang="console"}
```
$ printf '%s\r\n' '#!/usr/bin/env bash' '(( "$?" == 0 ))' > test.bash
$ chmod u+x test.bash
$ ./test.bash
/usr/bin/env: ‘bash\r’: No such file or directory
```

That carriage return character is now part of the shebang line! In general Bash will treat carriage return like any other character in your script, so this can wreak various kinds of havoc depending on how the script is run and whether every line has a Windows newline. Say for example you [bypass the shebang line](#interpret):

{lang="console"}
```
$ bash test.bash
test.bash: line 2: syntax error in conditional expression
'est.bash: line 2: syntax error near `))
'est.bash: line 2: `(( "$?" == 0 ))
```

By now you might be thinking “'est.bash? What happened to the file name?” In the previous error message the carriage return was printed as `\r`, a character which *returns* the *carriage* (the position where the next character will be printed at) to the origin, the left margin. Unfortunately Bash does not escape the code in this error message, so it actually prints “test.bash: line 2: syntax error near `]]”, then returns the carriage to the left margin, and then prints the “'” character which is part of the error message, *overwriting* the initial “t” character in the terminal output.

A similar warning goes for processing files originating on a Windows system, where the results might still contain carriage returns. If the input has been shuffled in any way, such as reorganizing CSV columns, you might find that the carriage return isn’t even at the end of the line.

All this is to say that **Windows newlines in Bash scripts can cause inscrutable errors**. Fortunately there is a tool which solves most such issues. **To convert from Windows to Unix newlines use `dos2unix FILE…`.** Conversely, `unix2dos FILE…` converts from Unix to Windows newlines, adding the .

W> Remember how Linux has line *terminators* and Windows has line *separators?* This means a “normal” file on Linux *should* have a trailing newline and on Windows it should *not* have a trailing newline. But `unix2dos` and `dos2unix` do not add and remove the newline at the end of the file. This can cause problems with certain tools, most notably [`read`](#read). After running `dos2unix` you can check the end of a file by converting the last character of the file to a human readable representation. Let’s try with a simple comma–separated value file:

{lang="console"}
```
$ printf '%s,%s\r\n%s,%s' 'Key' 'Value' 'pi' '3.14' > example.csv
$ dos2unix example.csv
dos2unix: converting file example.csv to Unix format...
$ tail --bytes=1 example.csv | od --address-radix=n --format=c --width=1
   4
```

T> In the last line, `tail --bytes=1` prints just the last (“tail end”) byte of `example.csv` before passing it to `od`, which we’ve encountered before.

The last character in the file is “4”, not “\n”, as we would expect for processing with Linux tools. To fix this simply add a single newline to the end of the file using `echo >> FILE`:

{lang="console"}
```
$ echo >> example.csv
$ tail --bytes=1 example.csv | od --address-radix=n --format=c --width=1
  \n
```

If instead you want to unconditionally [make sure a file ends with a line feed](https://unix.stackexchange.com/a/31955/3645), just run `sed --in-place '$a\' FILE…`.

T> The `sed` script `$a\` can be read as “on the last line (`$`) append (`a\`) nothing (the empty string after `a\`). `sed` implicitly adds a newline to every line it processes, so this ends up adding a newline. It can basically be considered as a no–op which happens to have a useful side effect.
