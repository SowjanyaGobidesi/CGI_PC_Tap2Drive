package gw.api.spotlight

uses gw.api.database.spatial.SpatialPoint
uses gw.plugin.policylocation.LocationRiskAssessmentParameters

uses java.util.Map

@Export
/**
 * This class is used when calling the risk assessment service and you do care about
 * the risk assessment parameters.  This is most likely used when using the inter-active
 * assessment service.
 */
class InteractivePolicyLocationRiskAssessmentParameters implements LocationRiskAssessmentParameters {

  var _riskAssessmentContext : String
  var _riskProfileCode : String
  var _geoCodeMap : Map<OutboundLocationRiskAssessmentTempStore, SpatialPoint>

  construct(context : String, riskProfileCode : String, geoCodeMap : Map<OutboundLocationRiskAssessmentTempStore, SpatialPoint>) {
    _riskAssessmentContext = context
    _geoCodeMap = geoCodeMap
    _riskProfileCode = riskProfileCode
  }

  override property get RiskAssessmentContext(): String {
    return _riskAssessmentContext
  }

  override property get RiskProfileCode() : String {
    return _riskProfileCode
  }

  override property get LocationGeoCodeMap(): Map<OutboundLocationRiskAssessmentTempStore, SpatialPoint> {
    return _geoCodeMap
  }
}