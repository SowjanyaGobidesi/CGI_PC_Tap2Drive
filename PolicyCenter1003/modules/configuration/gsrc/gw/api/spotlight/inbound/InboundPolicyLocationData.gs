package gw.api.spotlight.inbound

uses gw.riskassessment.JacksonEnabledSerializable

uses java.math.BigDecimal

/**
 * InboundPolicyLocationData is the Pogo that corresponds to the json OutboundLocationRiskAssessmentTempStore data that
 * is sent from Spotlight Risk Assessment to Policy Center.
 * This Pogo is a child of InboundLocationData, and it stores the OutboundLocationRiskAssessmentTempStore public Id,
 * and the latitude and longitude at which the results were assessed at.
 */
@Export
class InboundPolicyLocationData implements JacksonEnabledSerializable {
    public var policySystemId: String
    public var coordinates : InboundCoordinatesData
}