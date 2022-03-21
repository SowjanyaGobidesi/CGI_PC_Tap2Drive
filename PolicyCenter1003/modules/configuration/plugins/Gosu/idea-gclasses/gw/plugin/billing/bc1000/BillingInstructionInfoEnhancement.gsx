package gw.plugin.billing.bc1000

uses gw.api.util.MonetaryAmounts
uses gw.pl.currency.MonetaryAmount
uses wsi.remote.gw.webservice.bc.bc1000.entity.anonymous.elements.BillingInstructionInfo_ChargeInfos
uses wsi.remote.gw.webservice.bc.bc1000.entity.enums.SpecialHandlingType
uses wsi.remote.gw.webservice.bc.bc1000.entity.types.complex.BillingInstructionInfo
uses wsi.remote.gw.webservice.bc.bc1000.entity.types.complex.CancelPolicyInfo
uses wsi.remote.gw.webservice.bc.bc1000.entity.types.complex.FinalAuditInfo
uses wsi.remote.gw.webservice.bc.bc1000.entity.types.complex.PolicyChangeInfo
uses wsi.remote.gw.webservice.bc.bc1000.entity.types.complex.PremiumReportInfo
uses wsi.remote.gw.webservice.bc.bc1000.entity.types.complex.ReinstatementInfo


@Export
enhancement BillingInstructionInfoEnhancement : BillingInstructionInfo {
  function syncBasicPolicyInfo(period : PolicyPeriod) {
    startSyncBasicPolicyInfo(period)
    gw.plugin.billing.bc1000.ChargeInfoUtil.getChargeInfos(period).each(\c -> {
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
    this.TermConfirmed = period.PolicyTerm.Bound
    this.OfferNumber = period.Job.JobNumber
    setSpecialHandling(period)
  }

  private function calculateDeposit(period : PolicyPeriod) : MonetaryAmount {
    var job = period.Job
    if(job typeis Audit and job.AuditInformation.AuditScheduleType == TC_PREMIUMREPORT){
      return null
    }
    return period.PolicyTerm.DepositReleased ? MonetaryAmounts.zeroOf(period.PreferredSettlementCurrency) : period.PolicyTerm.DepositAmount
  }

  private function setSpecialHandling(period : PolicyPeriod) {
    if (supportsSpecialHandling() and (period.SpecialHandling != null)) {
      var specialHandlingType = SpecialHandlingType.forGosuValue(period.SpecialHandling.Code)
      if (specialHandlingType == null) {
        throw new IllegalArgumentException("The passed-in PolicyPeriod had a value set for SpecialHandling that was not found in the SpecialHandlingType enum in entity.xsd")
      } else {
        this.SpecialHandling = specialHandlingType
      }
    }
  }

  private function supportsSpecialHandling() : boolean {
    //Gosu enhancements can not override functions, so we have to use explicit type checking here instead of polymorphism.
    var typesThatSupportSpecialHandling = {
        PolicyChangeInfo.asTypeData(),
        FinalAuditInfo.asTypeData(),
        ReinstatementInfo.asTypeData(),
        CancelPolicyInfo.asTypeData(),
        PremiumReportInfo.asTypeData()
    }
    return typesThatSupportSpecialHandling.contains(this.$TypeData)
  }


}