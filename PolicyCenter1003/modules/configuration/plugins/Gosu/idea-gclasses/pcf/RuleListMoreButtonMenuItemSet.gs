package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/bizrules/RuleListMoreButtonMenuItemSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RuleListMoreButtonMenuItemSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($navigationSupport :  gw.bizrules.pcf.BizRulesPageNavigationSupport, $checkedValuesAccessor :  gw.bizrules.pcf.RuleListPageHelper.IteratorCheckedValuesRuleVersionAccessor, $allQuery :  gw.api.database.Query<RuleVersion>, $ruleTypeReference :  gw.pl.persistence.type.EntityTypeReference<Rule>, $pageHelper :  gw.bizrules.pcf.RuleListPageHelper, $uiConfig :  Map<RuleActionKey, gw.bizrules.pcf.CommandDefinitionUIConfig>) : void {
    __widgetOf(this, pcf.RuleListMoreButtonMenuItemSet, SECTION_WIDGET_CLASS).setVariables(false, {$navigationSupport, $checkedValuesAccessor, $allQuery, $ruleTypeReference, $pageHelper, $uiConfig})
  }
  
  function refreshVariables ($navigationSupport :  gw.bizrules.pcf.BizRulesPageNavigationSupport, $checkedValuesAccessor :  gw.bizrules.pcf.RuleListPageHelper.IteratorCheckedValuesRuleVersionAccessor, $allQuery :  gw.api.database.Query<RuleVersion>, $ruleTypeReference :  gw.pl.persistence.type.EntityTypeReference<Rule>, $pageHelper :  gw.bizrules.pcf.RuleListPageHelper, $uiConfig :  Map<RuleActionKey, gw.bizrules.pcf.CommandDefinitionUIConfig>) : void {
    __widgetOf(this, pcf.RuleListMoreButtonMenuItemSet, SECTION_WIDGET_CLASS).setVariables(true, {$navigationSupport, $checkedValuesAccessor, $allQuery, $ruleTypeReference, $pageHelper, $uiConfig})
  }
  
  
}