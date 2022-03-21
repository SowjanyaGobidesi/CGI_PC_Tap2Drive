package gw.bizrules.provisioning.contexts

@Export
class BusinessOwnersBuildingsIterableUWContextDefinition extends BusinessOwnersUWContextDefinition {
  public static final var PARAM_BUILDING: String = "bopBuilding"

  construct() {
    addIterativeSymbol(PARAM_BUILDING, BOPBuilding, \ec -> ec.Period.BOPLine.BOPLocations*.Buildings)
  }

  override property get Key(): RuleContextDefinitionKey {
    return TC_BOPPOLICYBUILDINGITERATIVE
  }
}