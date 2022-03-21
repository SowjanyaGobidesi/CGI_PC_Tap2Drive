package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/ba/policy/VehicleClassCodeSearchDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class VehicleClassCodeSearchDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($searchCriteria :  gw.api.domain.VehicleClassCodeSearchCriteria, $businessAutoLine :  BusinessAutoLine) : void {
    __widgetOf(this, pcf.VehicleClassCodeSearchDV, SECTION_WIDGET_CLASS).setVariables(false, {$searchCriteria, $businessAutoLine})
  }
  
  function refreshVariables ($searchCriteria :  gw.api.domain.VehicleClassCodeSearchCriteria, $businessAutoLine :  BusinessAutoLine) : void {
    __widgetOf(this, pcf.VehicleClassCodeSearchDV, SECTION_WIDGET_CLASS).setVariables(true, {$searchCriteria, $businessAutoLine})
  }
  
  
}