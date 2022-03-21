package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/contacts/PolicyContactRoleDetailsCV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PolicyContactRoleDetailsCV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyContactRole :  PolicyContactRole, $openForEditOverride :  boolean) : void {
    __widgetOf(this, pcf.PolicyContactRoleDetailsCV, SECTION_WIDGET_CLASS).setVariables(false, {$policyContactRole, $openForEditOverride})
  }
  
  function refreshVariables ($policyContactRole :  PolicyContactRole, $openForEditOverride :  boolean) : void {
    __widgetOf(this, pcf.PolicyContactRoleDetailsCV, SECTION_WIDGET_CLASS).setVariables(true, {$policyContactRole, $openForEditOverride})
  }
  
  
}