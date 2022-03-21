package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/ba/policy/VehicleDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class VehicleDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($vehicle :  BusinessVehicle, $policyPeriod :  PolicyPeriod, $baLine :  BusinessAutoLine, $openForEdit :  Boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.VehicleDV, SECTION_WIDGET_CLASS).setVariables(false, {$vehicle, $policyPeriod, $baLine, $openForEdit, $jobWizardHelper})
  }
  
  function refreshVariables ($vehicle :  BusinessVehicle, $policyPeriod :  PolicyPeriod, $baLine :  BusinessAutoLine, $openForEdit :  Boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.VehicleDV, SECTION_WIDGET_CLASS).setVariables(true, {$vehicle, $policyPeriod, $baLine, $openForEdit, $jobWizardHelper})
  }
  
  
}