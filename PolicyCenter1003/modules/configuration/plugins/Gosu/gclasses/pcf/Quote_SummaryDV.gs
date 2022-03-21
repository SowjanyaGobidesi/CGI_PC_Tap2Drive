package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/common/Quote_SummaryDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class Quote_SummaryDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.Quote_SummaryDV, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.Quote_SummaryDV, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod})
  }
  
  
}