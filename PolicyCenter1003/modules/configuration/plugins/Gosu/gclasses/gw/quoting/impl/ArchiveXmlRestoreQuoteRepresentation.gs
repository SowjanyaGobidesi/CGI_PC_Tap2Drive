package gw.quoting.impl

uses gw.api.quoting.QuoteKey
uses gw.api.quoting.RestoreQuoteRepresentation

uses javax.annotation.Nonnull
uses java.io.InputStream

/**
 * This class contains components of a quote.
 * <p>
 * It has the Archive XML containing the Costs and any additional information outside of the data model.
 * and the QuoteKey representing the ID of the stored quote.
 */
@Export
class ArchiveXmlRestoreQuoteRepresentation extends ArchiveXmlQuoteRepresentation implements RestoreQuoteRepresentation {
  var _quoteKey : QuoteKey as QuoteKey

  /**
   * Construct a {@link RestoreQuoteRepresentation} for the given quoteID from the Streams read from a Quote Store.
   *
   * @param quoteInfo      the InputStream of a serialized quote.
   * @param additionalInfo the InputStream of AdditionalInfo, or sidecar, of a stored quote.
   * @param quoteKey       the QuoteKey representing the ID of the stored quote.
   * @return the assembled QuoteRepresentation
   */
  static function createQuoteRepresentation(@Nonnull quoteInfo : InputStream, @Nonnull additionalInfo : InputStream,
                                            @Nonnull quoteKey : QuoteKey) : ArchiveXmlRestoreQuoteRepresentation {
    return new ArchiveXmlRestoreQuoteRepresentation(quoteInfo, additionalInfo, quoteKey)
  }

  construct(quoteInfo : InputStream, additionalInfo : InputStream, quoteKey : QuoteKey) {
    super(quoteInfo, additionalInfo)
    _quoteKey = quoteKey
  }

}