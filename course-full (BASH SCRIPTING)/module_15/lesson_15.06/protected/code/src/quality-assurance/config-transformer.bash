#!/usr/bin/env bash

set -o errexit -o noclobber -o nounset -o pipefail
shopt -s failglob

grep --regexp=username --regexp=password \
    | tr '\n' '\0' \
    | cut --delimiter='"' --fields=4 --zero-terminated
