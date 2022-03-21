package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/contacts/PolicyContactRoleNameInputSet.company.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PolicyContactRoleNameInputSet_company extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyContactRole :  PolicyContactRole) : void {
    __widgetOf(this, pcf.PolicyContactRoleNameInputSet_company, SECTION_WIDGET_CLASS).setVariables(false, {$policyContactRole})
  }
  
  function refreshVariables ($policyContactRole :  PolicyContactRole) : void {
    __widgetOf(this, pcf.PolicyContactRoleNameInputSet_company, SECTION_WIDGET_CLASS).setVariables(true, {$policyContactRole})
  }
  
  
}