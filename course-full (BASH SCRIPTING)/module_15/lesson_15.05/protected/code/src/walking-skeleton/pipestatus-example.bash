#!/usr/bin/env bash

set -o errexit -o pipefail

# Get PID and program name of world-answering services
netstat --listening --numeric --program --tcp \
    | grep --fixed-strings '0.0.0.0:*' \
    | tr --squeeze-repeats ' ' \
    | cut --delimiter=' ' --fields=7 \
    || [[ "${PIPESTATUS[*]}" == '0 1 0 0' ]]
