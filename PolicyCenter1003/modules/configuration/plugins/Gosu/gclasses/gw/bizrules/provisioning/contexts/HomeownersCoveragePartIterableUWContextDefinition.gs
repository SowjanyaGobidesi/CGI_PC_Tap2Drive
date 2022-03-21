package gw.bizrules.provisioning.contexts

@Export
class HomeownersCoveragePartIterableUWContextDefinition extends HomeownersUWContextDefinition {
  public static final var PARAM_COVPART: String = "hopCovPart"

  construct() {
    addIterativeSymbol(PARAM_COVPART, HOPCoveragePart, \ec -> ec.Period.HOPLine.HOPCoverageParts)
  }

  override property get Key(): RuleContextDefinitionKey {
    return RuleContextDefinitionKey.TC_HOPPOLICYCOVPARTITERATIVE
  }
}