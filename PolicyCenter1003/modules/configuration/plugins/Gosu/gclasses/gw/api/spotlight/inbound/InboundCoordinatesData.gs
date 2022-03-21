package gw.api.spotlight.inbound

uses gw.riskassessment.JacksonEnabledSerializable

uses java.math.BigDecimal

/**
 * InboundCoordinatesData is the Pogo that holds the latitude and longitude for the policy location
 * This Pogo is a child of InboundPolicyLocationData.
 */
@Export
class InboundCoordinatesData implements JacksonEnabledSerializable {
  public var latitude: BigDecimal
  public var longitude: BigDecimal

}