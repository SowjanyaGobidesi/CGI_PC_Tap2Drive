package gw.api.spotlight.inbound

uses gw.riskassessment.JacksonEnabledSerializable

/**
 * InboundLocationCategoryData is the Pogo that corresponds to the json assessment results data that is sent from
 * Spotlight Risk Assessment to Policy Center.
 * This Pogo is a child of InboundLocationAssessmentData, and it stores the "groupName" in Spotlight's domain model
 */
@Export
class InboundLocationCategoryData implements JacksonEnabledSerializable {
  public var name: String
}