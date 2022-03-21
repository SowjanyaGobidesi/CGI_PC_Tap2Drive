package gw.financials

uses entity.JobGroup
uses gw.pl.currency.MonetaryAmount

enhancement JobGroupFinancialsEnhancement: JobGroup {

  /**
   * The transaction amount sum for all active, validly rated, jobs in this group.
   */
  property get AmountSum(): MonetaryAmount {
    var validPeriods = this.Jobs*.LatestPeriod.where(\period -> period.Active and period.ValidRate)
    var transactionSets = validPeriods.flatMap(\p -> p.AllTransactions)
    var currency = this.Account.PreferredSettlementCurrency
    return transactionSets.sum(currency, \t -> t.Amount.convertAmount(currency))
  }
}