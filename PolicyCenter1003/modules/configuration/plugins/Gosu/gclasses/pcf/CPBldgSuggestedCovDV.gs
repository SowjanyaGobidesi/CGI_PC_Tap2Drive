package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/cp/policy/CPBldgSuggestedCovDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CPBldgSuggestedCovDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($building :  CPBuilding, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.CPBldgSuggestedCovDV, SECTION_WIDGET_CLASS).setVariables(false, {$building, $openForEdit})
  }
  
  function refreshVariables ($building :  CPBuilding, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.CPBldgSuggestedCovDV, SECTION_WIDGET_CLASS).setVariables(true, {$building, $openForEdit})
  }
  
  
}