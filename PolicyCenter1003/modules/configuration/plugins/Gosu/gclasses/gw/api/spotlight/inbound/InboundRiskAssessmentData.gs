package gw.api.spotlight.inbound

uses gw.riskassessment.JacksonEnabledSerializable

/**
 * InboundRiskAssessmentData is the Pogo that corresponds to the json data that is sent from Spotlight Risk Assessment
 * to Policy Center.
 * This Pogo is the root of the json data being sent to Policy Center.
 */
@Export
class InboundRiskAssessmentData implements JacksonEnabledSerializable {
  public var timestamp: String
  public var riskProfile: InboundRiskProfileData
  /**
   * Is a temporary URL link, where the end user can look for the risk assessment report
   */
  public var snapshotReportUrl: String
  public var assessedLocations: List<InboundLocationData>
}