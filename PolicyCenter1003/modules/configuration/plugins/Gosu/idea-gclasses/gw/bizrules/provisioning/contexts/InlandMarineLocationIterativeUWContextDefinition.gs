package gw.bizrules.provisioning.contexts

@Export
class InlandMarineLocationIterativeUWContextDefinition extends InlandMarineUWContextDefinition {
  public static final var PARAM_IMLOCATION: String = "imLocation"

  construct() {
    addIterativeSymbol(PARAM_IMLOCATION, IMLocation, \ec -> ec.Period.IMLine.IMLocations)
  }

  override property get Key(): RuleContextDefinitionKey {
    return TC_IMPOLICYLOCATIONITERATIVE
  }
}