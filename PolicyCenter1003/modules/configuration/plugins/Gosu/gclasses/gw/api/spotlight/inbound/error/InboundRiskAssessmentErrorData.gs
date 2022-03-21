package gw.api.spotlight.inbound.error

uses gw.riskassessment.JacksonEnabledSerializable

/**
 * InboundRiskAssessmentErrorData is the Pogo that is the parent of all parents that handle error conditions if we
 * have not provided the risk assessment service with a readable address or lat long.
 */
@Export
class InboundRiskAssessmentErrorData implements JacksonEnabledSerializable {

  public var errors : List<InboundErrorsData>
}