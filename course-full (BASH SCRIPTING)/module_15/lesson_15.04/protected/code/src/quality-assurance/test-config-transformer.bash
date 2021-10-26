#!/usr/bin/env bash

script_directory="$(dirname "${BASH_SOURCE[0]}")"

test_should_print_username_and_password_nul_separated() {
    configuration='{
  "username": "user",
  "password": "pass"
}'
    mapfile -d '' result < <(
        "${script_directory}/config-transformer.bash" <<< "$configuration"
    )
    assertEquals 'user' "${result[0]}"
    assertEquals 'pass' "${result[1]}"
    true
}

# shellcheck source=shunit2
. "${script_directory}/shunit2"
