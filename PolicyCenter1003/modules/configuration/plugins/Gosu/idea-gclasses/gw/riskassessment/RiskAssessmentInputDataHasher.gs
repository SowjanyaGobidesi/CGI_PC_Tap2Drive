package gw.riskassessment

@Export
class RiskAssessmentInputDataHasher extends RiskAssessmentDataHasher {

  construct(inputData : OutboundLocationRiskAssessmentTempStore) {
    super(inputData)
  }

  override property get FieldList(): List<String> {
    return {
        "OutboundPeriodRiskAssessmentTempStore.PolicyPeriod.PeriodStart", "OutboundPeriodRiskAssessmentTempStore.PolicyPeriod.PeriodEnd",
        "GeocodeableAddress", "City", "County", "PostalCode", "State", "Country"
    }
  }
}