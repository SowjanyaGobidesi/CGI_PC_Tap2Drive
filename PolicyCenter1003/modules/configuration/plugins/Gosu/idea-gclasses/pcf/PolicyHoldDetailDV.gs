package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/policyholds/PolicyHoldDetailDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PolicyHoldDetailDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyHold :  PolicyHold, $showTimeStamps :  boolean) : void {
    __widgetOf(this, pcf.PolicyHoldDetailDV, SECTION_WIDGET_CLASS).setVariables(false, {$policyHold, $showTimeStamps})
  }
  
  function refreshVariables ($policyHold :  PolicyHold, $showTimeStamps :  boolean) : void {
    __widgetOf(this, pcf.PolicyHoldDetailDV, SECTION_WIDGET_CLASS).setVariables(true, {$policyHold, $showTimeStamps})
  }
  
  
}