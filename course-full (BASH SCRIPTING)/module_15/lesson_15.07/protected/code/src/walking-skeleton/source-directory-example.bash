#!/usr/bin/env bash

set -o errexit -o noclobber -o nounset -o pipefail
shopt -s failglob

script_directory="$(dirname "${BASH_SOURCE[0]}")"

# shellcheck source=utilities.bash
. "${script_directory}/utilities.bash"
