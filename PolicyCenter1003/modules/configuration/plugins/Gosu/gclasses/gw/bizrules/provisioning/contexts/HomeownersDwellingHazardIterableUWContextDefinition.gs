package gw.bizrules.provisioning.contexts

@Export
class HomeownersDwellingHazardIterableUWContextDefinition extends HomeownersUWContextDefinition {
  public static final var PARAM_HAZARDS: String = "hopDwellHazard"

  construct() {
    addIterativeSymbol(PARAM_HAZARDS, DwellingHazard, \ec -> ec.Period.HOPLine.HOPDwellings*.DwellingHazards)
  }

  override property get Key(): RuleContextDefinitionKey {
    return RuleContextDefinitionKey.TC_HOPPOLICYDWELLINGHAZARDITERATIVE
  }
}