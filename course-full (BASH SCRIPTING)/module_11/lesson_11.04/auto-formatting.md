---
title: "Auto-Formatting"
# description:
---

# Auto-Formatting


All the XML and XSLT files above have been formatted using `xmllint --format`. There are many other [XML formatters](https://stackoverflow.com/a/16090892/96588), for example `tidy`, `xml_pp` and `xmlstarlet`. If you track your XML files in version control I would recommend using a formatter you’re comfortable with to give yourself an advantage when comparing revisions. Some formatters  like `xmllint` can validate the input against a [schema definition](https://www.w3.org/TR/2004/REC-xmlschema-0-20041028/). If you’re dealing with XML which is consumed and/or produced by different systems I would recommend creating and enforcing a schema at each system to ensure interoperability.
