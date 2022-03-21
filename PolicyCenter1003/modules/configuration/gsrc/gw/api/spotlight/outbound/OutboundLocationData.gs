package gw.api.spotlight.outbound

uses gw.riskassessment.JacksonEnabledSerializable

uses java.lang.IllegalStateException
uses java.math.BigDecimal

/**
 * OutboundLocationData is the Pogo that corresponds to the Policy Center location data that will be converted into
 * json and sent over to the Spotlight Risk Assessment service to be assessed, or Interactive to display the location.
 * This Pogo is the child of OutboundPolicyData.
 */
@Export
class OutboundLocationData implements JacksonEnabledSerializable {

  public var policySystemId : String
  public var name : String
  public var coordinates : OutboundCoordinatesData
  public var address : OutboundAddressData
  public var reinsuranceRisks : OutboundReinsuranceRiskData[]

  construct() {}

  construct(requestData : OutboundLocationRiskAssessmentTempStore) {
    if (requestData.PublicID == null) {
      throw new IllegalStateException("Public ID cannot be null")
    }
    
    policySystemId = requestData.PublicID
    name = requestData.DisplayName
    coordinates = new OutboundCoordinatesData(requestData.SpatialPoint)
    address = new OutboundAddressData(requestData)
    reinsuranceRisks = requestData.OutboundReinsurableRiskAssessmentTempStore.map(\elt -> new OutboundReinsuranceRiskData(elt))
  }

}