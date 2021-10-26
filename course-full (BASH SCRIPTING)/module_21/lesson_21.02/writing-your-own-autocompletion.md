---
title: "Writing your own autocompletion"
# description:
---

# Writing your own autocompletion


When creating a command line tool for use by a small group it’s probably sufficient to print a helpful message when running with the `--help` flag. But once you start thinking about redistributing your tool you’ll want to make adoption as easy as possible. An autocompletion script is a good step in that direction. If your tool has a reasonable number of well–named parameters, autocompletion acts as a quicker substitute for referring to a `man` page or `--help`, and even users completely unfamiliar with the tool can get a good idea of what it’s capable of and how easy it will be to use.

The simplest autocompletion is no autocompletion. As mentioned above, file path completion is the default, and that covers a number of simple commands. But all commands benefit from a `--help` flag, and many commands can benefit from common flags such as `--verbose` or `--quiet` to show more or less output, `--color=[auto|always|never]` to set whether the output should be colored, or `--config=FILE` to point to a configuration file. Let’s try implementing completion for a fictional “do what I mean” command, `dwim`. We start by setting up a completion for a `dwim` command which only takes one argument, the static string `--help`:

{lang=bash}
<<[autocompletion/dwim-completion-1.bash](./protected/code/src/autocompletion/dwim-completion-1.bash)

T> This script is meant to be *[sourced](#source),* which is why it doesn’t have all the [From the Terminal to Production](#walking-skeleton) bells and whistles.

The `complete` command specifies how arguments are to be autocompleted. Running the command above means that the command called `dwim` will be autocompleted with the single argument (“word”; `-W`) `--help` unconditionally. To test it, simply run the above `complete` command, type `dwim --` and press *Tab:* the command line will now read `dwim --help`. It doesn’t matter that no `dwim` command exists – the completion is completely independent of the command.

T> The completion does not include completion of the `dwim` command itself – if you type `dwi` and press *Tab* it will *not* complete to `dwim` (unless, of course, you have installed a program called “dwim”). Completion of the first word is handled by a [different mechanism](#run-path).

Let’s make this more interesting by adding support for `--color=[auto|always|never ever]`:

{lang=bash}
<<[autocompletion/dwim-completion-2.bash](./protected/code/src/autocompletion/dwim-completion-2.bash)

Ouch, the complexity just exploded! Let’s go through this section by section:

1. The autocomplete function (`_dwim`) could be called anything, but simply giving it the name of the command prefixed with an underscore makes it easy to find and unlikely to clash with any existing command or function names. This is a common convention for completion scripts.
1. We don’t want to pollute the global namespace, so we need to declare all the temporary variables local.
1. The color key/value options are generated from the color values.
1. `$COMP_WORDS` is an array of the words typed after the program name. And `$COMP_CWORD` is the index of the word where the cursor is in `$COMP_WORDS`. We need to know at most the current word and the two words before it.
1. We check the completions from the most to the least specific. Autocompletion is handled by [Readline](#readline), so `=` is considered a *separate* word for autocompletion purposes. This is why `complete -W '--color=always --color=auto --color=never --help' dwim` won’t work – it stops completing anything after `--color=`. This is the source of most of the complexity:
   1. The first `if` checks whether we are completing the word *after* `--color=`, that is, the color *value.* If so, we generate completion values (`compgen`) from the list of words (`-W 'string'`) which match the current word and set the completion reply (`$COMPREPLY`) array to the newline–separated results. Bash–quoting the values within that string using `printf`’s `%q` allows us to have values with spaces (such as `never ever`, which is included to demonstrate this) and other special characters in the completions.
   1. The second `if` checks for the exact string `--color=`. If so, just offer the color values as suggestions.
   1. If neither of the above apply we just complete using the original options array.
1. At the end we tell `complete` to use the `_dwim` *function* to work out the completion of the `dwim` command, and to not sort the completions. In general, we do want to sort options to make them easier to scan through, but in case of key/value pairs like `--color=COLOR` it’s common to show the default value first.

After sourcing a script containing the above code we can try out the resulting completion:

{lang="console"}
```
$ dwim <Tab>
--color=auto  --color=always  --color=never\ ever  --help
$ dwim --c<Tab>
--color=auto  --color=always  --color=never\ ever
$ dwim --color=<Tab>
auto  always  never\ ever
$ dwim --color=n<Tab>
$ dwim --color=never\ ever
```

A little experimentation shows that Bash will complete as much of the command as can be unambiguously completed based on the text before the cursor. So after the `dwim --c` completion above the command line will say `dwim --color=`, because all of the available completions start with that string.

These are all static completions. To introduce dynamic completions like `--config=FILE` we need to use a different method:

{lang=bash}
<<[autocompletion/dwim-completion-3.bash](./protected/code/src/autocompletion/dwim-completion-3.bash)

A quick `diff` between these implementations reveals:

1. A function which completes directories followed by a slash and files followed by a space.
1. The default options include `--config=`. Unlike `--color=[auto|always|never ever]` we don’t want to suggest `--config=FILE` for every path available, because that result could be huge. So we simply postpone suggesting actual filenames until the cursor is after `--config=`.
1. To avoid `complete` inserting a space character when completing `--config=` we need to turn off that default with `-o nospace` and manually insert spaces after completing all other parameters.
1. `--config=./some/path` ignores the `--config=` prefix and tries to complete the rest as a path.
1. `--config=` tries to complete the empty path, resulting in suggestions from the working directory.
