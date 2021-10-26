#!bash

# This code is terrible - please don't use it for anything!

if [ -z $1 ]
then
    exit 1
fi

targets = "$PWD/$@/*"

cat $targets/*.txt | wc --lines | read lines

echo $lines
