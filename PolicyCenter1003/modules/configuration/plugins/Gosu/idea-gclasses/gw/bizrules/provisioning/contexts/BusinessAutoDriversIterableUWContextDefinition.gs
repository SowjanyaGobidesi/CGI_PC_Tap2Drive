package gw.bizrules.provisioning.contexts

@Export
class BusinessAutoDriversIterableUWContextDefinition extends BusinessAutoUWContextDefinition {

  public static final var PARAM_DRIVER: String = "baDriver"

  construct() { addIterativeSymbol(PARAM_DRIVER, CommercialDriver, \ec -> ec.Period.BusinessAutoLine.Drivers) }

  override property get Key(): RuleContextDefinitionKey {
    return TC_BAPOLICYDRIVERITERATIVE
  }
}