package gw.api.spotlight.inbound.error

uses gw.riskassessment.JacksonEnabledSerializable

/**
 * InboundErrorsData is the Pogo that holds the actual error, and the data that the error is associated with.
 * This Pogo is a child of InboundRiskAssessmentErrorData, and it stores the errors.
 */
@Export
class InboundErrorsData implements JacksonEnabledSerializable {
  public var errorCode : String
  public var message : String
  public var data : InboundDetailsErrorData

}