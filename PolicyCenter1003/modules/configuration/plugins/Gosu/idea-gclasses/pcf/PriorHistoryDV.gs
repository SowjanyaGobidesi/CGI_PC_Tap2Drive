package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/submission/PriorHistoryDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PriorHistoryDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.PriorHistoryDV, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.PriorHistoryDV, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod})
  }
  
  
}