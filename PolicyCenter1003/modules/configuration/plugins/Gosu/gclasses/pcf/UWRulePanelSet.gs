package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/bizrules/UWRulePanelSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class UWRulePanelSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($version :  RuleVersion, $importingVersion :  boolean, $controller :  gw.bizrules.pcf.RulePageController) : void {
    __widgetOf(this, pcf.UWRulePanelSet, SECTION_WIDGET_CLASS).setVariables(false, {$version, $importingVersion, $controller})
  }
  
  function refreshVariables ($version :  RuleVersion, $importingVersion :  boolean, $controller :  gw.bizrules.pcf.RulePageController) : void {
    __widgetOf(this, pcf.UWRulePanelSet, SECTION_WIDGET_CLASS).setVariables(true, {$version, $importingVersion, $controller})
  }
  
  
}