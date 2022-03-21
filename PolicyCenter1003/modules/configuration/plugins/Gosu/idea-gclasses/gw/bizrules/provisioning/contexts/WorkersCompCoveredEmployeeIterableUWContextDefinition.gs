package gw.bizrules.provisioning.contexts

@Export
class WorkersCompCoveredEmployeeIterableUWContextDefinition extends WorkersCompUWContextDefinition {
  public static final var PARAM_COVEREDEMPLOYEE: String = "wcCoveredEmployee"

  construct() {
    addIterativeSymbol(PARAM_COVEREDEMPLOYEE, WCCoveredEmployee, \ec -> ec.Period.WorkersCompLine.WCCoveredEmployees)
  }

  override property get Key(): RuleContextDefinitionKey {
    return TC_WCPOLICYCOVEREDEMPLOYEEITERATIVE
  }
}