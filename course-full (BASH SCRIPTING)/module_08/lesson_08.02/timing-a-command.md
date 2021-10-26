---
title: "Timing a command"
# description:
---

# Timing a command


`time COMMAND` will tell you how long a command took to run:

{lang="console"}
```
$ time sleep 3

real	0m3.011s
user	0m0.003s
sys	0m0.005s
```

T> The “user” and “system” times show how much *CPU* time was spent in user space and kernel space, respectively. In our case they are much smaller than the real time, because the `sleep` command uses barely any CPU, but they are counted per CPU, so they can actually exceed the elapsed time for a busy, multi–threaded program.

T> `time` prints the timing information even when [interrupted](#kill).

For most regular programmers only the first line is interesting. It shows the actual amount of elapsed time, or “wall–clock” time.

It may be surprising that on a machine capable of processing billions of instructions per second the timing was off by a full 11 milliseconds. This is because `sleep` does not give any hard guarantees about how long it runs. It will *try* to run for approximately the given time, but we should never rely on it as an accurate time–keeper.

This can be devastating in programs which assume that, on average, the Nth run of something will be N times M seconds after the first run. A typical example would be two programs which are meant to run in lockstep: the first one produces a new file every minute, the second one starts 30 seconds later and runs every minute, processing the file for the previous minute. Such timing is guaranteed to drift, and the second process will sometimes process the same file twice and sometimes skip a file. A common “fix” is to run the second command at a shorter interval, but that assumes that each program will have a very regular run time and that the file is only available if the first program has *finished* writing to it, neither of which are usually true. A reliable solution will either send a signal from the first to the second program when a new file is ready for processing or will use other signaling like [inode notifications](#inotify) as a proxy.
