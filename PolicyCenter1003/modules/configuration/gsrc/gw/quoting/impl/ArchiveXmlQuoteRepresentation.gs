package gw.quoting.impl

uses gw.api.quoting.QuoteKey
uses gw.api.quoting.QuoteRepresentation
uses org.apache.commons.io.IOUtils

uses javax.annotation.Nonnull
uses java.io.ByteArrayInputStream
uses java.io.InputStream
uses java.nio.charset.StandardCharsets

/**
 * This class contains components of a quote.
 * <p>
 * It has the Archive XML containing the Costs and any additional information outside of the data model.
 */
@Export
class ArchiveXmlQuoteRepresentation implements QuoteRepresentation {
  static final var ENCODING = StandardCharsets.UTF_8

  var _quoteInfo : String
  var _additionalInfo : String

  private construct() {}

  /**
   * Construct a QuoteRepresentation
   *
   * @param quoteInfo     the InputStream of a serialized quote.
   * @param additionalInfo the InputStream of AdditionalInfo, or sidecar.
   * @return the assembled QuoteRepresentation
   */
  static function createQuoteRepresentation(@Nonnull quoteInfo : InputStream, @Nonnull additionalInfo : InputStream)
      : ArchiveXmlQuoteRepresentation {
    return new ArchiveXmlQuoteRepresentation(quoteInfo, additionalInfo)
  }

  protected construct(quoteInfo : InputStream, additionalInfo : InputStream) {
    _quoteInfo = quoteInfo.TextContent
    _additionalInfo = additionalInfo.TextContent
  }

  override property get QuoteInputStream() : InputStream {
    return new ByteArrayInputStream(_quoteInfo.getBytes(ENCODING))
  }

  override property get AdditionalInfoInputStream() : InputStream {
    return new ByteArrayInputStream(_additionalInfo.getBytes(ENCODING))
  }
}