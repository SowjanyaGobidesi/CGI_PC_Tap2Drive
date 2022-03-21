package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/cpp/policy/CPPLineReviewSummaryDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CPPLineReviewSummaryDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyLine :  PolicyLine) : void {
    __widgetOf(this, pcf.CPPLineReviewSummaryDV, SECTION_WIDGET_CLASS).setVariables(false, {$policyLine})
  }
  
  function refreshVariables ($policyLine :  PolicyLine) : void {
    __widgetOf(this, pcf.CPPLineReviewSummaryDV, SECTION_WIDGET_CLASS).setVariables(true, {$policyLine})
  }
  
  
}