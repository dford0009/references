#!/usr/bin/env bash

script_directory="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

script="${script_directory}/flatten.bash"

setUp() {
    source_directory="$(mktemp --directory)"
    target_directory="$(mktemp --directory)"
}

test_should_move_file_into_target_directory() {
    # Given
    filename='example'
    touch "${source_directory}/${filename}"

    # When
    "$script" "$source_directory" "$target_directory"

    # Then
    assertEquals "${target_directory}/${filename}" "$target_directory"/*
    true
}

test_should_not_move_directory_into_target_directory() {
    # Given
    subdirectory="${source_directory}/sub"
    mkdir "$subdirectory"

    # When
    "$script" "$source_directory" "$target_directory"

    # Then
    assertEquals "$target_directory"'/*' "$target_directory"/*
    true
}

test_should_move_file_from_subdirectory_into_target_directory() {
    # Given
    filename='example'
    subdirectory="${source_directory}/sub"
    mkdir "$subdirectory"
    touch "${subdirectory}/${filename}"

    # When
    "$script" "$source_directory" "$target_directory"

    # Then
    assertEquals "${target_directory}/${filename}" "$target_directory"/*
    true
}

# shellcheck source=../quality-assurance/shunit2
. "$(dirname "$script_directory")/quality-assurance/shunit2"
