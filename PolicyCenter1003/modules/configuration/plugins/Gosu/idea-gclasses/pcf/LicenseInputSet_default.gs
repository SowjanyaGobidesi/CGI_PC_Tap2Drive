package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/contacts/LicenseInputSet.default.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class LicenseInputSet_default extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyContactRole :  PolicyContactRole, $address :  Address) : void {
    __widgetOf(this, pcf.LicenseInputSet_default, SECTION_WIDGET_CLASS).setVariables(false, {$policyContactRole, $address})
  }
  
  function refreshVariables ($policyContactRole :  PolicyContactRole, $address :  Address) : void {
    __widgetOf(this, pcf.LicenseInputSet_default, SECTION_WIDGET_CLASS).setVariables(true, {$policyContactRole, $address})
  }
  
  
}