package gw.bizrules.provisioning.contexts

@Export
class PersonalAutoDriversIterableUWContextDefinition extends PersonalAutoUWContextDefinition {
  public static final var PARAM_DRIVER: String = "paDriver"

  construct() {
    addIterativeSymbol(PARAM_DRIVER, PolicyDriver, \ec -> ec.Period.PersonalAutoLine.PolicyDrivers)
  }

  override property get Key(): RuleContextDefinitionKey {
    return TC_PAPOLICYDRIVERITERATIVE
  }
}