#!/usr/bin/env bash

script_directory="$(dirname "${BASH_SOURCE[0]}")"

test_should_convert_v1_to_v2() {
    assertEquals "$(cat "${script_directory}/v2.xml")" \
        "$(xsltproc "${script_directory}/v1-to-v2.xslt" \
            "${script_directory}/v1.xml")"
    true
}

test_should_create_authentication() {
    assertEquals "$(cat "${script_directory}/authentication.xml")" \
        "$(xsltproc --stringparam username jdoe \
            --stringparam password 'foo > bar' \
            "${script_directory}/authentication.xslt" - <<< '<dummy/>')"
    true
}

# shellcheck source=../quality-assurance/shunit2
. "$(dirname "$script_directory")/quality-assurance/shunit2"
