package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/pa/policy/PAGarageLocationInputSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PAGarageLocationInputSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($vehicle :  PersonalVehicle, $policyPeriod :  PolicyPeriod, $openForEdit :  Boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.PAGarageLocationInputSet, SECTION_WIDGET_CLASS).setVariables(false, {$vehicle, $policyPeriod, $openForEdit, $jobWizardHelper})
  }
  
  function refreshVariables ($vehicle :  PersonalVehicle, $policyPeriod :  PolicyPeriod, $openForEdit :  Boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.PAGarageLocationInputSet, SECTION_WIDGET_CLASS).setVariables(true, {$vehicle, $policyPeriod, $openForEdit, $jobWizardHelper})
  }
  
  
}