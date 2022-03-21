package gw.riskassessment

uses gw.api.address.AddressFormatter

@Export
enhancement OutboundLocationRiskAssessmentTempStoreEnhancement : OutboundLocationRiskAssessmentTempStore {

  public function populateData(policyLocation : PolicyLocation) {
    this.PolicyLocationName = policyLocation.DisplayName
    this.SpatialPoint = policyLocation.LatestLocationRiskAssessment?.SpatialPoint ?: policyLocation.AccountLocation.SpatialPoint
    this.AddressLine1 = policyLocation.AddressLine1
    this.AddressLine2 = policyLocation.AddressLine2
    this.AddressLine3 = policyLocation.AddressLine3
    this.City = policyLocation.City
    this.County = policyLocation.County
    this.PostalCode = policyLocation.PostalCode
    this.State = policyLocation.State
    this.Country = policyLocation.Country
    policyLocation.Reinsurables.each(\elt -> {
      var reinsurableData = new OutboundReinsurableRiskAssessmentTempStore(this.Bundle)
      reinsurableData.CoverageGroup = elt.CoverageGroup
      reinsurableData.TotalInsuredValue = elt.TotalInsuredValue
      this.addToOutboundReinsurableRiskAssessmentTempStore(reinsurableData)
    })

  }

  property get DisplayableAddress() : String {
    var formatter = new AddressFormatter()
    return formatter.format(this, SpotlightConfigParameters.DISPLAYABLE_ADDRESS_DELIMITER, SpotlightConfigParameters.GeoCodeableAddressFields())
  }

  property get GeocodeableAddress() : String {
    var formatter = new AddressFormatter()
    return formatter.format(this, SpotlightConfigParameters.GEOCODEABLE_ADDRESS_DELIMITER, SpotlightConfigParameters.GeoCodeableAddressFields())
  }

}
