package gw.api.spotlight.outbound

uses gw.riskassessment.JacksonEnabledSerializable

/**
 * OutboundLineOfBusinessData is the Pogo that corresponds to the Policy Center line of business data that will
 * be converted intojson and sent over to the Spotlight Interactive service and displayed on the map.
 * This Pogo is the child of OutboundPolicyData.
 */
@Export
class OutboundLineOfBusinessData implements JacksonEnabledSerializable {

  public var lineOfBusinessCode : String
  public var name : String

  construct() {}

  construct(line : PolicyLine) {
    lineOfBusinessCode = line.PatternCode
    name = line.DisplayName
  }

}