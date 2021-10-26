---
title: "logger"
# description:
---

# logger


When starting out with a script it may be appropriate to simply redirect `printf` output to a file, but to scale we can use `logger`:

- Parallel processes can’t write safely to the same file, because file writes are buffered. [The buffer size varies](https://unix.stackexchange.com/q/11946/3645), but on my system a simple [character repetition](https://stackoverflow.com/a/5349842/96588) ended up producing interleaved sequences of 4096 As and Bs:

   {lang="console"}
   ```
   $ printf 'A%.0s' {1..10000} >> log &
   $ printf 'B%.0s' {1..10000} >> log &
   $ wait
   $ cat log
   [As and Bs, interleaved]
   ```
   `logger` will interact with the configured system log directly, which hopefully is set up to handle this gracefully. In systemd, for example, each log message is associated with the PID of the `logger` command, and two concurrent `logger` messages can be easily distinguished.
- Once we end up with many scripts it becomes arduous to keep all the log formats in sync to enable easy debugging. `logger` passes the message with metadata to the logging system, so there is no need to propagate the log format in each script.
- `logger` supports [The Syslog Protocol](https://tools.ietf.org/html/rfc5424), so interacting with compliant servers for centralized logging is available out of the box.

`logger MESSAGE` logs the given message to the currently active log mechanism, which may be anything at all. Many systems used to be configured by default to log to the file /var/log/syslog. Nowadays it’s more common to log to a journal on desktop systems and to a log aggregation service on servers. If you are on a system with systemd, for example, you can run `journalctl --follow` to show log entries as they show up in the systemd journal. Open another terminal and see what shows up in the journal window when experimenting with various commands and options. For example, to send a user–level warning to the journal and also to standard error:

{lang="console"}
```
$ logger --priority=user.warning --stderr "It's a trap!"
<12>Feb 23 20:14:41 jdoe: It's a trap!
```

The standard error line starts with a numeric representation of the priority between angle brackets, followed by the datetime the message was recorded, the username, and the message itself. Within the journal this shows up as “Feb 23 20:28:00 box jdoe[554710]: It's a trap!”: the datetime, hostname, username, process ID in brackets, and the message.

T> The priority number is calculated as the facility number times eight plus the level. By convention, the `user` facility is number 1 and `warning`  is number 4. 1 * 8 + 4 = 12, as shown above.

The journal output might look superficially similar to a normal log file, but it is *much* more flexible. The pieces of information shown above and many more are stored in a structured database, so we can retrieve exactly the information we require in any of several formats. For example, we can easily get JSON objects with all the fields of all the user warnings since we started logging:

{lang="console"}
```
$ journalctl --facility=user --priority=warning --output=json-pretty
{
        "__REALTIME_TIMESTAMP" : "1614064481380349",
        "_BOOT_ID" : "5bfd1a8ffbb34361a134f1df6110e1fa",
        "_MACHINE_ID" : "37c339f51ea74ab5be6e9f1d0ec63b86",
        "SYSLOG_TIMESTAMP" : "Feb 23 20:14:41 ",
        "MESSAGE" : "It's a trap!",
        "SYSLOG_FACILITY" : "1",
        "_UID" : "1000",
        "__MONOTONIC_TIMESTAMP" : "855112431841",
        "_GID" : "1000",
        "SYSLOG_IDENTIFIER" : "victor",
        "PRIORITY" : "4",
        "_TRANSPORT" : "syslog",
        "_PID" : "553862",
        "_HOSTNAME" : "big",
        "__CURSOR" : "s=bde7e70adbe5411280494c7d43e32068;i=31e3b9;b=5bfd1a[…]",
        "_SOURCE_REALTIME_TIMESTAMP" : "1614064481380109"
}
```

Other useful options:

- `--boot` to show messages since last boot (equivalent to `--boot=0`), `--boot=-1` to show the logs from the previous boot if saved to disk, etc
- `--lines=N` to show the last N entries
- `--reverse` to show entries in reverse chronological order
- `--output-fields=FIELD[,FIELD…]` to limit the fields
- `--utc` to show UTC timestamps rather than local ones
- `--catalog` to augment some log messages with explanations
- `--unit=UNIT` to show the log of a specific unit (such as `journalctl --unit=sshd.service` for the SSH daemon)
- `--since=DATETIME` to show messages after some datetime
- `--until=DATETIME` to show messages before some datetime

See `man journalctl` for more.
