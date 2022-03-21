package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/bizrules/UWRuleComparisonActionsInputSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class UWRuleComparisonActionsInputSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($controller :  gw.bizrules.pcf.RuleVersionComparisonController) : void {
    __widgetOf(this, pcf.UWRuleComparisonActionsInputSet, SECTION_WIDGET_CLASS).setVariables(false, {$controller})
  }
  
  function refreshVariables ($controller :  gw.bizrules.pcf.RuleVersionComparisonController) : void {
    __widgetOf(this, pcf.UWRuleComparisonActionsInputSet, SECTION_WIDGET_CLASS).setVariables(true, {$controller})
  }
  
  
}