package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/pa/policy/PersonalAuto_VehicleCoverageDetailDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PersonalAuto_VehicleCoverageDetailDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($vehicle :  PersonalVehicle, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.PersonalAuto_VehicleCoverageDetailDV, SECTION_WIDGET_CLASS).setVariables(false, {$vehicle, $openForEdit})
  }
  
  function refreshVariables ($vehicle :  PersonalVehicle, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.PersonalAuto_VehicleCoverageDetailDV, SECTION_WIDGET_CLASS).setVariables(true, {$vehicle, $openForEdit})
  }
  
  
}