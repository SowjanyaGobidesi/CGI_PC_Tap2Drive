package gw.api.databuilder.hop

uses gw.api.builder.CoverageBuilder
uses gw.api.builder.ExclusionBuilder
uses gw.api.builder.PolicyConditionBuilder
uses gw.api.builder.PolicyLineBuilder
uses productmodel.HOPLine

@Export
class HOPLineBuilder extends PolicyLineBuilder<HOPLine, HOPLineBuilder> {

  private var _createClauses = false

  construct() {
    super(HOPLine)
    constructWithPopulator()
  }

  construct(lineModifiers: HOPLineModBuilder[]) {
    super(HOPLine)
    constructWithPopulator()
    lineModifiers.each(\lineModifier -> withHOPLineModBuilder(lineModifier))
  }

  private function constructWithPopulator() {
    addPopulator(Integer.MAX_VALUE, \line -> {
      if (_createClauses) {
        line.createCoverages()
        line.createConditions()
        line.createExclusions()
      }
    })
  }

  function createLineLevelClauses(): HOPLineBuilder {
    _createClauses = true
    return this
  }

  function withCoverageBuilder(coverageBuilder: CoverageBuilder): HOPLineBuilder {
    addArrayElement(HOPLine#HOPLineCoverages.PropertyInfo, coverageBuilder)
    return this
  }

  function withHOPCoveragePartBuilder(hopCoveragePartBuilder: HOPCoveragePartBuilder): HOPLineBuilder {
    addArrayElement(HOPLine#HOPCoverageParts.PropertyInfo, hopCoveragePartBuilder)
    return this
  }

  function withHOPLineExclusionBuilder(exclusionBuilder: ExclusionBuilder): HOPLineBuilder {
    addArrayElement(HOPLine#HOPLineExclusions.PropertyInfo, exclusionBuilder)
    return this
  }

  function withHOPLineConditionBuilder(conditionBuilder: PolicyConditionBuilder): HOPLineBuilder {
    addArrayElement(HOPLine#HOPLineConditions.PropertyInfo, conditionBuilder)
    return this
  }

  function withHOPLineModBuilder(modBuilder: HOPLineModBuilder): HOPLineBuilder {
    addArrayElement(HOPLine#HOPLineModifiers.PropertyInfo, modBuilder)
    return this
  }
}