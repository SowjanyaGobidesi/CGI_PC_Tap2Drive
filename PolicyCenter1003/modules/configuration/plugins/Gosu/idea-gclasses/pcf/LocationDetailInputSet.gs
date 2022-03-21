package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/common/LocationDetailInputSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class LocationDetailInputSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($polLocation :  PolicyLocation, $supportsNonSpecificLocation :  boolean, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.LocationDetailInputSet, SECTION_WIDGET_CLASS).setVariables(false, {$polLocation, $supportsNonSpecificLocation, $openForEdit})
  }
  
  function refreshVariables ($polLocation :  PolicyLocation, $supportsNonSpecificLocation :  boolean, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.LocationDetailInputSet, SECTION_WIDGET_CLASS).setVariables(true, {$polLocation, $supportsNonSpecificLocation, $openForEdit})
  }
  
  
}