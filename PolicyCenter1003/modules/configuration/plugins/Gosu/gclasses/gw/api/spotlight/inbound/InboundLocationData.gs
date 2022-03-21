package gw.api.spotlight.inbound

uses gw.riskassessment.JacksonEnabledSerializable

/**
 * InboundLocationData is the Pogo that corresponds to the json location data that is sent from Spotlight Risk Assessment
 * to Policy Center.
 * This Pogo is a child of InboundRiskAssessmentData, and it stores the which locations have been assessed and their
 * results.
 */
@Export
class InboundLocationData implements JacksonEnabledSerializable {
  public var location: InboundPolicyLocationData
  public var results: List<InboundLocationResultData>
}