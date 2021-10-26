#!/usr/bin/env bash

set -o errexit -o noclobber -o nounset -o pipefail
shopt -s failglob

# shellcheck disable=SC2095
awk '{print $1}' /etc/hosts | while read -r host
do
    if ssh -o ConnectTimeout=1 "$host" true
    then
        echo "$host is reachable"
    fi
done
