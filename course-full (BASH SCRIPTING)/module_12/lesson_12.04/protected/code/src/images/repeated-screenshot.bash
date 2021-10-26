#!/usr/bin/env bash

set -o errexit -o noclobber -o nounset -o pipefail
shopt -s failglob

index=0
while true
do
    gnome-screenshot --delay=1 --file="./$((++index)).png"
done
