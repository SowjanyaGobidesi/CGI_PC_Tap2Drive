package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/im/policy/IMCoveragePartSelectionDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class IMCoveragePartSelectionDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod, $openForEdit :  boolean, $imLine :  InlandMarineLine) : void {
    __widgetOf(this, pcf.IMCoveragePartSelectionDV, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod, $openForEdit, $imLine})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod, $openForEdit :  boolean, $imLine :  InlandMarineLine) : void {
    __widgetOf(this, pcf.IMCoveragePartSelectionDV, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod, $openForEdit, $imLine})
  }
  
  
}