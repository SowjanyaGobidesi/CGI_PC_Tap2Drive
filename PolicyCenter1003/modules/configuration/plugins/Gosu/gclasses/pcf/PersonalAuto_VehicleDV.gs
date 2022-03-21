package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/pa/policy/PersonalAuto_VehicleDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PersonalAuto_VehicleDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($vehicle :  PersonalVehicle, $policyPeriod :  PolicyPeriod, $line :  PersonalAutoLine, $openForEdit :  Boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.PersonalAuto_VehicleDV, SECTION_WIDGET_CLASS).setVariables(false, {$vehicle, $policyPeriod, $line, $openForEdit, $jobWizardHelper})
  }
  
  function refreshVariables ($vehicle :  PersonalVehicle, $policyPeriod :  PolicyPeriod, $line :  PersonalAutoLine, $openForEdit :  Boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.PersonalAuto_VehicleDV, SECTION_WIDGET_CLASS).setVariables(true, {$vehicle, $policyPeriod, $line, $openForEdit, $jobWizardHelper})
  }
  
  
}