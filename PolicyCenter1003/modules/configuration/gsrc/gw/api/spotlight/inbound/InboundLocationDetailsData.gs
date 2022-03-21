package gw.api.spotlight.inbound

uses gw.riskassessment.JacksonEnabledSerializable

/**
 * InboundLocationDetailsData is the Pogo that corresponds to the json details of the risk assessment results data that
 * is sent from Spotlight Risk Assessment to Policy Center.
 * This Pogo is a child of InboundLocationResultData, and it stores all the details of the risk assessment.  There
 * can be more than one detail per assessment.
 */
@Export
class InboundLocationDetailsData implements JacksonEnabledSerializable {
  public var detailCode: String
  public var label: String
  public var unformattedValue: String
  public var formattedValue: String
}