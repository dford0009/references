#!/usr/bin/env bash

set -o errexit -o noclobber -o nounset -o pipefail
shopt -s failglob

cleanup() {
    rm --force --recursive "$temporary_directory"
}

trap cleanup EXIT
temporary_directory="$(mktemp --directory)"

touch "${temporary_directory}/result.txt"
