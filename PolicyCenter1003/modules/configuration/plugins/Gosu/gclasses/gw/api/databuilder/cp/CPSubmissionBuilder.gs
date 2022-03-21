package gw.api.databuilder.cp
uses gw.api.builder.SubmissionBuilderBase
uses gw.api.builder.PolicyLocationBuilder

@Export
class CPSubmissionBuilder extends SubmissionBuilderBase<CPSubmissionBuilder> {
  var lineBuilder : CommercialPropertyLineBuilder as CPLineBuilder = new CommercialPropertyLineBuilder()
  var cpLocationBuilder : CPLocationBuilder

  construct() {
    withProduct("CommercialProperty")
    cpLocationBuilder = new CPLocationBuilder().withBuilding(new CPBuildingBuilder())
    lineBuilder.withCPLocation(cpLocationBuilder)
    withPolicyLine(lineBuilder)
  }

  function withCPLocation(builder : CPLocationBuilder) : CPSubmissionBuilder{
    var policyLocationBuilder = new PolicyLocationBuilder()
    builder.withLocation(policyLocationBuilder)
    withPolicyLocation(policyLocationBuilder)
    lineBuilder.withCPLocation(builder)
    return this
  }

  function withCPLocationHavingPolicyLocation(builder : CPLocationBuilder) : CPSubmissionBuilder {
    lineBuilder.withCPLocation(builder)
    return this
  }

  function withAdditionalBuilding(cpBuildingBuilder : CPBuildingBuilder) : CPSubmissionBuilder{
    cpLocationBuilder.withBuilding(cpBuildingBuilder)
    return this
  }
}
