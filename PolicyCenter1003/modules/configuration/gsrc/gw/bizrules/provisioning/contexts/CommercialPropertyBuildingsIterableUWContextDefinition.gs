package gw.bizrules.provisioning.contexts

@Export
class CommercialPropertyBuildingsIterableUWContextDefinition extends CommercialPropertyUWContextDefinition {
  public static final var PARAM_BUILDING: String = "cpBuilding"

  construct() {
    addIterativeSymbol(PARAM_BUILDING, CPBuilding, \ec -> ec.Period.CPLine.CPLocations*.Buildings)
  }

  override property get Key(): RuleContextDefinitionKey {
    return TC_CPPOLICYBUILDINGITERATIVE
  }
}