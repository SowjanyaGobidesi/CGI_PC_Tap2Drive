package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policyfile/PolicyFile_PriorHistoryDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PolicyFile_PriorHistoryDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod, $policy :  Policy) : void {
    __widgetOf(this, pcf.PolicyFile_PriorHistoryDV, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod, $policy})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod, $policy :  Policy) : void {
    __widgetOf(this, pcf.PolicyFile_PriorHistoryDV, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod, $policy})
  }
  
  
}