package gw.api.spotlight.outbound

uses gw.riskassessment.JacksonEnabledSerializable

/**
 * OutboundCoverageGroupData is the Pogo that corresponds to the Policy Center Reinsurance coverage group data
 * that will be converted into json and sent over to the Spotlight Interactive service to be displayed on the map.
 * This Pogo is the child of OutboundReinsuranceRiskData.
 */
@Export
class OutboundCoverageGroupData implements JacksonEnabledSerializable {

  public var coverageGroupCode : String
  public var name : String

  construct() {}

  construct(coverageGroup : typekey.RICoverageGroupType) {
    coverageGroupCode = coverageGroup.Code
    name = coverageGroup.DisplayName
  }

}