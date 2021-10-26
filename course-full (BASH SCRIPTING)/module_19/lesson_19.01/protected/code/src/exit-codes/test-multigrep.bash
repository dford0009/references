#!/usr/bin/env bash

script_directory="$(dirname "${BASH_SOURCE[0]}")"

script="${script_directory}/multigrep.bash"

run_script() {
    "$script" "$@"
    exit_code="$?"
    echo x # Avoid newline trimming in command substitution
    return "$exit_code"
}

test_should_return_exit_code_1_when_no_patterns() {
    result="$(run_script <<< 'input')"
    assertEquals 1 $?
    assertEquals 'x' "$result"
    true
}

test_should_return_grep_exit_code_when_not_1() {
    result="$(run_script "\\" <<< 'input')"
    assertEquals 2 $?
    assertEquals 'x' "$result"
    true
}

test_should_print_matching_pattern() {
    result="$(run_script 'in' <<< 'input')"
    assertEquals 0 $?
    assertEquals $'input\nx' "$result"
    true
}

test_should_return_success_when_no_matches() {
    result="$(run_script 'in' <<< 'NOPE')"
    assertEquals 0 $?
    true
}

test_should_match_all_patterns_in_any_order() {
    result="$(run_script '01' '10' \
        <<< $'000\n001\n010\n011\n100\n101\n110\n111')"
    assertEquals 0 $?
    assertEquals $'010\n101\nx' "$result"
    true
}

# Verify escaping of user input
test_should_handle_whitespace_in_pattern() {
    result="$(run_script 'a  b' 'b a' <<< $'aa bb\na b a\na  bb aa')"
    assertEquals 0 $?
    assertEquals $'a  bb aa\nx' "$result"
    true
}

test_should_handle_quotes_in_pattern() {
    result="$(run_script '"' "'" '"$' <<< $'"1"\n\'2\'\n\'"3"\'\n"\'4\'"')"
    assertEquals 0 $?
    assertEquals $'"\'4\'"\nx' "$result"
    true
}

test_should_handle_dollar_in_pattern() {
    result="$(run_script '^..$' '0$' <<< $'00\n01\n10\n11\n000')"
    assertEquals 0 $?
    assertEquals $'00\n10\nx' "$result"
    true
}

test_should_handle_backslash_in_pattern() {
    result="$(run_script '\[' "\\\\" <<< $'\\ (\n\\ )\n\\ [\n\\ ]')"
    assertEquals 0 $?
    assertEquals $'\\ [\nx' "$result"
    true
}

# shellcheck source=../quality-assurance/shunit2
. "$(dirname "$script_directory")/quality-assurance/shunit2"
