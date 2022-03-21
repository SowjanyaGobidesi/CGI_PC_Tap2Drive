package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/contacts/PolicyContactRolePanelSet.default.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PolicyContactRolePanelSet_default extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyContactRole :  PolicyContactRole) : void {
    __widgetOf(this, pcf.PolicyContactRolePanelSet_default, SECTION_WIDGET_CLASS).setVariables(false, {$policyContactRole})
  }
  
  function refreshVariables ($policyContactRole :  PolicyContactRole) : void {
    __widgetOf(this, pcf.PolicyContactRolePanelSet_default, SECTION_WIDGET_CLASS).setVariables(true, {$policyContactRole})
  }
  
  
}