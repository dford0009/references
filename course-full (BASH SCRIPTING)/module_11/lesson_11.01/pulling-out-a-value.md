---
title: "Pulling out a value"
# description:
---

# Pulling out a value


Probably the most common use case for transforming XML in Bash is pulling out a simple value such as a configuration item. When doing so you need to be careful that any XML escaping is undone – you’ll want any `&NAME;` characters replaced by their literals in your script. `xml_grep` is one tool which can do this:

{lang="console"}
```
$ cat > ./test.xml << 'EOF'
> <configuration>
>   <password>foo &amp; bar</password>
> </configuration>
> EOF
$ password="$(xml_grep --text_only '/configuration/password' ./test.xml)"
$ printf '%s\n' "$password"
foo & bar
```

This method also handles [character data sections](https://www.w3.org/TR/2008/REC-xml-20081126/#sec-cdata-sect):

{lang="console"}
```
$ cat > ./test.xml << 'EOF'
> <configuration>
>   <password><![CDATA[<&;>\'✓]]></password>
> </configuration>
> EOF
$ password="$(xml_grep --text_only '/configuration/password' ./test.xml)"
$ printf '%s\n' "$password"
<&;>\'✓
```

T> [XML does not permit NUL characters](https://www.w3.org/TR/2008/REC-xml-20081126/#charsets), so any XML content is representable in a Bash variable.
