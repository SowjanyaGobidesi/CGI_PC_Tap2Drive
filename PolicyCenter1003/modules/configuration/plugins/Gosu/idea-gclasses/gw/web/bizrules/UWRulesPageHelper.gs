package gw.web.bizrules

uses gw.api.database.IQueryBeanResult
uses gw.api.database.Query
uses gw.api.locale.DisplayKey
uses gw.bizrules.PCBizRulesNavigationSupport
uses gw.bizrules.management.RuleQueryFactory
uses gw.bizrules.pcf.CommandDefinitionUIConfig
uses gw.bizrules.pcf.RuleListPageHelper
uses gw.pc.bizrules.UWRulesUtil

@Export
class UWRulesPageHelper extends RuleListPageHelper<UWRule> {
  final var _defaultFactory: RuleQueryFactory<UWRule>
  final var _navigationSupport: PCBizRulesNavigationSupport as readonly NavigationSupport

  construct(navigationSupport: PCBizRulesNavigationSupport) {
    super(UWRule.TYPE)
    _navigationSupport = navigationSupport
    _defaultFactory = createAllRulesQueryFactory()
  }

  function getHead(version: RuleVersion): RuleHead {
    return UWRulesUtil.VersionController.getRuleHead(version)
  }

  static property get UIConfigs(): Map<RuleActionKey, CommandDefinitionUIConfig> {
    return {RuleActionKey.TC_ADDUWISSUE->new AddUWIssueCommandDefinitionUIConfig()}
  }

  function join(items: String[]): String {
    return items.IsEmpty ? DisplayKey.get("Web.BizRules.UWRules.All") : items.sort().join("\n")
  }

  function queryRules(criteria : UWRuleFilterCriteria): Query<UWRule> {
    var factory = criteria.Status
    return factory?.createRuleQuery(criteria)
  }

  function queryRuleVersions(criteria : UWRuleFilterCriteria): Query<RuleVersion> {
    var factory = criteria.Status
    return factory?.createVersionQuery(criteria)
  }

  function queryRuleVersionsWithResults(criteria: UWRuleFilterCriteria): IQueryBeanResult<RuleVersion> {
    return _defaultFactory?.createVersionQuery(criteria).select()
  }

  function getValidationStatusDisplay(criteria: UWRuleFilterCriteria): String {
    var countTotal = queryRuleVersions(criteria).select().getCount()
    var countInvalid = 0
    if (criteria.Availability != TC_VALID) {
      var invalidCountCriteria = criteria.copy(this)
      invalidCountCriteria.Availability = TC_INVALID
      countInvalid = queryRuleVersions(invalidCountCriteria).select().getCount()
    } else if (criteria.Availability == TC_INVALID) {
      countInvalid = countTotal
    }
    return DisplayKey.get("BizRules.ValidateAll.Count", countTotal, countInvalid);
  }
}
