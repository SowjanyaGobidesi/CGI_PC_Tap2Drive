package gw.api.spotlight.inbound.error

uses gw.riskassessment.JacksonEnabledSerializable

/**
 * InboundLocationAddressErrorData is the Pogo that holds the displayable location and geocodeable location details
 * for the error.
 * This Pogo is a child of InboundLocationErrorData, and it stores all of the location details of the error.
 */
@Export
class InboundLocationAddressErrorData implements JacksonEnabledSerializable {
  public var displayable : String
  public var geocodeable : String
}