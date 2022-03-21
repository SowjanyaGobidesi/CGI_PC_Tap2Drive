package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/pa/policy/PAVehiclesPanelSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PAVehiclesPanelSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod, $line :  PersonalAutoLine, $openForEdit :  Boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.PAVehiclesPanelSet, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod, $line, $openForEdit, $jobWizardHelper})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod, $line :  PersonalAutoLine, $openForEdit :  Boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.PAVehiclesPanelSet, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod, $line, $openForEdit, $jobWizardHelper})
  }
  
  
}