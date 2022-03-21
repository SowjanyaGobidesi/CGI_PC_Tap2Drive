package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/bizrules/LocalizedCommandParameterInputSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class LocalizedCommandParameterInputSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($commandDefinition :  gw.bizrules.pcf.RuleCommandDefinitionHolder, $parameter :  gw.bizrules.provisioning.LocalizedRuleActionParameter) : void {
    __widgetOf(this, pcf.LocalizedCommandParameterInputSet, SECTION_WIDGET_CLASS).setVariables(false, {$commandDefinition, $parameter})
  }
  
  function refreshVariables ($commandDefinition :  gw.bizrules.pcf.RuleCommandDefinitionHolder, $parameter :  gw.bizrules.provisioning.LocalizedRuleActionParameter) : void {
    __widgetOf(this, pcf.LocalizedCommandParameterInputSet, SECTION_WIDGET_CLASS).setVariables(true, {$commandDefinition, $parameter})
  }
  
  
}