#!/usr/bin/env bash

set -o errexit -o noclobber -o nounset -o pipefail
shopt -s failglob

script_path="${BASH_SOURCE[0]}"

if [[ "${script_path:0:1}" != '/' ]]
then
    script_path="./${script_path}"
fi
script_directory="$(dirname "${BASH_SOURCE[0]}X")"
script_directory="${script_directory%X}"

# shellcheck source=utilities.bash
. "${script_directory}/utilities.bash"
