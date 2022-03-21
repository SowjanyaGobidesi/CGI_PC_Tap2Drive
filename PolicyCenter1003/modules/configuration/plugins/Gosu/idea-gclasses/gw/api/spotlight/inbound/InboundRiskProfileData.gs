package gw.api.spotlight.inbound

uses gw.riskassessment.JacksonEnabledSerializable

/**
 * InboundRiskProfileData is the Pogo that corresponds to the json risk profile data that is sent from Spotlight Risk
 * Assessment to Policy Center.
 * This Pogo is a child of InboundRiskAssessmentData, and it stores the risk profile that the risk assessment was
 * assessed in.
 */
@Export
class InboundRiskProfileData implements JacksonEnabledSerializable {
  public var riskProfileCode: String
  public var name: String
}