package gw.bizrules.provisioning.contexts

@Export
class CommercialPropertyLocationsIterableUWContextDefinition extends CommercialPropertyUWContextDefinition {
  public static final var PARAM_LOCATION: String = "cpLocation"

  construct() {
    addIterativeSymbol(PARAM_LOCATION, CPLocation, \ec -> ec.Period.CPLine.CPLocations)
  }

  override property get Key(): RuleContextDefinitionKey {
    return TC_CPPOLICYLOCATIONITERATIVE
  }
}