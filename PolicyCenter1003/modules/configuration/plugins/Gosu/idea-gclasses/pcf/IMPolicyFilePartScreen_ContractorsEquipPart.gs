package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/cpp/policyfile/IMPolicyFilePartScreen.ContractorsEquipPart.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class IMPolicyFilePartScreen_ContractorsEquipPart extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.IMPolicyFilePartScreen_ContractorsEquipPart, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.IMPolicyFilePartScreen_ContractorsEquipPart, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod})
  }
  
  
}