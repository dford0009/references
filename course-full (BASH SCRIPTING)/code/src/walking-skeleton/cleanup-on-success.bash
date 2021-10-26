#!/usr/bin/env bash

set -o errexit -o noclobber -o nounset -o pipefail
shopt -s failglob

cleanup() {
    # shellcheck disable=SC2181
    if (( $? == 0 ))
    then
        rm --force --recursive "$temporary_directory"
    else
        echo "Script failed. Temporary directory: ${temporary_directory}" >&2
    fi
}

trap cleanup EXIT
temporary_directory="$(mktemp --directory)"

result_file="${temporary_directory}/result.txt"
touch "$result_file"
grep nonexistent "$result_file"
