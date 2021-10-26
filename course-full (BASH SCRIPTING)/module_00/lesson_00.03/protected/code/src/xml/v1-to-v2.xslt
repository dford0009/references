<?xml version="1.0"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
  <xsl:strip-space elements="*"/>
  <xsl:output indent="yes"/>
  <xsl:template match="/">
    <configuration>
      <xsl:apply-templates select="*"/>
    </configuration>
  </xsl:template>
  <xsl:template match="db">
    <db>
      <name>
        <xsl:value-of select="text()"/>
      </name>
      <host>
        <xsl:value-of select="@host"/>
      </host>
      <user>
        <xsl:value-of select="@user"/>
      </user>
      <password>
        <xsl:value-of select="@password"/>
      </password>
    </db>
  </xsl:template>
  <xsl:template match="host">
    <host>
      <name>
        <xsl:value-of select="text()"/>
      </name>
      <port>
        <xsl:value-of select="@port"/>
      </port>
    </host>
  </xsl:template>
</xsl:stylesheet>
