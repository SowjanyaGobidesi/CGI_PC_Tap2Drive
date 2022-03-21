package gw.bizrules.provisioning.contexts

@Export
class BusinessAutoVehiclesIterableUWContextDefinition extends BusinessAutoUWContextDefinition {

  public static final var PARAM_VEHICLE: String = "baVehicle"

  construct() { addIterativeSymbol(PARAM_VEHICLE, BusinessVehicle, \ec -> ec.Period.BusinessAutoLine.Vehicles) }

  override property get Key(): RuleContextDefinitionKey { return TC_BAPOLICYVEHICLEITERATIVE }
}
