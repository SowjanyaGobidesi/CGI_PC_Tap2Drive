package gw.bizrules.provisioning.contexts

@Export
class HomeownersSchedPersPropertyItemUWContextDefinition extends HomeownersUWContextDefinition {
  public static final var PARAM_HAZARDS: String = "hopSchedPropItem"

  construct() {
    addIterativeSymbol(PARAM_HAZARDS, HOPLineScheduleCovItem, \ec ->  {
      if (ec.Period.HOPLine.HOPScheduledPersonalPropertyExists) {
        return ec.Period.HOPLine.HOPScheduledPersonalProperty.HOPLineScheduledItems
      } else {
        return {}
      }
    })
  }

  override property get Key(): RuleContextDefinitionKey {
    return RuleContextDefinitionKey.TC_HOPPOLICYSCHEDPERSPROPERTYITEMITERATIVE
  }
}