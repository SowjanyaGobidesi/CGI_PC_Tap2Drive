package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/reinsurance/TreatiesLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class TreatiesLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($program :  RIProgram, $isPerRisk :  boolean) : void {
    __widgetOf(this, pcf.TreatiesLV, SECTION_WIDGET_CLASS).setVariables(false, {$program, $isPerRisk})
  }
  
  function refreshVariables ($program :  RIProgram, $isPerRisk :  boolean) : void {
    __widgetOf(this, pcf.TreatiesLV, SECTION_WIDGET_CLASS).setVariables(true, {$program, $isPerRisk})
  }
  
  
}