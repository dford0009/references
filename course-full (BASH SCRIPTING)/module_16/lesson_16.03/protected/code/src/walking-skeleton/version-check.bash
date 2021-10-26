#!/usr/bin/env bash

set -o errexit -o noclobber -o nounset -o pipefail
shopt -s failglob

if [[ -z "${BASH_VERSINFO-}" ]]
then
    echo 'Cannot determine Bash version' >&2
    exit 1
fi

if (( "${BASH_VERSINFO[0]}" < 4 ))
then
    echo 'Bash versions <4 are unsupported' >&2
    exit 1
fi

if (( "${BASH_VERSINFO[0]}" >= 5 )) && (( "${BASH_VERSINFO[1]}" > 0 ))
then
    echo 'Bash versions >5.0 are unsupported' >&2
    exit 1
fi

echo "Let's roll!"
