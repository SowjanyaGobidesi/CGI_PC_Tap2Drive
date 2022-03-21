package gw.api.spotlight.inbound

uses com.fasterxml.jackson.annotation.JsonIgnoreProperties
uses gw.api.web.color.GWColor
uses gw.riskassessment.JacksonEnabledSerializable
uses gw.riskassessment.SpotlightConfigParameters
uses gw.util.Pair

/**
 * InboundLocationSeverityData is the Pogo that corresponds to the json severity results data that is sent from
 * Spotlight Risk Assessment to Policy Center.
 * This Pogo is a child of InboundLocationResultData, and it stores the severity results of all the risk assessments
 * per location.
 */
@Export
class InboundLocationSeverityData implements JacksonEnabledSerializable {

  /**
   * Is either Unknown, Low, Medium, or High
   */
  public var severityCode: String
  public var name: String
  /**
   *  Is the number representation of the severity Code.  It is between 1-2
   */
  public var orderingRank: double

  @JsonIgnoreProperties
  public property get severityIcon() : Pair<String, GWColor> {
    return SpotlightConfigParameters.severityCodeToIconMap.getOrDefault(severityCode, new Pair("circle_minus", GWColor.THEME_ALERT_NEUTRAL))
  }

}