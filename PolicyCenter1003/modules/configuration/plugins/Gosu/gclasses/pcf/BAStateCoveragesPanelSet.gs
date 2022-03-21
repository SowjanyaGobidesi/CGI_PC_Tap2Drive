package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/ba/policy/BAStateCoveragesPanelSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class BAStateCoveragesPanelSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($selectedState :  BAJurisdiction, $baLine :  BusinessAutoLine, $openForEdit :  Boolean) : void {
    __widgetOf(this, pcf.BAStateCoveragesPanelSet, SECTION_WIDGET_CLASS).setVariables(false, {$selectedState, $baLine, $openForEdit})
  }
  
  function refreshVariables ($selectedState :  BAJurisdiction, $baLine :  BusinessAutoLine, $openForEdit :  Boolean) : void {
    __widgetOf(this, pcf.BAStateCoveragesPanelSet, SECTION_WIDGET_CLASS).setVariables(true, {$selectedState, $baLine, $openForEdit})
  }
  
  
}