package gw.bizrules.provisioning.contexts

uses gw.bizrules.IRuleContext
uses gw.bizrules.IRuleContextDefinition
uses gw.bizrules.provisioning.RuleContextApplicabilityInfo
uses gw.policy.PolicyEvalContext

/**
 * UWRule specific {@link IRuleContextDefinition} additions
 */
@Export
interface UWRuleContextDefinition extends IRuleContextDefinition, RuleContextApplicabilityInfo {
  function generateContexts(evalContext: PolicyEvalContext): List<IRuleContext>
}