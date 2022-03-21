package gw.plugin.billing.bc1000

uses wsi.remote.gw.webservice.bc.bc1000.entity.enums.SpecialHandlingType
uses wsi.remote.gw.webservice.bc.bc1000.entity.types.complex.CancelPolicyInfo

@Export
enhancement CancelPolicyInfoEnhancement : CancelPolicyInfo {
  function sync(period : PolicyPeriod) {
    setDefaultSpecialHandling(period)
    this.syncBasicPolicyInfo(period)
    this.CancellationType = period.RefundCalcMethod.Code
    this.CancellationReason = period.Cancellation.CancelReasonCode.Description
  }

  private function setDefaultSpecialHandling(period: PolicyPeriod) {
    if ((period.SpecialHandling == null) and (period.hasScheduledFinalAudit() or period.hasOpenFinalAudit())) {
      this.SpecialHandling = SpecialHandlingType.Holdforauditall
    }
  }
}