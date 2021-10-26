#!/usr/bin/env bash

# Count main heading words in a markdown document
grep '^# ' ./README.md | wc --words
