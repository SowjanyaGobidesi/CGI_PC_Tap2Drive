package gw.api.spotlight.inbound.error

uses gw.riskassessment.JacksonEnabledSerializable

/**
 * InboundDetailsErrorData is the Pogo that holds all the details associated with the errorCode.
 * This Pogo is a child of InboundErrorsData, and it stores the details of the error
 */
@Export
class InboundDetailsErrorData implements JacksonEnabledSerializable {
  public var riskProfileCode : String
  public var location : InboundLocationErrorData
}