package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/bizrules/CreateRuleToolbarButtonSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CreateRuleToolbarButtonSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($navigationSupport :  gw.bizrules.pcf.BizRulesPageNavigationSupport, $checkedValuesAccessor :  gw.bizrules.pcf.RuleListPageHelper.IteratorCheckedValuesRuleVersionAccessor, $ruleTypeRef :  gw.pl.persistence.type.EntityTypeReference<Rule>) : void {
    __widgetOf(this, pcf.CreateRuleToolbarButtonSet, SECTION_WIDGET_CLASS).setVariables(false, {$navigationSupport, $checkedValuesAccessor, $ruleTypeRef})
  }
  
  function refreshVariables ($navigationSupport :  gw.bizrules.pcf.BizRulesPageNavigationSupport, $checkedValuesAccessor :  gw.bizrules.pcf.RuleListPageHelper.IteratorCheckedValuesRuleVersionAccessor, $ruleTypeRef :  gw.pl.persistence.type.EntityTypeReference<Rule>) : void {
    __widgetOf(this, pcf.CreateRuleToolbarButtonSet, SECTION_WIDGET_CLASS).setVariables(true, {$navigationSupport, $checkedValuesAccessor, $ruleTypeRef})
  }
  
  
}