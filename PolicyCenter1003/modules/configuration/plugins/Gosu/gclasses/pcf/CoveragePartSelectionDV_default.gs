package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/submission/CoveragePartSelectionDV.default.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CoveragePartSelectionDV_default extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.CoveragePartSelectionDV_default, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.CoveragePartSelectionDV_default, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod})
  }
  
  
}