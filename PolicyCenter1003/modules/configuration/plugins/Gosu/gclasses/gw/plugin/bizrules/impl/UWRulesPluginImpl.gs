package gw.plugin.bizrules.impl

uses gw.api.database.Query
uses gw.api.locale.DisplayKey
uses gw.api.system.PCLoggerCategory
uses gw.api.util.CurrencyUtil
uses gw.bizrules.provisioning.AddUWIssueRuleAction
uses gw.bizrules.provisioning.contexts.GenericUWRuleContextDefinition
uses gw.pc.bizrules.UWRulesUtil
uses gw.pl.currency.MonetaryAmount
uses gw.pl.persistence.core.Bundle
uses gw.plugin.bizrules.UWRulesPlugin
uses gw.web.bizrules.UWRuleInteractiveWidgetSet

uses java.math.BigDecimal

@Export
class UWRulesPluginImpl implements UWRulesPlugin {

  override function createRuleForType(issueType: UWIssueType): UWRule {
    if (issueType.UWRule != null){
      throw new IllegalArgumentException(DisplayKey.get("BizRules.UWRulesWorkQueue.RuleExists", issueType.Code))
    }
    var rule: UWRule
    gw.transaction.Transaction.runWithNewBundle(\bundle -> {
      // perform potential changes to the issue type first
      if(issueType.ValueFormatterType == TC_CURRENCY) {
        updateToMonetaryAmount(bundle, issueType)
      }

      // create our rule
      rule = createBlankRule(bundle)

      // 'connect' the rule to our issue type
      rule.UWIssueType = issueType
      rule.Description = issueType.Description
      rule.Name = issueType.Name != null ? issueType.Name : issueType.Code
      rule.TriggeringPointKey = UWIssueType.mapper.toTriggeringPointKey(issueType.CheckingSet)

      // set the value parameter to no-op so it passes validation
      if(issueType.Comparator == TC_NONE) {
        var valueParameter = rule.OrderedRuleCommandDefinitions.single().RuleCommandParameters
            .singleWhere(\elt -> elt.ParameterName == AddUWIssueRuleAction.PARAM_VALUE)
        (valueParameter.Expression as GosuTemplateExpressionFragment).TemplateText = UWRuleInteractiveWidgetSet.NOOP_VALUE
      }
    })
    return rule
  }

  /**
   * Creates a blank rule to be attached to an unmapped issue type
   */
  private function createBlankRule(bundle: Bundle): UWRule {
    var ruleHead = UWRulesUtil.VersionController.createNewRule(bundle)
    var rule = ruleHead.HeadVersion.Rule as UWRule
    rule.ExternallyManaged = true
    rule.AvailableToRun = false
    rule.RuleContextDefinitionKey = TC_GENERICPOLICY
    rule.RuleCondition.Type = TC_ALWAYSTRUE

    AddUWIssueRuleAction.populateCommandDefinition(rule.appendRuleCommandDefinition())

    // Add policy evaluation context command parameter
    var commandParameter = rule.OrderedRuleCommandDefinitions.single()
        .RuleCommandParameters.singleWhere(\elt -> elt.ParameterName == AddUWIssueRuleAction.PARAM_EVAL_CONTEXT)
    var expressionFragment = new CodeExpressionFragment(bundle)
    expressionFragment.CodeText = GenericUWRuleContextDefinition.PARAM_POLICYEVALCONTEXT
    commandParameter.Expression = expressionFragment
    return rule
  }

  /**
   * converts an issue type from using Currency to using MonetaryAmount
   */
  private function updateToMonetaryAmount(bundle: Bundle, issueType: UWIssueType) {
    assert issueType.ValueFormatterType == TC_CURRENCY
    var comparator: ValueComparator
    switch (issueType.Comparator) {
      case TC_NUMERIC_LE:
        comparator = TC_MONETARY_LE
        break
      case TC_NUMERIC_GE:
        comparator = TC_MONETARY_GE
        break
      default:
        PCLoggerCategory.UWRULES.error("Incompatible comparator '{}' while mapping UWIssueType '{}'", issueType.Comparator, issueType.Code)
        return
    }
    issueType.Comparator = comparator
    issueType.ValueFormatterType = TC_MONETARYAMOUNT

    // convert the value of existing grants for this issue type into MonetaryAmount
    var grants = Query.make(UWAuthorityGrant)
        .compare(UWAuthorityGrant#ApproveAnyValue, Equals, false)
        .join(UWAuthorityGrant#IssueType)
        .compare(UWIssueType#Code, Equals, issueType.Code)
        .select()

    for(grant in grants) {
      grant = bundle.add(grant)
      var monetaryValue = new MonetaryAmount(new BigDecimal(grant.Value.trim()), CurrencyUtil.DefaultCurrency)
      var value = monetaryValue.toString()
      grant.Value = value
    }
  }
}
