#!/usr/bin/env bash

script_directory="$(dirname "${BASH_SOURCE[0]}")"

for file in /etc/bash_completion /usr/share/bash-completion/bash_completion
do
    if [[ -e "$file" ]]
    then
        # shellcheck source=/dev/null
        . "$file" || exit 1
    fi
done
# shellcheck source=dwim-completion-3.bash
. "${script_directory}/dwim-completion-3.bash"

get_completion_results() {
    # Assumes the pointer is at the end of the line.
    COMP_LINE="$1"
    COMP_POINT="${#COMP_LINE}"
    shift
    COMP_WORDS=("$@")
    COMP_CWORD=$((${#COMP_WORDS[@]} - 1))
    _dwim
}

test_should_complete_help_flag() {
    get_completion_results 'dwim --h' 'dwim' '--h'
    assertEquals '--help ' "${COMPREPLY[0]}"
    assertEquals 1 "${#COMPREPLY[@]}"
    true
}

test_should_suggest_all_flags_at_start() {
    get_completion_results 'dwim ' 'dwim' ''
    assertEquals '--color=auto' "${COMPREPLY[0]}"
    assertEquals '--color=always' "${COMPREPLY[1]}"
    assertEquals '--color=never\ ever' "${COMPREPLY[2]}"
    assertEquals '--config=' "${COMPREPLY[3]}"
    assertEquals '--help ' "${COMPREPLY[4]}"
    assertEquals 5 "${#COMPREPLY[@]}"
    true
}

test_should_suggest_colors_after_color() {
    get_completion_results 'dwim --color' 'dwim' '--color'
    assertEquals '--color=auto' "${COMPREPLY[0]}"
    assertEquals '--color=always' "${COMPREPLY[1]}"
    assertEquals '--color=never\ ever' "${COMPREPLY[2]}"
    assertEquals 3 "${#COMPREPLY[@]}"
    true
}

test_should_suggest_colors_after_color_equals() {
    get_completion_results 'dwim --color=' 'dwim' '--color' '='
    assertEquals 'auto ' "${COMPREPLY[0]}"
    assertEquals 'always ' "${COMPREPLY[1]}"
    assertEquals 'never\ ever ' "${COMPREPLY[2]}"
    assertEquals 3 "${#COMPREPLY[@]}"
    true
}

test_should_complete_color_value_after_specifying_unique_prefix() {
    get_completion_results 'dwim --color=al' 'dwim' '--color' '=' 'al'
    assertEquals 'always ' "${COMPREPLY[0]}"
    assertEquals 1 "${#COMPREPLY[@]}"
    true
}

test_should_suggest_config_equals_after_conf() {
    get_completion_results 'dwim --conf' 'dwim' '--conf'
    assertEquals '--config=' "${COMPREPLY[0]}"
    assertEquals 1 "${#COMPREPLY[@]}"
    true
}

test_should_suggest_config_equals_after_config() {
    get_completion_results 'dwim --config' 'dwim' '--config'
    assertEquals '--config=' "${COMPREPLY[0]}"
    assertEquals 1 "${#COMPREPLY[@]}"
    true
}

test_should_suggest_files_after_config_equals() {
    cd "$(mktemp --directory)" || return 1
    touch 'first file'
    mkdir 'directory'
    touch 'directory/second file'
    get_completion_results 'dwim --config=' 'dwim' '--config' '='
    # shellcheck disable=SC2016
    assertTrue '[[ "first\ file " == "${COMPREPLY[0]}" ]] || [[ "first\ file " == "${COMPREPLY[1]}" ]]'
    # shellcheck disable=SC2016
    assertTrue '[[ "directory/" == "${COMPREPLY[0]}" ]] || [[ "directory/" == "${COMPREPLY[1]}" ]]'
    assertEquals 2 "${#COMPREPLY[@]}"
    true
}

test_should_complete_partial_config_file() {
    cd "$(mktemp --directory)" || return 1
    touch 'first file'
    mkdir 'directory'
    touch 'directory/second file'
    get_completion_results 'dwim --config=./first' \
        'dwim' '--config' '=' './first'
    assertEquals './first\ file ' "${COMPREPLY[0]}"
    assertEquals 1 "${#COMPREPLY[@]}"
    true
}

test_should_complete_directory_config_path() {
    cd "$(mktemp --directory)" || return 1
    touch 'first file'
    mkdir 'directory'
    touch 'directory/second file'
    get_completion_results 'dwim --config=./dir' 'dwim' '--config' '=' './dir'
    assertEquals './directory/' "${COMPREPLY[0]}"
    assertEquals 1 "${#COMPREPLY[@]}"
    true
}

# shellcheck source=../quality-assurance/shunit2
. "$(dirname "$script_directory")/quality-assurance/shunit2"
