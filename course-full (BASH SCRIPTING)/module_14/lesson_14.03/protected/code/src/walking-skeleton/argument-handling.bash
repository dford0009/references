#!/usr/bin/env bash

set -o errexit -o noclobber -o nounset -o pipefail
shopt -s failglob

version='0.1'
readonly version

usage() {
    echo 'dwim [--verbose] [--configuration=FILE] [--] FILE…' >&2
    echo 'dwim --help' >&2
}

verbose_printf() {
    if (( "$verbosity" > 0 ))
    then
        # shellcheck disable=SC2059
        printf "$@"
    fi
}

# Defaults
configuration_file=/etc/example.conf
verbosity=0

arguments="$(
    getopt --options='' --longoptions=configuration:,help,verbose,version \
    --name="$0" -- "$@"
)"
eval set -- "$arguments"
unset arguments

while true
do
    case "$1" in
        --configuration)
            configuration_file="$2"
            shift 2
            ;;
        --help)
            usage
            exit
            ;;
        --version)
            echo "$version"
            exit
            ;;
        --verbose)
            ((++verbosity))
            shift
            ;;
        --)
            shift
            break
            ;;
        *)
            printf 'Not implemented: %q\n' "$1" >&2
            exit 1
            ;;
    esac
done

readonly configuration_file verbosity

if (( $# == 0 ))
then
    usage
    exit 1
fi

verbose_printf 'Using configuration file %q\n' "$configuration_file"

for argument
do
    verbose_printf 'Processing %q\n' "$argument"
done
