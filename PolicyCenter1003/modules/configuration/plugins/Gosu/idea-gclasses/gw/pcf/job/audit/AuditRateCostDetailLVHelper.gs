package gw.pcf.job.audit

uses gw.api.locale.DisplayKey
uses gw.lob.wc.rating.WCRatingPeriod
uses gw.pl.currency.MonetaryAmount

/**
 * Helper code to job.audit/AuditRateCostDetailLVH.pcf file
 */
@Export
class AuditRateCostDetailLVHelper {
  var ratingPeriod: WCRatingPeriod

  construct(period: WCRatingPeriod) {
    ratingPeriod = period
  }

  property get PremiumLabel(): String {
    return (IsRevisedAudit ?
        DisplayKey.get("Web.AuditWizard.Premiums.Details.Premium.PriorAudited") :
        DisplayKey.get("Web.AuditWizard.Premiums.Details.Premium.Estimated"))
  }

  property get PayrollLabel(): String {
    return (IsRevisedAudit ?
        DisplayKey.get("Web.AuditWizard.PriorAuditedPayroll") :
        DisplayKey.get("Web.AuditWizard.EstPayroll"))
  }

  function premiumAmount(wcCovEmp: WCCoveredEmployee): MonetaryAmount {
    var value = wcCovEmp.LastBilledCoveredEmployee.WCCovEmpCost.ActualAmountBilling
    return value ?: gw.api.util.MonetaryAmounts.zeroOf(wcCovEmp.Branch.PreferredSettlementCurrency)
  }

  function payrollAmount(wcCovEmp: WCCoveredEmployee): java.math.BigDecimal {
    return wcCovEmp.LastBilledCoveredEmployee.BasisForRating
  }

  private property get IsRevisedAudit(): boolean {
    return ratingPeriod.Jurisdiction.Branch.Audit.AuditInformation.IsRevision
  }
}