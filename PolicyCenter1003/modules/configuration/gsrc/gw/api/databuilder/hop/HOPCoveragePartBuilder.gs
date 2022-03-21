package gw.api.databuilder.hop

uses gw.api.builder.CoverageBuilder
uses gw.api.builder.ExclusionBuilder
uses gw.api.builder.ModifierBuilder
uses gw.api.builder.PolicyConditionBuilder
uses gw.api.databuilder.DataBuilder

/**
 * Created by boreilly on 04/02/2016.
 *
 */
@Export
class HOPCoveragePartBuilder extends DataBuilder<HOPCoveragePart, HOPCoveragePartBuilder> {
  construct() {
    super(HOPCoveragePart)
  }

  function withConditionBuilder(conditionBuilder : PolicyConditionBuilder) : HOPCoveragePartBuilder {
    addArrayElement(HOPCoveragePart#Conditions.PropertyInfo, conditionBuilder)
    return this
  }

  function withHOPCoveragePartCovBuilder(coverageBuilder : CoverageBuilder) : HOPCoveragePartBuilder {
    addArrayElement(HOPCoveragePart#Coverages.PropertyInfo, coverageBuilder)
    return this
  }

  function withHOPCoveragePartExclBuilder(exclusionBuilder : ExclusionBuilder) : HOPCoveragePartBuilder {
    addArrayElement(HOPCoveragePart#Exclusions.PropertyInfo, exclusionBuilder)
    return this
  }

  function withHOPCoveragePartModBuilder(modBuilder : ModifierBuilder) : HOPCoveragePartBuilder {
    addArrayElement(HOPCoveragePart#HOPCoveragePartMods.PropertyInfo, modBuilder)
    return this
  }

  public function withCoveragePartType(value:typekey.CoveragePartType) : HOPCoveragePartBuilder {
    set(HOPCoveragePart#CoveragePartType, value)
    return this
  }

  function withHOPDwellingBuilder(dwellingBuilder : HOPDwellingBuilder) : HOPCoveragePartBuilder {
    addArrayElement(HOPCoveragePart#HOPDwellings.PropertyInfo, dwellingBuilder)
    return this
  }
}