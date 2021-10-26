#!/usr/bin/env bash
# NAME
#        dwim - do what I mean
#
# SYNOPSIS
#        dwim [OPTION...] [--] [FILE...]
#        dwim [--help|--version]
#
# DESCRIPTION
#        Do what I mean with each FILE. If FILE is not specified or is a single
#        hyphen ("-"), read from standard input. Two hyphens ("--") can be used
#        to separate options from files.
#
#        [More paragraphs if needed]
#
# EXAMPLES
#        dwim ~/.bashrc
#               Do what I mean to my .bashrc.
#
#        dwim --configuration=/etc/dwim.conf
#               Do what I mean using the given configuration file.
#
# OPTIONS
#    General options
#        --configuration=FILE
#               Set the path to the configuration file.
#
#        --verbose
#               Print more verbose log messages.
#
#    Getting help
#        --help
#               Print this help message and exit.
#
#        --version
#               Print version information and exit.
#
# EXIT STATUS
#        0      Success.
#
#        1      Unknown error.
#
#        2      File not found.
#
# BUG REPORTS
#        Please report any bugs you find in dwim at
#        https://example.org/dwim/bugs. Bug reports should include:
#
#        - The output of `dwim --version`
#        - The operating system and version
#        - The steps to reproduce the bug
#        - What you expected the command to do
#        - What the command actually did
#
# COPYRIGHT
#        [Copyright and license information.]
