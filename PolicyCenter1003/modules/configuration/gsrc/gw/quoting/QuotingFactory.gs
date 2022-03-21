package gw.quoting

/**
 * Factory for creating various quoting related classes.
 */
@Export
interface QuotingFactory {
  function createQuoteDataManager() : QuoteDataManager

  function createQuoteConverter() : QuoteConverter

  function createQuoteStore() : QuoteStore
}