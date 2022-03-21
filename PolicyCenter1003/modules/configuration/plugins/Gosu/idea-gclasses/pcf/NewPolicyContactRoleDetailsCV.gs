package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/contacts/NewPolicyContactRoleDetailsCV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class NewPolicyContactRoleDetailsCV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyContactRole :  PolicyContactRole, $openForEditOverride :  boolean) : void {
    __widgetOf(this, pcf.NewPolicyContactRoleDetailsCV, SECTION_WIDGET_CLASS).setVariables(false, {$policyContactRole, $openForEditOverride})
  }
  
  function refreshVariables ($policyContactRole :  PolicyContactRole, $openForEditOverride :  boolean) : void {
    __widgetOf(this, pcf.NewPolicyContactRoleDetailsCV, SECTION_WIDGET_CLASS).setVariables(true, {$policyContactRole, $openForEditOverride})
  }
  
  
}