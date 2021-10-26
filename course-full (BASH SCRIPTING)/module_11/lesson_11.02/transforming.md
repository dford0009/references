---
title: "Transforming"
# description:
---

# Transforming


Because of the complexity of XML, transforming from one document structure to another can be arbitrarily complex. [XSLT](https://en.wikipedia.org/w/index.php?title=XSLT&oldid=1006336588) is the main language for declaring such transformations, and `xsltproc` can apply such transformations to XML documents. Let’s look at a simple use case, starting with an attribute–based configuration file v1.xml:

{lang=xml}
<<[xml/v1.xml](./protected/code/src/xml/v1.xml)

We’d like to keep the indentation but put each of the configuration values into a separate element for easier parsing. To do that we

1. specify `strip-space` and `output` elements to control the indentation
1. match “/”, the root of the document
1. match the “db” and “host” child elements, transforming each of them separately

The result is v1-to-v2.xslt:

{lang=xml}
<<[xml/v1-to-v2.xslt](./protected/code/src/xml/v1-to-v2.xslt)

T> The `xmlns` (“XML namespace”) declaration at the start says that any element starting with `xsl:` belongs to the XSLT namespace, as defined by the URL. This makes it easy to mix namespaces: anything starting with `xsl:` is an XSLT directive, and anything else is part of the “default” (unnamed) namespace, which we generally use for the output elements.

Now we can run `xsltproc --output ./v2.xml ./v1-to-v2.xslt ./v1.xml` to transform the original configuration into v2.xml:

{lang=xml}
<<[xml/v2.xml](./protected/code/src/xml/v2.xml)

This has taken care of one of the subtleties of XML escaping: double quotes of course need to be escaped within an attribute value delimited by double quotes, but within element text it does *not* need to be escaped. So in the interest of readability `xsltproc` avoids unnecessary escaping.
