#!/usr/bin/env bash

set -o errexit -o noclobber -o nounset -o pipefail
shopt -s failglob

script_directory="$(dirname "$0")"

echo "I'm in ${script_directory}"
