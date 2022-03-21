package gw.riskassessment

uses gw.api.system.bundle.PCNeverPersistedBundle

@Export
enhancement LocationRiskAssessmentEnhancement : LocationRiskAssessment {

  /**
   *
   * @return True  - If the the LocationRiskAssessment policy location "important data" is different than
   *                 then the current policy location data
   *         False - If the LocationRiskAssessment policy location "important data" is the same as the current policy
   *                 location data
   */
  property get IsRiskAssessmentStale() : boolean {
    var neverPersistedBundle = new PCNeverPersistedBundle()
    var uncommittedPeriodRiskAssessmentRequestData = new OutboundPeriodRiskAssessmentTempStore(neverPersistedBundle)
    uncommittedPeriodRiskAssessmentRequestData.PolicyPeriod = this.PolicyLocation.Branch
    var uncommittedRiskAssessmentRequestData = new OutboundLocationRiskAssessmentTempStore(neverPersistedBundle)
    uncommittedRiskAssessmentRequestData.populateData(this.PolicyLocation)
    uncommittedPeriodRiskAssessmentRequestData.addToOutboundLocationRiskAssessmentTempStore(uncommittedRiskAssessmentRequestData)
    return this.hasAssessmentCriteriaChanged(uncommittedRiskAssessmentRequestData)
  }

}
