package gw.quoting.impl

uses gw.quoting.QuoteStore
uses gw.quoting.QuoteConverter
uses gw.quoting.QuoteDataManager
uses gw.quoting.QuotingFactory

@Export
class DefaultQuotingFactory implements QuotingFactory {

  override function createQuoteDataManager() : QuoteDataManager {
    return new DefaultQuoteDataManager(this)
  }

  override function createQuoteConverter() : QuoteConverter {
    return new ArchiveXmlQuoteConverter()
  }

  override function createQuoteStore() : QuoteStore {
    return StandAloneQuoteStore.INSTANCE
  }
}