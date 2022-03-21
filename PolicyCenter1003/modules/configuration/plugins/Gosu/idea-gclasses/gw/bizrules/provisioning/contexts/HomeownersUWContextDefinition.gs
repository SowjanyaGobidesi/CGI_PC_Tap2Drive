package gw.bizrules.provisioning.contexts


@Export
class HomeownersUWContextDefinition extends GenericUWRuleContextDefinition {
  public static final var PARAM_HOPLINE: String = "hopLine"

  construct() {
    addSymbol(PARAM_HOPLINE, HOPLine, \ec -> ec.Period.HOPLine)
  }

  override property get Key(): RuleContextDefinitionKey {
    return TC_HOPPOLICY
  }

  override function appliesToPolicyLines(lines: typekey.PolicyLine[]): boolean {
    return lines.HasElements and lines.allMatch(\line -> line == typekey.PolicyLine.TC_HOPLINE)
  }
}