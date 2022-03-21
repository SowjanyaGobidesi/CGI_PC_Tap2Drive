package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/bizrules/RuleCommandDefinitionsListDetailView.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RuleCommandDefinitionsListDetailView extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($controller :  gw.bizrules.pcf.CommandDefinitionController, $ruleSubType :  typekey.Rule) : void {
    __widgetOf(this, pcf.RuleCommandDefinitionsListDetailView, SECTION_WIDGET_CLASS).setVariables(false, {$controller, $ruleSubType})
  }
  
  function refreshVariables ($controller :  gw.bizrules.pcf.CommandDefinitionController, $ruleSubType :  typekey.Rule) : void {
    __widgetOf(this, pcf.RuleCommandDefinitionsListDetailView, SECTION_WIDGET_CLASS).setVariables(true, {$controller, $ruleSubType})
  }
  
  
}