package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policyfile/PolicyFile_Quote_SummaryDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PolicyFile_Quote_SummaryDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.PolicyFile_Quote_SummaryDV, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.PolicyFile_Quote_SummaryDV, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod})
  }
  
  
}