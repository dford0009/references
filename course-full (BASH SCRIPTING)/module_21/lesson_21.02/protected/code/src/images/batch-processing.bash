#!/usr/bin/env bash

set -o errexit -o noclobber -o nounset -o pipefail
shopt -s failglob

mogrify -crop '729x434+0+54' -resize '50%' ./*.png
