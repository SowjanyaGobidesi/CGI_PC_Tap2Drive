package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/pa/policy/PAVehicleModifiersInputSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PAVehicleModifiersInputSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($vehicle :  PersonalVehicle, $policyPeriod :  entity.PolicyPeriod) : void {
    __widgetOf(this, pcf.PAVehicleModifiersInputSet, SECTION_WIDGET_CLASS).setVariables(false, {$vehicle, $policyPeriod})
  }
  
  function refreshVariables ($vehicle :  PersonalVehicle, $policyPeriod :  entity.PolicyPeriod) : void {
    __widgetOf(this, pcf.PAVehicleModifiersInputSet, SECTION_WIDGET_CLASS).setVariables(true, {$vehicle, $policyPeriod})
  }
  
  
}