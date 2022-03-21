package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policyfile/PolicyFile_LossHistoryDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PolicyFile_LossHistoryDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod, $policy :  Policy) : void {
    __widgetOf(this, pcf.PolicyFile_LossHistoryDV, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod, $policy})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod, $policy :  Policy) : void {
    __widgetOf(this, pcf.PolicyFile_LossHistoryDV, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod, $policy})
  }
  
  
}