package gw.plugin.billing.bc900

uses gw.api.util.MonetaryAmounts
uses gw.pl.currency.MonetaryAmount
uses wsi.remote.gw.webservice.bc.bc900.entity.types.complex.BillingInstructionInfo
uses wsi.remote.gw.webservice.bc.bc900.entity.anonymous.elements.BillingInstructionInfo_ChargeInfos

@Export
@Deprecated(:value="900 inter-app integration packages will be removed in PC11.", :version="PC 10.0.0")
enhancement BillingInstructionInfoEnhancement : BillingInstructionInfo {
  function syncBasicPolicyInfo(period : PolicyPeriod) {
    startSyncBasicPolicyInfo(period)
    ChargeInfoUtil.getChargeInfos( period ).each(\ c -> {
      var element = new BillingInstructionInfo_ChargeInfos()
      element.$TypeInstance = c
      this.ChargeInfos.add(element)
    })
  }

  private function startSyncBasicPolicyInfo(period : PolicyPeriod){
    this.TermNumber = period.TermNumber
    this.PolicyNumber = period.PolicyNumber
    this.PCPolicyPublicID = period.Policy.PublicID
    this.EffectiveDate = period.EditEffectiveDate.XmlDateTime
    this.Description = period.Job.Description
    this.DepositRequirement = calculateDeposit(period)?.toString()
    this.HasScheduledFinalAudit = period.hasScheduledFinalAudit() or period.hasOpenFinalAudit()
    this.TermConfirmed = period.PolicyTerm.Bound
    this.OfferNumber = period.Job.JobNumber
  }

  private function calculateDeposit(period : PolicyPeriod) : MonetaryAmount {
    var job = period.Job
    if(job typeis Audit and job.AuditInformation.AuditScheduleType == TC_PREMIUMREPORT){
      return null
    }
    return period.PolicyTerm.DepositReleased ? MonetaryAmounts.zeroOf(period.PreferredSettlementCurrency) : period.PolicyTerm.DepositAmount
  }
}
