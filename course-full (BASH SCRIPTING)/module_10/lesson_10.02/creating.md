---
title: "Creating"
# description:
---

# Creating


By now you might already be dreading trying to create valid JSON content with arbitrary keys and values, but `jq` does this for you:

{lang="console"}
```
$ jq --null-input --arg username jdoe --arg password '$ec\ret' \
> '{"username":$username, "password":$password}'
{
  "username": "jdoe",
  "password": "$ec\\ret"
}
```

T> If saving space is more important than readability you can use `--compact-output` to disable extra whitespace.

`man jq` and [the wiki](https://github.com/stedolan/jq/wiki) go into much more detail.
