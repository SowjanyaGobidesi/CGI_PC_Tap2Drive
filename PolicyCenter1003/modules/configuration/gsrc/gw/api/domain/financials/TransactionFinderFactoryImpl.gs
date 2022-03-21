package gw.api.domain.financials

@Export
class TransactionFinderFactoryImpl implements TransactionFinderFactory {
  override function newInstance(): TransactionFinder {
    return new TransactionFinderImpl()
  }
}