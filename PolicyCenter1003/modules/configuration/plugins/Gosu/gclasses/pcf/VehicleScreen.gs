package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/ba/policy/VehicleScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class VehicleScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($vehicle :  BusinessVehicle, $policyPeriod :  PolicyPeriod, $openForEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.VehicleScreen, SECTION_WIDGET_CLASS).setVariables(false, {$vehicle, $policyPeriod, $openForEdit, $jobWizardHelper})
  }
  
  function refreshVariables ($vehicle :  BusinessVehicle, $policyPeriod :  PolicyPeriod, $openForEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.VehicleScreen, SECTION_WIDGET_CLASS).setVariables(true, {$vehicle, $policyPeriod, $openForEdit, $jobWizardHelper})
  }
  
  
}