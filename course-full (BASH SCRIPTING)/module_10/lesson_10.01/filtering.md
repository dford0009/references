---
title: "Filtering"
# description:
---

# Filtering


**`jq`** is *the* program to manipulate JSON in Bash. The most common use is to pull some information out of JSON files. It uses a filter language to manipulate the input. The simplest filter is the *identity,* `.` (a single full stop). This is similar to mathematical identity: the input becomes the output. Let’s create a file containing some non–trivial JSON and apply the identity filter to it:

{lang="console"}
```
$ cat > ./credentials.json << 'EOF'
> {"username":"jdoe","password":"sec\\ret$"}
> EOF
$ jq . ./credentials.json
{
  "username": "jdoe",
  "password": "sec\\ret$"
}
```

T> The first command uses a [quoted here document](https://mywiki.wooledge.org/HereDocument?action=recall&rev=11) to save a string with special characters without having to escape them.

Since this is an interactive session `jq` pretty–prints and syntax–highlights, which is a good way to get familiar with new JSON structures. As we can see, the semantics of the output is exactly the same as the original file.

T> The pretty–printing is a useful reminder that JSON is a more flexible format than CSV. A JSON file can have whitespace anywhere between tokens, it can be arbitrarily nested, and it has its own rules for escaping which are subtly different from Bash. All this means that *reliably* manipulating JSON with line–based tools like `grep`, `sed` or `awk` is basically impossible.

In a shell script you may want to *pull out a property* of credentials.json into a variable. To do this, simply use the `--raw-output` flag to avoid any kind of formatting of the output and use an *“object identifier–index” filter,* `.IDENTIFIER`:

{lang="console"}
```
$ password="$(jq --raw-output .password credentials.json)"
$ printf '%s\n' "$password"
sec\ret$
```

If the identifier contains any special characters you need to *double–quote* it, at which point single–quoting the whole pattern avoids having to escape characters:

{lang="console"}
```
$ jq '."$ amount"' <<< '{"$ amount": "5"}'
"5"
```
