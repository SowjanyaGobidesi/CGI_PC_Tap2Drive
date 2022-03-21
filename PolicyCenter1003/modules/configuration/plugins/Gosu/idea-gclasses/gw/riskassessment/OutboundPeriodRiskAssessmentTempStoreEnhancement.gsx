package gw.riskassessment

enhancement OutboundPeriodRiskAssessmentTempStoreEnhancement : OutboundPeriodRiskAssessmentTempStore {

  public function populateData(period : PolicyPeriod) {
    this.PolicyPeriod = period

    period.PolicyLocations.each(\policyLocation -> {
      var outboundTempLocation = policyLocation.AssociatedLocationRiskAssessmentTempStore
      if (outboundTempLocation == null) {
        outboundTempLocation = new OutboundLocationRiskAssessmentTempStore(policyLocation.Bundle)
      } else {
        outboundTempLocation = policyLocation.Bundle.add(outboundTempLocation)
      }
      outboundTempLocation.populateData(policyLocation)
      outboundTempLocation.PolicyLocation = policyLocation
      this.addToOutboundLocationRiskAssessmentTempStore(outboundTempLocation)
    })
  }
}
