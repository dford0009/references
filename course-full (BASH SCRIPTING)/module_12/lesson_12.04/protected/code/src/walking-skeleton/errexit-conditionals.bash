#!/usr/bin/env bash

set -o errexit

if [[ -f "$1" ]]
then
    echo 'Yes'
else
    echo 'No'
fi

echo 'Done'
