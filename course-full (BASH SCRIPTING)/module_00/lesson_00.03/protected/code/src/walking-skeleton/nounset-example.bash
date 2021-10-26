#!/usr/bin/env bash

set -o errexit -o nounset

dir="$1"

for file in "$dir"/*
do
    echo "Processing ${file}"
done
