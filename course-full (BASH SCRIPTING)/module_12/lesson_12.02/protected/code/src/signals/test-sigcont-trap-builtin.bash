#!/usr/bin/env bash

script_directory="$(dirname "${BASH_SOURCE[0]}")"

script="${script_directory}/sigcont-trap-builtin.bash"

oneTimeSetUp() {
    test_directory="$(mktemp --directory)"
    stdout="${test_directory}/stdout"
    stderr="${test_directory}/stderr"
}

test_should_output_nothing_when_interrupted() {
    "$script" < /dev/stdin > "$stdout" 2> "$stderr" &
    sleep 0.1
    kill "$!"
    wait
    assertEquals 0 $?
    assertEquals 'x' "$(cat "$stdout"; echo x)"
    assertEquals 'x' "$(cat "$stderr"; echo x)"
    true
}

test_should_print_message_on_stderr_when_continuing() {
    "$script" < /dev/stdin > "$stdout" 2> "$stderr" &
    sleep 0.1
    kill -STOP "$!"
    kill -CONT "$!"
    sleep 0.1
    kill "$!"
    wait
    assertEquals 0 $?
    assertEquals 'x' "$(cat "$stdout"; echo x)"
    assertEquals $'Continuing…\nx' "$(cat "$stderr"; echo x)"
    true
}

# shellcheck source=../quality-assurance/shunit2
. "$(dirname "$script_directory")/quality-assurance/shunit2"
