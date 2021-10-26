#!/usr/bin/env bash

set -o errexit -o noclobber -o nounset -o pipefail
shopt -s failglob

find "$1" -type f -execdir mv {} "$2" \;
