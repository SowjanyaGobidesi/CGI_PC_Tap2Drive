package gw.api.databuilder.hop

uses gw.api.builder.CoverageBuilder
uses gw.api.builder.ExclusionBuilder
uses gw.api.builder.PolicyConditionBuilder
uses gw.api.builder.SubmissionBuilderBase

@Export
class HOPSubmissionBuilder extends SubmissionBuilderBase<HOPSubmissionBuilder> {

  var _lineBuilder : HOPLineBuilder

  construct() {
    _lineBuilder = new HOPLineBuilder()
    withProduct("HOPHomeowners")
    withPolicyLine(_lineBuilder)
  }

  construct(lineModifiers: HOPLineModBuilder[]) {
    withProduct("HOPHomeowners")
    _lineBuilder = new HOPLineBuilder(lineModifiers)
    withPolicyLine(_lineBuilder)
  }

  function withCoverageBuilder(coverageBuilder: CoverageBuilder): HOPSubmissionBuilder {
    _lineBuilder.withCoverageBuilder(coverageBuilder)
    return this
  }

  function withHOPCoveragePartBuilder(hopCoveragePartBuilder: HOPCoveragePartBuilder): HOPSubmissionBuilder {
    _lineBuilder.withHOPCoveragePartBuilder(hopCoveragePartBuilder)
    return this
  }

  function withConditionBuilder(condtionBuilder: PolicyConditionBuilder): HOPSubmissionBuilder {
    _lineBuilder.withHOPLineConditionBuilder(condtionBuilder)
    return this
  }

  function withExclusionBuilder(exclusionBuilder: ExclusionBuilder): HOPSubmissionBuilder {
    _lineBuilder.withHOPLineExclusionBuilder(exclusionBuilder)
    return this
  }
}