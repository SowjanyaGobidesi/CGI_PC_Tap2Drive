package gw.api.databuilder.bop
uses gw.api.builder.SubmissionBuilderBase
uses gw.api.builder.CoverageBuilder
uses gw.api.builder.PolicyLocationBuilder
uses gw.api.databuilder.contact.PolicyAddlInsuredBuilder
uses gw.api.builder.BuildingBuilder

@Export
class BOPSubmissionBuilder extends SubmissionBuilderBase<BOPSubmissionBuilder> {
  
  var lineBuilder = new BOPLineBuilder()

  construct() {
    withProduct("BusinessOwners")
    lineBuilder.withOnlyBOPLocation(new BOPLocationBuilder()
      .withBuilding(new BOPBuildingBuilder()))
    withPolicyLine(lineBuilder)
  }
  
  function withBuilding(buildingBuilder : BOPBuildingBuilder) : BOPSubmissionBuilder{
    var bldg = new BuildingBuilder()
    var _loc = new PolicyLocationBuilder().withBuilding(bldg)
    var locationBuilder  = new BOPLocationBuilder().withLocation(_loc)
      .withBuilding( buildingBuilder.withBuilding( bldg ) )
    withPolicyLocation(_loc)
    lineBuilder.withOnlyBOPLocation(locationBuilder)
    return this
  }
  
  function withCoverage(coverageBuilder : CoverageBuilder): BOPSubmissionBuilder {
    lineBuilder.withCoverage(coverageBuilder)
    return this
  }

  function withAdditionalInsured(addInsuredBuilder : PolicyAddlInsuredBuilder) : BOPSubmissionBuilder{
    lineBuilder.withAdditionalInsured(addInsuredBuilder)
    return this
  }
  
  function withBOPLocation(bopLocationBuilder : BOPLocationBuilder) : BOPSubmissionBuilder {
    var policyLocationBuilder = new PolicyLocationBuilder()
    bopLocationBuilder.withLocation(policyLocationBuilder)
    withPolicyLocation(policyLocationBuilder)
    lineBuilder.withBOPLocation(bopLocationBuilder)
    return this
  }

  function withBOPLocationHavingPolicyLocation(bopLocationBuilder : BOPLocationBuilder) : BOPSubmissionBuilder {
    lineBuilder.withBOPLocation(bopLocationBuilder)
    return this
  }
}
