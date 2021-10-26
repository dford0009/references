<?xml version="1.0"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
  <xsl:output indent="yes"/>
  <xsl:param name="username"/>
  <xsl:param name="password"/>
  <xsl:template match="/">
    <authentication>
      <username>
        <xsl:value-of select="$username"/>
      </username>
      <password>
        <xsl:value-of select="$password"/>
      </password>
    </authentication>
  </xsl:template>
</xsl:stylesheet>
