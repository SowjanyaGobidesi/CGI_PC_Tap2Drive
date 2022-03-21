package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/common/LocationDetailCV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class LocationDetailCV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($polLocation :  PolicyLocation, $openForEdit :  boolean, $supportsNonSpecificLocation :  boolean) : void {
    __widgetOf(this, pcf.LocationDetailCV, SECTION_WIDGET_CLASS).setVariables(false, {$polLocation, $openForEdit, $supportsNonSpecificLocation})
  }
  
  function refreshVariables ($polLocation :  PolicyLocation, $openForEdit :  boolean, $supportsNonSpecificLocation :  boolean) : void {
    __widgetOf(this, pcf.LocationDetailCV, SECTION_WIDGET_CLASS).setVariables(true, {$polLocation, $openForEdit, $supportsNonSpecificLocation})
  }
  
  
}