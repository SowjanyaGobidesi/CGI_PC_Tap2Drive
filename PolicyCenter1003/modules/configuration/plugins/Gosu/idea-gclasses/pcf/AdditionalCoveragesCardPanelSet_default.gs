package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/common/AdditionalCoveragesCardPanelSet.default.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AdditionalCoveragesCardPanelSet_default extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($polLocation :  PolicyLocation, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.AdditionalCoveragesCardPanelSet_default, SECTION_WIDGET_CLASS).setVariables(false, {$polLocation, $openForEdit})
  }
  
  function refreshVariables ($polLocation :  PolicyLocation, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.AdditionalCoveragesCardPanelSet_default, SECTION_WIDGET_CLASS).setVariables(true, {$polLocation, $openForEdit})
  }
  
  
}