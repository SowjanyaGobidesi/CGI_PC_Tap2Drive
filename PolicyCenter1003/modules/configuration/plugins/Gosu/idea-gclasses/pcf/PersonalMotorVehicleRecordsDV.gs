package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/pa/policy/PersonalMotorVehicleRecordsDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PersonalMotorVehicleRecordsDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($mvrOrder :  gw.api.motorvehiclerecord.IMVROrder, $policyDriver :  PolicyDriver) : void {
    __widgetOf(this, pcf.PersonalMotorVehicleRecordsDV, SECTION_WIDGET_CLASS).setVariables(false, {$mvrOrder, $policyDriver})
  }
  
  function refreshVariables ($mvrOrder :  gw.api.motorvehiclerecord.IMVROrder, $policyDriver :  PolicyDriver) : void {
    __widgetOf(this, pcf.PersonalMotorVehicleRecordsDV, SECTION_WIDGET_CLASS).setVariables(true, {$mvrOrder, $policyDriver})
  }
  
  
}