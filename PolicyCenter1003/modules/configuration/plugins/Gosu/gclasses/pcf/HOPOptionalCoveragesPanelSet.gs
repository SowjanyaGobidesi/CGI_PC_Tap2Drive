package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/hop/policy/HOPOptionalCoveragesPanelSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class HOPOptionalCoveragesPanelSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($hopLine :  productmodel.HOPLine, $dwelling :  HOPDwelling, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.HOPOptionalCoveragesPanelSet, SECTION_WIDGET_CLASS).setVariables(false, {$hopLine, $dwelling, $openForEdit})
  }
  
  function refreshVariables ($hopLine :  productmodel.HOPLine, $dwelling :  HOPDwelling, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.HOPOptionalCoveragesPanelSet, SECTION_WIDGET_CLASS).setVariables(true, {$hopLine, $dwelling, $openForEdit})
  }
  
  
}