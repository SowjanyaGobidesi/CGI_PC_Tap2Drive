package gw.riskassessment

uses com.fasterxml.jackson.annotation.JsonAutoDetect
uses com.fasterxml.jackson.annotation.PropertyAccessor
uses com.fasterxml.jackson.databind.ObjectMapper
uses gw.api.spotlight.outbound.OutboundPolicyData

@Export
class SpotlightLocationDetailsRequestHandler extends LocationDetailsRequestHandler {

  override property get LocationDetailURI() : String {
    return SpotlightConfigParameters.LOCATION_DETAIL
  }

  override property get LocationIDParam() : String {
    return SpotlightConfigParameters.LOCATION_ID_PARAM
  }

  override function createJSONData(location : OutboundLocationRiskAssessmentTempStore) : String {
    var data = new OutboundPolicyData({location}, SpotlightConfigParameters.DEFAULT_RISK_PROFILE_CODE)
    var mapper = new ObjectMapper()
    mapper.setVisibility(PropertyAccessor.FIELD, JsonAutoDetect.Visibility.ANY);
    return mapper.writeValueAsString(data)
  }
}