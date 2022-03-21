package gw.bizrules.provisioning.contexts

@Export
class HomeownersDwellingIterableUWContextDefinition extends HomeownersUWContextDefinition {
  public static final var PARAM_DWELLING: String = "hopDwelling"

  construct() {
    addIterativeSymbol(PARAM_DWELLING, HOPDwelling, \ec -> ec.Period.HOPLine.HOPDwellings)
  }

  override property get Key(): RuleContextDefinitionKey {
    return RuleContextDefinitionKey.TC_HOPPOLICYDWELLINGITERATIVE
  }
}