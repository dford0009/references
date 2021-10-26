#!/usr/bin/env bash

set -o errexit -o pipefail

netstat --listening --numeric --tcp | tail --lines=+3
