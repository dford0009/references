_dwim() {
    local before_previous_word color_values completions current_word options \
        previous_word

    # Create an array containing all the options: "--color=auto",
    # "--color=always", "--color=never ever" and "--help"
    color_values=('auto' 'always' 'never ever')
    mapfile -t options < <(printf -- "--color='%q'\n" "${color_values[@]}")
    options+=('--help')

    # Save the last three words of the command, up to and including the
    # position of the cursor
    before_previous_word="${COMP_WORDS[$((COMP_CWORD-2))]}"
    previous_word="${COMP_WORDS[$((COMP_CWORD-1))]}"
    current_word="${COMP_WORDS[COMP_CWORD]}"

    # Generate completion when the cursor is at the end of a partial color
    # value, for example `--color=al`
    if [[ "$before_previous_word" == '--color' ]] \
        && [[ "$previous_word" == '=' ]]
    then
        mapfile -t completions < <(
            compgen -W "$(printf '%q ' "${color_values[@]}")" -- "$current_word"
        )
        mapfile -t COMPREPLY < <(printf "%q \n" "${completions[@]}")
        return
    fi

    # Generate completion when the cursor is at the end of `--color=`
    if [[ "$previous_word" == '--color' ]] && [[ "$current_word" == '=' ]]
    then
        mapfile -t COMPREPLY < <(printf "%q \n" "${color_values[@]}")
        return
    fi

    # Generate default completion, suggesting all the options
    mapfile -t COMPREPLY < <(compgen -W "${options[*]}" -- "$current_word")
}

complete -o nosort -F _dwim dwim
