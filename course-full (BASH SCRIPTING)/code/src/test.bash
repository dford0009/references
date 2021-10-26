#!/usr/bin/env bash

set -o errexit -o noclobber -o nounset -o pipefail
shopt -s failglob

exit_code=0
for file in ./manuscript/code/src/*/test*.bash
do
    echo "$file"
    "$file" || exit_code="$?"
done

exit "$exit_code"
