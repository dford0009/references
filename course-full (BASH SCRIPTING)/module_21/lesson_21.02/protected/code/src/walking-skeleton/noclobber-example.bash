#!/usr/bin/env bash

set -o errexit -o noclobber

working_directory="$(mktemp --directory)"
bin_path="${working_directory}/secret.bin"
hex_path="${working_directory}/secret.hex"

dd bs=32 count=1 if=/dev/urandom of="$bin_path" status=none

# shellcheck disable=SC2094
xxd -cols 32 -plain "$bin_path" > "$bin_path"

logger "New secret available in ${hex_path}."
