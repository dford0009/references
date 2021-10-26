#!/usr/bin/env bash

# Dangerous code, do not use!
netstat --listening --numeric --tcp | tail --lines=+3
