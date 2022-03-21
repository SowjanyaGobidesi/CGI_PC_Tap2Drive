package gw.api.databuilder.ba
uses gw.api.builder.SubmissionBuilderBase
uses gw.api.builder.AccountBuilder
uses gw.api.builder.CoverageBuilder

@Export
class BASubmissionBuilder extends SubmissionBuilderBase<BASubmissionBuilder> {

  var lineBuilder = new BusinessAutoLineBuilder()
  var accountBuilder = new AccountBuilder()
  var jurisdictionBuilder = new BAJurisdictionBuilder()

  construct()
  {
    this(true)
  }
  
  construct(validating: boolean) {
    if (validating) {
      withValidation()
    }
    withAccount(accountBuilder)
    withProduct("BusinessAuto")
    jurisdictionBuilder.withState(TC_CA)
    withPolicyLine(lineBuilder
        .withCoverage(new CoverageBuilder(BAOwnedLiabilityCov)
          .withPatternCode("BAOwnedLiabilityCov")
          .withPackageCovTerm("BAOwnedLiabilityLimit", "250/500/100"))
      .withJurisdiction(jurisdictionBuilder)
      .withVehicle(new BAVehicleBuilder().withClassCode("0420").withVehicleType(TC_PP)).asNonFleet())
  }
  
  function withHiredCoverage(coverageBuilder : CoverageBuilder) : BASubmissionBuilder{
    jurisdictionBuilder.withHiredAutoBasis(1, false)
    lineBuilder.withCoverage(coverageBuilder)
    return this
  }
  
}
