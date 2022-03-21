package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/policyholds/PolicyHoldRuleLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PolicyHoldRuleLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyHold :  PolicyHold) : void {
    __widgetOf(this, pcf.PolicyHoldRuleLV, SECTION_WIDGET_CLASS).setVariables(false, {$policyHold})
  }
  
  function refreshVariables ($policyHold :  PolicyHold) : void {
    __widgetOf(this, pcf.PolicyHoldRuleLV, SECTION_WIDGET_CLASS).setVariables(true, {$policyHold})
  }
  
  
}