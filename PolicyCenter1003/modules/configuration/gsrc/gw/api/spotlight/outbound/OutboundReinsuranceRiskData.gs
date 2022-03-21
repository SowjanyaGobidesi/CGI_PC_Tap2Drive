package gw.api.spotlight.outbound

uses gw.riskassessment.JacksonEnabledSerializable

uses java.math.BigDecimal

/**
 * OutboundReinsuranceRiskData is the Pogo that corresponds to the Policy Center Insurance data that will be converted into
 * json and sent over to the Spotlight Interactive service to be displayed on the map.
 * This Pogo is the child of OutboundLocationData.
 */
@Export
class OutboundReinsuranceRiskData implements JacksonEnabledSerializable {

  public var coverageGroup : OutboundCoverageGroupData
  public var totalInsuredValue : OutboundTotalInsuredValueData

  construct() {}

  construct(reinsurable : OutboundReinsurableRiskAssessmentTempStore) {
    coverageGroup = new OutboundCoverageGroupData(reinsurable.CoverageGroup)
    totalInsuredValue = new OutboundTotalInsuredValueData(reinsurable.TotalInsuredValue)
  }

}