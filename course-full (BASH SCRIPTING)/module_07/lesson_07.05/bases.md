---
title: "Bases"
# description:
---

# Bases


The result of any Bash arithmetic is a string representing a base 10 integer, but the inputs to an arithmetic expression can be in any of several different formats. Base 10 is the most obvious, consisting of only numbers zero through nine.

*Octal* numbers (base 8) start with a zero followed by numbers zero through seven. For example, `035` means “three eights plus five,” which in decimal is 29. Or as a Bash expression, `(( 035 == 29 ))`. This is convenient in a few areas to express a collection of three bits (eight unique values) per character, such as [file permissions](#permissions).

*Hexadecimal* numbers (base 16) start with `0x` followed by any one of zero through nine or the first six letters of the alphabet to represent ten through fifteen. One common number you might see is `0xff`, which represents the maximum value of a single byte, 255 or 2^8^ – 1. So a single letter in hexadecimal represents *half a byte,* also known as a “nibble.” Who said programmers don’t know how to have fun?

Finally, `BASE#NUMBER` supports bases 2 through 64 (including the ones above).

- `BASE` is a decimal number and `NUMBER` is the string representing a number in that base.
- `NUMBER` characters include:
   - 0–9
   - “a” – “z” (10 through 35 in base 10),
   - “A” through “Z” (36 through 61)
   - “@” (62)
   - “_” (63)

So `(( 64#_@Zz9 == 1073469641 ))`, or (63 × 64^4^) + (62 × 64^3^) + (61 × 64^2^) + (35 × 64) + 9.

Bases other than 8, 10 and 16 are rare in practice. Base 64 could theoretically be used to store big numbers in few bytes, but there are much better ways to [compress](#compression) such data, including custom binary protocols.

W> Numeric base 64 should not be confused with [Base64](https://en.wikipedia.org/w/index.php?title=Base64&oldid=1010775054) or the related command `base64`, a way to encode binary data in 64 ASCII characters (not the same as above).

T> A confusing technicality: when using bases between 11 and 36 you can fit the numbers above 9 into a single alphabet, so you’re allowed to mix upper and lower case. Which means that `(( 36#A == 10 ))` but `(( 37#A == 36 ))`. For consistency I recommend using lowercase in bases less than 37.

T> Negative numbers need to have the hyphen *before* the base, as in `-64#_`.
