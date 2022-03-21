package gw.policy

uses gw.api.domain.financials.TransactionFinder
uses gw.pl.currency.MonetaryAmount

enhancement PolicyPeriodPremiumEnhancement: PolicyPeriod {
  function calculateEarnedPremium(asOfDate: Date, includeEarnedButUnreported: boolean): Map<String, MonetaryAmount> {
    var lastReportedDate: Date
    var now = Date.Now
    if (this.Archived) {
      lastReportedDate = now
    } else {
      lastReportedDate = this.IsReportingPolicy ? this.LastReportedDate : this.PeriodStart
    }
    var result = new HashMap<String, MonetaryAmount>()
    var line: String
    var earnedAmount: MonetaryAmount
    TransactionFinder.instance.findPostedTransactions(this).each(\tx -> {
      line = tx.Cost.PolicyLine.Pattern.Name
      earnedAmount = result.getOrDefault(line, 0bd.ofCurrency(this.PreferredSettlementCurrency)).add(tx.earnedAsOf(asOfDate, lastReportedDate, includeEarnedButUnreported))
      result[line] = earnedAmount
    })
    return result
  }

  function calculateEarnedPremium(asOfDate: Date): Map<String, MonetaryAmount> {
    return calculateEarnedPremium(asOfDate, IncludeEarnedButUnreported)
  }

  property get EarnedPremium(): Map<String, MonetaryAmount> {
    return calculateEarnedPremium(Date.Now)
  }

  property get IncludeEarnedButUnreported(): boolean {
    return !this.Archived and this.IsReportingPolicy and this.CompletedNotReversedFinalAudits.IsEmpty
  }
}