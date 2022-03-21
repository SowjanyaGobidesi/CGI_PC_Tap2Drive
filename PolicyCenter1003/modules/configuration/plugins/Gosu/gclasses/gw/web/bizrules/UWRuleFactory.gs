package gw.web.bizrules

uses com.google.common.base.Optional
uses gw.api.locale.DisplayKey
uses gw.api.util.CurrencyUtil
uses gw.bizrules.pcf.AbstractRuleFactory
uses gw.bizrules.provisioning.AddUWIssueRuleAction
uses gw.pc.bizrules.UWRulesUtil

@Export
class UWRuleFactory extends AbstractRuleFactory<UWRule> {

  construct() {
    super(UWRulesUtil.VersionController, UWRule.TYPE);
  }

  protected override function initNewRule(rule: UWRule) {
    // create the corresponding UWIssueType
    var issueType = new UWIssueType()
    issueType.BlockingPoint = TC_NONBLOCKING
    issueType.DefaultDurationType = TC_RESCINDED
    issueType.DefaultApprovalBlockingPoint = TC_NONBLOCKING
    issueType.Comparator = TC_NONE
    issueType.DefaultEditBeforeBind = true
    issueType.ValueFormatterType = TC_UNFORMATTED
    issueType.DefaultValueOffsetCurrency = CurrencyUtil.DefaultCurrency
    rule.TriggeringPointKey = TC_PREQUOTE
    rule.RuleContextDefinitionKey = TC_GENERICPOLICY
    rule.UWIssueType = issueType
    rule.ExternallyManaged = false

    rule.RuleCondition.Type = TC_ALLAND
    var line = rule.RuleCondition.createLineAndInsertAt(0)
    line.LeftOperand = new CodeExpressionFragment()
    line.RightOperand = new CodeExpressionFragment()

    var commandDefinition = rule.appendRuleCommandDefinition()
    commandDefinition.RuleActionKey = TC_ADDUWISSUE
    AddUWIssueRuleAction.populateCommandDefinition(commandDefinition)
    var param = rule.OrderedRuleCommandDefinitions.single().RuleCommandParameters
        .singleWhere(\elt -> elt.ParameterName == AddUWIssueRuleAction.PARAM_VALUE)
    var exprFragment = new GosuTemplateExpressionFragment()
    exprFragment.TemplateText = UWRuleInteractiveWidgetSet.NOOP_VALUE
    param.Expression = exprFragment
  }

  // Override to prefix the UW issue code in the way the rule name was prefixed
  override function createRuleHead(ruleToClone: Optional<UWRule>): RuleHead {
    var head = super.createRuleHead(ruleToClone)
    if (ruleToClone.isPresent()) {
      var uwIssueType = (head.HeadVersion.Rule as UWRule).UWIssueType
      uwIssueType.Code = DisplayKey.get("BizRules.RuleDetailsPage.ClonedRuleName", uwIssueType.Code)
    }
    return head
  }
}