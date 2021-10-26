#!/usr/bin/env bash

set -o errexit -o noclobber -o nounset -o pipefail
shopt -s failglob

trap 'echo "Continuing…" >&2' CONT

while true
do
    sleep 0.001
done
