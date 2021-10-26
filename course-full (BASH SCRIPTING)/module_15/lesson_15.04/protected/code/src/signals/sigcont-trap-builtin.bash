#!/usr/bin/env bash

set -o errexit -o noclobber -o nounset -o pipefail
shopt -s failglob

trap 'echo "Continuing…" >&2' CONT

read -r line
echo "$line"
