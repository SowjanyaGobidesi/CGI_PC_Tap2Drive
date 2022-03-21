package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/hop/policy/HOPAdditionalCoveragesPanelSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class HOPAdditionalCoveragesPanelSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($hopLine :  productmodel.HOPLine, $dwelling :  HOPDwelling, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.HOPAdditionalCoveragesPanelSet, SECTION_WIDGET_CLASS).setVariables(false, {$hopLine, $dwelling, $openForEdit})
  }
  
  function refreshVariables ($hopLine :  productmodel.HOPLine, $dwelling :  HOPDwelling, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.HOPAdditionalCoveragesPanelSet, SECTION_WIDGET_CLASS).setVariables(true, {$hopLine, $dwelling, $openForEdit})
  }
  
  
}