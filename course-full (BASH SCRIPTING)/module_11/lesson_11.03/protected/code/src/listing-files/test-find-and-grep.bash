#!/usr/bin/env bash

script_directory="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

script="${script_directory}/find-and-grep.bash"

oneTimeSetUp() {
    test_directory="$(mktemp --directory)"
    test_file="${test_directory}/input"
}

test_should_print_lines_with_first_string_in_file_more_than_two_days_old() {
    string='a XML b'
    echo "$string" > "$test_file"
    touch --date="$(date --date='-3 days')" "$test_file"

    assertEquals "$string"$'\nx' "$("$script" "$test_directory"; printf x)"
    true
}

test_should_print_lines_with_second_string_in_file_more_than_two_days_old() {
    string='a HTML b'
    echo "$string" > "$test_file"
    touch --date="$(date --date='-3 days')" "$test_file"

    assertEquals "$string"$'\nx' "$("$script" "$test_directory"; printf x)"
    true
}

test_should_not_print_matching_lines_in_file_less_than_two_days_old() {
    cat > "$test_file" <<'EOF'
XML
HTML
other
EOF

    assertEquals '' "$("$script" "$test_directory")"
    true
}

# shellcheck source=../quality-assurance/shunit2
. "$(dirname "$script_directory")/quality-assurance/shunit2"
