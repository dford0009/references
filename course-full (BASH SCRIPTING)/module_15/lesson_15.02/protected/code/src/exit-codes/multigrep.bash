#!/usr/bin/env bash

set -o errexit -o noclobber -o nounset -o pipefail
shopt -s failglob

if (( "$#" == 0 ))
then
    exit 1
fi

pipeline_commands=()

for pattern
do
    pipeline_commands+=("$(printf 'grep --regexp=%q' "$pattern")")
done

pipeline="$(IFS='|' && echo "${pipeline_commands[*]}")"

eval "$pipeline" || exit_code="$?"
if (( "${exit_code-0}" > 1 ))
then
    exit "$exit_code"
fi
