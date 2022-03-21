package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/contacts/PolicyContactDetailsDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PolicyContactDetailsDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyContactRole :  PolicyContactRole, $openForEditOverride :  boolean) : void {
    __widgetOf(this, pcf.PolicyContactDetailsDV, SECTION_WIDGET_CLASS).setVariables(false, {$policyContactRole, $openForEditOverride})
  }
  
  function refreshVariables ($policyContactRole :  PolicyContactRole, $openForEditOverride :  boolean) : void {
    __widgetOf(this, pcf.PolicyContactDetailsDV, SECTION_WIDGET_CLASS).setVariables(true, {$policyContactRole, $openForEditOverride})
  }
  
  
}