package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/policyholds/PolicyHoldsPanelSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PolicyHoldsPanelSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyHolds :  gw.api.database.IQueryBeanResult<PolicyHold>, $showTimeStamps :  boolean) : void {
    __widgetOf(this, pcf.PolicyHoldsPanelSet, SECTION_WIDGET_CLASS).setVariables(false, {$policyHolds, $showTimeStamps})
  }
  
  function refreshVariables ($policyHolds :  gw.api.database.IQueryBeanResult<PolicyHold>, $showTimeStamps :  boolean) : void {
    __widgetOf(this, pcf.PolicyHoldsPanelSet, SECTION_WIDGET_CLASS).setVariables(true, {$policyHolds, $showTimeStamps})
  }
  
  
}