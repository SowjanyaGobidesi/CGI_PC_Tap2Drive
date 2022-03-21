package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/ba/policy/BAVehicleCV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class BAVehicleCV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($vehicle :  BusinessVehicle, $policyPeriod :  entity.PolicyPeriod, $openForEdit :  Boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.BAVehicleCV, SECTION_WIDGET_CLASS).setVariables(false, {$vehicle, $policyPeriod, $openForEdit, $jobWizardHelper})
  }
  
  function refreshVariables ($vehicle :  BusinessVehicle, $policyPeriod :  entity.PolicyPeriod, $openForEdit :  Boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.BAVehicleCV, SECTION_WIDGET_CLASS).setVariables(true, {$vehicle, $policyPeriod, $openForEdit, $jobWizardHelper})
  }
  
  
}