package gw.api.spotlight

uses gw.api.database.spatial.SpatialPoint
uses gw.plugin.policylocation.LocationRiskAssessmentParameters
uses gw.riskassessment.SpotlightConfigParameters

uses java.util.Map

/**
 * This class is used when calling the risk assessment service and you don't care
 * about the risk assessment parameters.  This is most likely used when the risk
 * assessment service is called in a batch process.
 */
@Export
class NonInteractivePolicyLocationRiskAssessmentParameters implements LocationRiskAssessmentParameters {

  var _locationRiskAssessmentTempStores: OutboundLocationRiskAssessmentTempStore[]

  construct (outboundLocationTempStore : OutboundLocationRiskAssessmentTempStore) {
    _locationRiskAssessmentTempStores = {outboundLocationTempStore}
  }

  construct(outboundLocationTempStore : OutboundLocationRiskAssessmentTempStore[]) {
    _locationRiskAssessmentTempStores = outboundLocationTempStore
  }
  override property get RiskAssessmentContext(): String {
    return null
  }

  override property get RiskProfileCode() : String {
    return SpotlightConfigParameters.DEFAULT_RISK_PROFILE_CODE
  }

  override property get LocationGeoCodeMap(): Map<OutboundLocationRiskAssessmentTempStore, SpatialPoint> {
    return _locationRiskAssessmentTempStores.mapToValue(\elt -> elt.SpatialPoint)
  }

}