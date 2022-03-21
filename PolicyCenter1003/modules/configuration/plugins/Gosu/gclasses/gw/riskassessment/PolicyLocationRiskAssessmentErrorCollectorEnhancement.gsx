package gw.riskassessment

uses gw.api.spotlight.inbound.error.InboundErrorsData
uses gw.api.spotlight.inbound.error.InboundRiskAssessmentErrorData
uses gw.plugin.policylocation.RiskAssessmentErrorCollector

enhancement PolicyLocationRiskAssessmentErrorCollectorEnhancement : RiskAssessmentErrorCollector {

  /**
   * This is used for both Spotlight Interactive and the Risk Assessment Service.
   * The error json that is returned from Spotlight Interactive and Risk Assessment service is in the same json
   * format.
   * @param jsonErrors The errors returned from Spotlight Interactive and/or Risk Assessment Service
   * @param locationData List of locations that might have an error
   */
  public function addErrorsFromInboundRiskAssessmentErrorData(jsonErrors : InboundRiskAssessmentErrorData, locationData : List<OutboundLocationRiskAssessmentTempStore>) {
    var periodTempStores = locationData*.OutboundPeriodRiskAssessmentTempStore.toSet()
    jsonErrors.errors.each(\error -> {
      var errorCode = RiskAssessmentError.getTypeKey(error.errorCode)
      if (errorCode == null) {
        periodTempStores.each(\outboundTempStore -> this.addRequestError(outboundTempStore, RiskAssessmentError.TC_UNKNOWNERRORCODE))
        return
      }

      if (errorCode.hasCategory(RiskAssessmentErrorType.TC_LOCATION)) {
        handleLocationError(periodTempStores, locationData, error)
      } else if (errorCode.hasCategory(RiskAssessmentErrorType.TC_REQUEST)) {
        handleRequestError(periodTempStores, errorCode)
      } else {
        handleUnknownErrorCategory(periodTempStores)
      }
    })
  }

  private function handleLocationError(periodTempStores : Set<OutboundPeriodRiskAssessmentTempStore>, locationData : List<OutboundLocationRiskAssessmentTempStore>, error : InboundErrorsData) {
    var location = locationData.firstWhere(\elt -> elt.PublicID == error.data.location.policySystemId)
    if (location == null) {
      periodTempStores.each(\outboundTempStore -> this.addRequestError(outboundTempStore, RiskAssessmentError.TC_ERRORFORUNEXPECTEDLOCATION))
    } else {
      this.addLocationError(location, RiskAssessmentError.getTypeKey(error.errorCode))
    }
  }

  private function handleRequestError(periodTempStores : Set<OutboundPeriodRiskAssessmentTempStore>, errorCode : RiskAssessmentError) {
    periodTempStores.each(\outboundTempStore -> this.addRequestError(outboundTempStore, errorCode))
  }

  private function handleUnknownErrorCategory(periodTempStores : Set<OutboundPeriodRiskAssessmentTempStore>) {
    periodTempStores.each(\outboundTempStore -> this.addRequestError(outboundTempStore, RiskAssessmentError.TC_UNKNOWNERRORCATEGORY))
  }
}
