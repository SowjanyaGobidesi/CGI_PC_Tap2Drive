package gw.api.spotlight.inbound

uses gw.riskassessment.JacksonEnabledSerializable

/**
 * InboundLocationAssessmentData is the Pogo that corresponds to the json assessment results data that is sent from
 * Spotlight Risk Assessment to Policy Center.
 * This Pogo is a child of InboundLocationResultData, and it stores the assessment data per location.
 */
@Export
class InboundLocationAssessmentData implements JacksonEnabledSerializable {
  public var assessmentCode : String
  public var name : String
  public var category : InboundLocationCategoryData
}