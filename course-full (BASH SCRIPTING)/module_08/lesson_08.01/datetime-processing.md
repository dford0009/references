---
title: "Datetime processing"
# description:
---

# Datetime processing


Anyone who has worked for a while with computers will tell you that dealing with time is *hard.* A gigantic amount of effort has gone into trying to map the human understanding of time, combining a messy universe with thousands of years of human culture and innovation, to something computers can actually deal with.

We’ll look at how to deal with some common and fairly simple cases using the `date` command. `date` by default prints a human–readable datetime with second resolution and the current time zone:

{lang="console"}
```
$ date
Thu Dec 31 23:59:59 NZDT 2020
```

### Input formatting

We can also give `date` a specific input datetime with `--date=DATETIME`. It has complex rules for parsing all manner of human–readable input, but the safest is to specify a *machine–readable* [RFC 3339](https://tools.ietf.org/html/rfc3339) string:

{lang="console"}
```
$ date --date='2000-11-30 22:58:58+00:00'
Fri Dec  1 11:58:58 NZDT 2000
```

### Output formatting

For RFC 3339 output use `--rfc-3339=PRECISION`:

{lang="console"}
```
$ date --rfc-3339=date
2020-12-31
$ date --rfc-3339=seconds
2020-12-31 23:59:59+13:00
$ date --rfc-3339=ns
2020-12-31 23:59:59.123456789+13:00
```

T> You may have heard of ISO 8601 as *the* machine–readable datetime format, but RFC 3339 has some advantages: it allows a space separator between the date and time for readability, and it only allows a full stop between the integer and fractional seconds. `date --iso-8601=ns` on the other hand uses a comma separator, which is not appropriate in an English–speaking locale.

In addition to making the datetime easy to parse, RFC 3339 datetimes (in the same time zone) can be trivially sorted. So if you ever want to parse your datetimes or sort your lines simply use RFC 3339.

### Time zones

You can use the `TZ` variable to specify the *output time zone:*

{lang="console"}
```
$ TZ='UTC' date
Sun May 24 22:29:51 UTC 2020
$ TZ='Pacific/Auckland' date
Mon May 25 10:29:51 NZST 2020
```

I would recommend using [UTC](https://en.wikipedia.org/w/index.php?title=Coordinated_Universal_Time&oldid=1009094769) everywhere you can. Time zones are a cultural construct which frequently change – there were a full 90 new [releases of the time zone database](https://ftp.iana.org/tz/releases/) in the 2010s. Some time zones also have [daylight saving time](https://en.wikipedia.org/w/index.php?title=Daylight_saving_time&oldid=1011290427) or other discontinuities. Better to use UTC and avoid any conversions or ambiguity.

T> To use UTC for the duration of a shell and its sub–shells simply `export TZ='UTC'` rather than specifying it for each `date` command:

{lang="console"}
```
$ export TZ='UTC'
$ date
Sun May 24 22:29:51 UTC 2020
```

Specifying the *[input time zone](https://www.gnu.org/software/coreutils/manual/html_node/Specifying-time-zone-rules.html)* is also possible:

{lang="console"}
```
$ TZ='UTC' date --date='TZ="Pacific/Auckland" 2020-12-31 23:59:59' --rfc-3339=seconds
2020-12-31 10:59:59+00:00
```

Now we can apply human–readable *offsets:*

{lang="console"}
```
$ TZ='UTC' date --date='2000-01-01 08:00:00 + 5 days 3 seconds' --rfc-3339=seconds
2000-01-06 08:00:03+00:00
```

You can specify a custom output format. Because of the availability of shorthands like `--rfc-3339=seconds`, the only other format we’re likely to encounter is the [Unix timestamp](https://en.wikipedia.org/w/index.php?title=Unix_time&oldid=1010970730), the number of seconds since 1970–01–01 00:00:00 UTC minus leap seconds:

{lang="console"}
```
$ date --date='2020-12-31 23:59:59+13:00' +%s
1609412399
```

The `+` character at the start of the word indicates that this parameter is a format string. `%s` is the format specifier “seconds since 1970-01-01 00:00:00 UTC.” The full set of specifiers is documented in `info date`.

T> Because of the leap second handling *we can’t treat UTC and Unix timestamps as interchangeable.* As with time zones, I would advise to simply convert everything to UTC and go from there. Timestamp arithmetic may be tempting, but it leads to real bugs which are hard to reproduce and fix. Relevant to this is the classic [Falsehoods programmers believe about time](https://infiniteundo.com/post/25326999628/falsehoods-programmers-believe-about-time).

Use `@NUMBER` to specify a Unix timestamp as input:

{lang="console"}
```
$ TZ='UTC' date --date='@1000000000' --rfc-3339=seconds
2001-09-09 01:46:40+00:00
```
