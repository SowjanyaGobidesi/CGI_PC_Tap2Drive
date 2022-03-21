package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/ba/policyfile/PolicyFile_VehiclesDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PolicyFile_VehiclesDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.PolicyFile_VehiclesDV, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.PolicyFile_VehiclesDV, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod})
  }
  
  
}