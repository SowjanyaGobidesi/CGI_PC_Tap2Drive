package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/bizrules/UWIssueCommandDefinitionDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class UWIssueCommandDefinitionDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($controller :  gw.bizrules.pcf.RulePageController, $helper :  gw.web.bizrules.UWRulePanelSetHelper, $interactiveWidgets :  gw.web.bizrules.UWRuleInteractiveWidgetSet) : void {
    __widgetOf(this, pcf.UWIssueCommandDefinitionDV, SECTION_WIDGET_CLASS).setVariables(false, {$controller, $helper, $interactiveWidgets})
  }
  
  function refreshVariables ($controller :  gw.bizrules.pcf.RulePageController, $helper :  gw.web.bizrules.UWRulePanelSetHelper, $interactiveWidgets :  gw.web.bizrules.UWRuleInteractiveWidgetSet) : void {
    __widgetOf(this, pcf.UWIssueCommandDefinitionDV, SECTION_WIDGET_CLASS).setVariables(true, {$controller, $helper, $interactiveWidgets})
  }
  
  
}