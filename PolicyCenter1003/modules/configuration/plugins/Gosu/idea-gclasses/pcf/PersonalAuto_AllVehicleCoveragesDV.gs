package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/pa/policy/PersonalAuto_AllVehicleCoveragesDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PersonalAuto_AllVehicleCoveragesDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($paLine :  PersonalAutoLine, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.PersonalAuto_AllVehicleCoveragesDV, SECTION_WIDGET_CLASS).setVariables(false, {$paLine, $openForEdit})
  }
  
  function refreshVariables ($paLine :  PersonalAutoLine, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.PersonalAuto_AllVehicleCoveragesDV, SECTION_WIDGET_CLASS).setVariables(true, {$paLine, $openForEdit})
  }
  
  
}