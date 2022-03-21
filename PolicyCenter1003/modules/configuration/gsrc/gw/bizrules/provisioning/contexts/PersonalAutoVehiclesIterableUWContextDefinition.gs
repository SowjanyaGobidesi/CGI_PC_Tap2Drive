package gw.bizrules.provisioning.contexts

@Export
class PersonalAutoVehiclesIterableUWContextDefinition extends PersonalAutoUWContextDefinition {
  public static final var PARAM_VEHICLE: String = "paVehicle"

  construct() {
    addIterativeSymbol(PARAM_VEHICLE, PersonalVehicle, \ec -> ec.Period.PersonalAutoLine.Vehicles)
  }

  override property get Key(): RuleContextDefinitionKey {
    return TC_PAPOLICYVEHICLEITERATIVE
  }
}