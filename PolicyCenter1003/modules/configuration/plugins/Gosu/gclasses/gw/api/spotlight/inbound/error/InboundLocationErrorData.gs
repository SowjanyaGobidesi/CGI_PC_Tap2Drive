package gw.api.spotlight.inbound.error

uses gw.riskassessment.JacksonEnabledSerializable

/**
 * InboundLocationErrorData is the Pogo that holds all the location details associated with the error.
 * This Pogo is a child of InboundDetailsErrorData, and it stores all of the location details of the error.
 */
@Export
class InboundLocationErrorData implements JacksonEnabledSerializable {
  public var policySystemId : String
  public var name : String
  public var coordinates : InboundLocationCoordinatesErrorData
  public var address : InboundLocationAddressErrorData

}