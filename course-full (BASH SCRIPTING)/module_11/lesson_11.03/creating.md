---
title: "Creating"
# description:
---

# Creating


`xsltproc` can also help with creating XML files from scratch, and take care of escaping and formatting easily. To do this we start with a parametric XSLT file:

{lang=xml}
<<[xml/authentication.xslt](./protected/code/src/xml/authentication.xslt)

We then use `--stringparam NAME VALUE` to specify the values of the parameters:

{lang="console"}
```
$ xsltproc --output ./authentication.xml \
> --stringparam username jdoe --stringparam password 'foo > bar' \
> ./authentication.xslt - <<< '<x/>'
```

T> `xsltproc` does not have an option analogous to `jq`’s `--null-input`, so we *have to* pass a dummy XML document.

This results in a properly formatted authentication.xml:

{lang=xml}
<<[xml/authentication.xml](./protected/code/src/xml/authentication.xml)
