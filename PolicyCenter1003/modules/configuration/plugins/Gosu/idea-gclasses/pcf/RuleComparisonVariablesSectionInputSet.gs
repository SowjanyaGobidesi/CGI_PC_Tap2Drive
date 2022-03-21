package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/bizrules/RuleComparisonVariablesSectionInputSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RuleComparisonVariablesSectionInputSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($controller :  gw.bizrules.pcf.RuleVersionComparisonController) : void {
    __widgetOf(this, pcf.RuleComparisonVariablesSectionInputSet, SECTION_WIDGET_CLASS).setVariables(false, {$controller})
  }
  
  function refreshVariables ($controller :  gw.bizrules.pcf.RuleVersionComparisonController) : void {
    __widgetOf(this, pcf.RuleComparisonVariablesSectionInputSet, SECTION_WIDGET_CLASS).setVariables(true, {$controller})
  }
  
  
}