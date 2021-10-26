#!/usr/bin/env bash

script_directory="$(dirname "${BASH_SOURCE[0]}")"

script="${script_directory}/count.bash"

run_script() {
    "$script" "$@"
    exit_code="$?"
    echo x # Avoid newline trimming in command substitution
    return "$exit_code"
}


test_should_return_count_without_any_input() {
    result="$(run_script)"
    assertEquals 0 "$?"
    assertEquals $'0\nx' "$result"
    true
}

test_should_count_positive_numbers() {
    result="$(run_script '1' '5')"
    assertEquals 0 "$?"
    assertEquals $'2\nx' "$result"
    true
}

test_should_count_negative_numbers() {
    result="$(run_script '-3' '-8')"
    assertEquals 0 "$?"
    assertEquals $'-2\nx' "$result"
    true
}

test_should_subtract_negative_from_positive_count() {
    result="$(run_script '1' '-3' '-4' '5' '-8' '-11')"
    assertEquals 0 "$?"
    assertEquals $'-2\nx' "$result"
    true
}

test_should_count_down_to_zero_without_error() {
    result="$(run_script '2' '-2')"
    assertEquals 0 "$?"
    true
}

test_should_count_up_to_zero_without_error() {
    result="$(run_script '-2' '2')"
    assertEquals 0 "$?"
    true
}

# shellcheck source=../quality-assurance/shunit2
. "$(dirname "$script_directory")/quality-assurance/shunit2"
