---
title: "Encoding"
# description:
---

# Encoding


One of the first data types you learn to work with as a programmer is strings. But this seemingly simple data type has very complex depths, so complex that it’s still changing, and various programming languages still handle strings in very different ways. In Bash, the contents of a string variable is “simply” stored as a sequence of bytes (values 0 through 255) with a [NUL byte](#nul) at the end. For scripting purposes the NUL byte is not part of the variable value, and this terminator means that if you try to store arbitrary binary data in a variable the value will be cut off at the first occurrence of a NUL byte:

{lang="console"}
```
$ value=$'foo\0bar'
$ echo "$value"
foo
$ echo "${#value}"
3
```

T> As you can see, the NUL byte at the end is not considered part of the string.

That takes care of Bash variables: series of bytes with no special meaning, internally terminated by a NUL byte. To get to what humans would consider a *string* you have to add an *encoding:* a mapping from byte values to [code units](https://stackoverflow.com/a/27331885/96588), and in the case of multi–byte encodings another mapping from code units to code points (often called “characters” although this is a heavily overloaded word). Let’s first check which encoding the current shell is using:

{lang="console"}
```
$ locale
LANG=C.UTF-8
LANGUAGE=
LC_CTYPE="C.UTF-8"
LC_NUMERIC="C.UTF-8"
LC_TIME="C.UTF-8"
LC_COLLATE="C.UTF-8"
LC_MONETARY="C.UTF-8"
LC_MESSAGES="C.UTF-8"
LC_PAPER="C.UTF-8"
LC_NAME="C.UTF-8"
LC_ADDRESS="C.UTF-8"
LC_TELEPHONE="C.UTF-8"
LC_MEASUREMENT="C.UTF-8"
LC_IDENTIFICATION="C.UTF-8"
LC_ALL=
```

T> `locale` prints the *settings* rather than the variable assignments. So if you want to get the current collation setting in a script you should inspect the output of `locale` rather than the value of `$LC_COLLATE` (“collate” is synonymous with “sort” and “order”). Even if `$LC_COLLATE` is set it may be overridden by `$LANG` or `$LC_ALL`.

The values except for `LANGUAGE` are formatted as `language[_territory][.codeset][@modifier]` (documented in `man 3 setlocale`). We’re only interested in the `LC_CTYPE` (locale character type) “codeset” part, “UTF-8”, which tells the shell how to interpret byte sequences as code points. Let’s see what it does:

{lang="console"}
```
$ currency='€'
$ echo "${#currency}"
1
$ printf '%s' "$currency" | wc --bytes
3
$ printf '%s' "$currency" | xxd -groupsize 1
00000000: e2 82 ac                                         ...
```

So in Unicode “[€](https://unicode.org/cldr/utility/character.jsp?a=20AC)” is one code point (the Bash variable length in the first command), and when encoded as UTF–8 it takes up three bytes whose hexadecimal representation is 0xe282ac. And, crucially, those bytes need to be treated as UTF–8 to get back the original code point!

T> You can also enter Unicode code points by their hexadecimal representations. For example, the Euro sign “€” is U+20AC. This can be represented in Bash as either a literal string `€` or as `$'\u20ac'` (lowercase “u” can be used for code points up to FFFF), meaning that `[[ '€' == $'\u20AC' ]]`. Uppercase “U” works with the entire Unicode range, so U+1F600, the grinning face emoji, is `$'\U0001f600'`.

### Handling strings

So how do you actually deal with strings (including text files, CSV, HTML, database records, etc.) in shell scripts?

**First, you need to know which encoding applies to each string.** If you don’t know, the `file` utility can make an educated guess based on the first mebibyte:

{lang="console"}
```
$ printf '%s\n' 'abc' | file -
/dev/stdin: ASCII text
$ printf '%s\n' 'abc' '€' | file -
/dev/stdin: UTF-8 Unicode text
```

The result of using the wrong encoding to decode some text is usually a lot of [Unicode replacement characters](https://en.wikipedia.org/w/index.php?title=Specials_(Unicode_block)&oldid=1008621871#Replacement_character) (“�”, but looks different in each font) or [Mojibake](https://en.wikipedia.org/w/index.php?title=Mojibake&oldid=1007352047), text intermingled with garbled symbols. For example, if we try to treat an UTF–8 string as [ISO 8859–1](https://en.wikipedia.org/w/index.php?title=ISO/IEC_8859-1&oldid=1009639548) and convert it back to UTF–8:

{lang="console"}
```
$ echo '€1.50' | iconv --from-code=iso-8859-1 --to-code=utf-8
â¬1.50
```

**Second, convert everything to the same encoding before processing.** Doing this means you won’t have to worry about silly things like sorting the same code point in different ways. UTF-8 is very handy here, because Unicode contains every character used in every standardized encoding, so any string in any encoding can be converted to a Unicode encoding without losing code points. If you can, standardize on UTF–8 across your entire system and convert everything to that. Then you won’t have to worry about these conversions again. `iconv` can do this conversion:

{lang="console"}
```
$ printf '%s\n' $'\xDF\xE0\xD8\xD2\xD5\xE2' > input.txt
$ cat input.txt
������
$ iconv --from-code=iso-8859-5 --to-code=utf-8 --output=result.txt input.txt
$ cat result.txt
привет
```

**Third**, if you need to keep some strings in other encodings, make sure to **convert everything back to the original encoding before saving.** Saving a UTF–8 string into a Windows–1251 encoded database column is going to ruin someone’s day.

T> To get to what you see on screen, the machine also has to translate:
T>
T> - code points to graphemes or [extended grapheme clusters](https://hsivonen.fi/string-length/) (abstract graphical units)
T> - graphemes to glyphs, which are defined by fonts. But these are rarely relevant for shell scripting.
