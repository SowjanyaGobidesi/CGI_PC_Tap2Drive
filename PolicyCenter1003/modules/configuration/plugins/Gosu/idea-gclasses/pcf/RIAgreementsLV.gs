package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/reinsurance/RIAgreementsLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RIAgreementsLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($ririsk :  RIRisk, $isPerRisk :  boolean) : void {
    __widgetOf(this, pcf.RIAgreementsLV, SECTION_WIDGET_CLASS).setVariables(false, {$ririsk, $isPerRisk})
  }
  
  function refreshVariables ($ririsk :  RIRisk, $isPerRisk :  boolean) : void {
    __widgetOf(this, pcf.RIAgreementsLV, SECTION_WIDGET_CLASS).setVariables(true, {$ririsk, $isPerRisk})
  }
  
  
}