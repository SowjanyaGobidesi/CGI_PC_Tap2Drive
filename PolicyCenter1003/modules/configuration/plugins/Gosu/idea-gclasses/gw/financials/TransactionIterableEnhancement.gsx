package gw.financials

uses gw.pl.currency.MonetaryAmount
uses gw.api.util.MonetaryAmounts

uses java.lang.Iterable

/**
 * Additional functionality for sets of transactions.
 */
enhancement TransactionIterableEnhancement<T extends Transaction> : Iterable<T> {
  reified function AmountSum(currency : Currency) : MonetaryAmount {
    return MonetaryAmounts.roundToCurrencyScale(this.toCollection().sum(currency, \ tx -> tx.AmountBilling ))
  }

  reified property get AnyProrated() : boolean {
    return this.toCollection().hasMatch( \ tx -> tx.Prorated )
  }

}
