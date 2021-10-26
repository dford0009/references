#!/usr/bin/env bash

set -o errexit -o noclobber -o nounset -o pipefail
shopt -s failglob

ffmpeg -i '%d.png' time-lapse.webm
