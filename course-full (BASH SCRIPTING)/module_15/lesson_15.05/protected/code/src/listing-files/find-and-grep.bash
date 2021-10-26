#!/usr/bin/env bash

set -o errexit -o noclobber -o nounset -o pipefail
shopt -s failglob

find "$@" -type f -mtime +1 -execdir grep --fixed-strings \
    --regex XML --regex HTML {} +
