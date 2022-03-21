package gw.bizrules.provisioning.contexts

@Export
class BusinessOwnersLocationsIterableUWContextDefinition extends BusinessOwnersUWContextDefinition {
  public static final var PARAM_LOCATION: String = "bopLocation"

  construct() {
    addIterativeSymbol(PARAM_LOCATION, BOPLocation, \ec -> ec.Period.BOPLine.BOPLocations)
  }

  override property get Key(): RuleContextDefinitionKey {
    return RuleContextDefinitionKey.TC_BOPPOLICYLOCATIONITERATIVE
  }
}