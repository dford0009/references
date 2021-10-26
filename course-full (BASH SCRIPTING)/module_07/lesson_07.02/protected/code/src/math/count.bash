#!/usr/bin/env bash

set -o errexit -o noclobber -o nounset -o pipefail
shopt -s failglob

# Get the count of positive number arguments minus negative number arguments
count=0

while (( "$#" > 0 ))
do
    if (( "$1" >= 0 ))
    then
        ((count++)) || (( "$?" == 1 ))
    else
        ((count--)) || (( "$?" == 1 ))
    fi
    shift
done

printf '%s\n' "$count"
