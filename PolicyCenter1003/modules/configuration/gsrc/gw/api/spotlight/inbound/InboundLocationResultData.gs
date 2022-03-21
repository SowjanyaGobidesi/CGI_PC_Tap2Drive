package gw.api.spotlight.inbound

uses gw.riskassessment.JacksonEnabledSerializable

/**
 * InboundLocationResultData is the Pogo that corresponds to the json risk assessment results data that is sent from
 * Spotlight Risk Assessment to Policy Center.
 * This Pogo is a child of InboundLocationData, and it stores the results of all the risk assessments per location.
 */
@Export
class InboundLocationResultData implements JacksonEnabledSerializable {
  public var assessment: InboundLocationAssessmentData
  public var selectedFromEquidistantGeometries: Boolean
  public var severity: InboundLocationSeverityData
  public var details: List<InboundLocationDetailsData>
}