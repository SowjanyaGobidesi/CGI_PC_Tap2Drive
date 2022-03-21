package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/pa/policy/PersonalAuto_AssignDriversInputSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PersonalAuto_AssignDriversInputSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($vehicle :  PersonalVehicle, $policyPeriod :  PolicyPeriod, $personalAutoLine :  PersonalAutoLine, $openForEdit :  Boolean) : void {
    __widgetOf(this, pcf.PersonalAuto_AssignDriversInputSet, SECTION_WIDGET_CLASS).setVariables(false, {$vehicle, $policyPeriod, $personalAutoLine, $openForEdit})
  }
  
  function refreshVariables ($vehicle :  PersonalVehicle, $policyPeriod :  PolicyPeriod, $personalAutoLine :  PersonalAutoLine, $openForEdit :  Boolean) : void {
    __widgetOf(this, pcf.PersonalAuto_AssignDriversInputSet, SECTION_WIDGET_CLASS).setVariables(true, {$vehicle, $policyPeriod, $personalAutoLine, $openForEdit})
  }
  
  
}