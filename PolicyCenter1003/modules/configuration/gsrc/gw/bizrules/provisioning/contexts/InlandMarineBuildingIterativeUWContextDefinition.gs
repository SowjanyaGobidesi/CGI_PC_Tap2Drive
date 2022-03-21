package gw.bizrules.provisioning.contexts

@Export
class InlandMarineBuildingIterativeUWContextDefinition extends InlandMarineUWContextDefinition {
  public static final var PARAM_IMBUILDING: String = "imBuilding"

  construct() {
    addIterativeSymbol(PARAM_IMBUILDING, IMBuilding, \ec -> ec.Period.IMLine.IMBuildings)
  }

  override property get Key(): RuleContextDefinitionKey {
    return TC_IMPOLICYBUILDINGITERATIVE
  }
}