package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/hop/job/CoveragePartSelectionDV.HOPHomeowners.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CoveragePartSelectionDV_HOPHomeowners extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.CoveragePartSelectionDV_HOPHomeowners, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.CoveragePartSelectionDV_HOPHomeowners, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod})
  }
  
  
}