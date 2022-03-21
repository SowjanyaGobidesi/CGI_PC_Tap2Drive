package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/bizrules/RuleVariablesPanelSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RuleVariablesPanelSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($controller :  gw.bizrules.pcf.RuleVariableController) : void {
    __widgetOf(this, pcf.RuleVariablesPanelSet, SECTION_WIDGET_CLASS).setVariables(false, {$controller})
  }
  
  function refreshVariables ($controller :  gw.bizrules.pcf.RuleVariableController) : void {
    __widgetOf(this, pcf.RuleVariablesPanelSet, SECTION_WIDGET_CLASS).setVariables(true, {$controller})
  }
  
  
}