#!/usr/bin/env bash

set -o errexit -o noclobber -o nounset -o pipefail
shopt -s failglob

quote() {
    local line
    while IFS= read -r line
    do
        printf '> %s\n' "$line"
    done
}
