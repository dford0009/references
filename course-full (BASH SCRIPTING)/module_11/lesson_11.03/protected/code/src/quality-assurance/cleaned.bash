#!/usr/bin/env bash

set -o errexit -o noclobber -o nounset -o pipefail
shopt -s failglob

if [[ "$#" -ne 1 ]]
then
    exit 1
fi

targets=("${@}/"*)

sum=0
for directory in "${targets[@]}"
do
    read -r lines < <(cat "${directory}/"*".bash" | wc --lines)
    ((sum += lines))
done

echo "$sum"
