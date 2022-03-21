package gw.bizrules.provisioning.contexts

uses gw.policy.PolicyEvalContext

@Export
class GenericUWRuleContextDefinition extends AbstractUWRuleContextDefinition {
  public final static var PARAM_POLICYEVALCONTEXT: String = "policyEvalContext"

  construct() {
    addSymbol(PARAM_POLICYEVALCONTEXT, PolicyEvalContext, \ec -> ec)
  }

  override property get Key(): RuleContextDefinitionKey {
    return TC_GENERICPOLICY
  }

  override function appliesToPolicyLines(lines: typekey.PolicyLine[]): boolean {
    return true
  }
}