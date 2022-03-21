package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/bizrules/DeployRulesToolbarButtonSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class DeployRulesToolbarButtonSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($navigationSupport :  gw.bizrules.pcf.BizRulesPageNavigationSupport, $checkedValuesAccessor :  gw.bizrules.pcf.RuleListPageHelper.IteratorCheckedValuesRuleVersionAccessor, $visibleRulesQuery :  gw.api.database.Query<RuleVersion>, $ruleTypeRef :  gw.pl.persistence.type.EntityTypeReference<Rule>, $pageHelper :  gw.bizrules.pcf.RuleListPageHelper) : void {
    __widgetOf(this, pcf.DeployRulesToolbarButtonSet, SECTION_WIDGET_CLASS).setVariables(false, {$navigationSupport, $checkedValuesAccessor, $visibleRulesQuery, $ruleTypeRef, $pageHelper})
  }
  
  function refreshVariables ($navigationSupport :  gw.bizrules.pcf.BizRulesPageNavigationSupport, $checkedValuesAccessor :  gw.bizrules.pcf.RuleListPageHelper.IteratorCheckedValuesRuleVersionAccessor, $visibleRulesQuery :  gw.api.database.Query<RuleVersion>, $ruleTypeRef :  gw.pl.persistence.type.EntityTypeReference<Rule>, $pageHelper :  gw.bizrules.pcf.RuleListPageHelper) : void {
    __widgetOf(this, pcf.DeployRulesToolbarButtonSet, SECTION_WIDGET_CLASS).setVariables(true, {$navigationSupport, $checkedValuesAccessor, $visibleRulesQuery, $ruleTypeRef, $pageHelper})
  }
  
  
}