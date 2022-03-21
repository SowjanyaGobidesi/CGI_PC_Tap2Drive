package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/bop/policy/BOPBuildingsCV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class BOPBuildingsCV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod, $openForEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.BOPBuildingsCV, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod, $openForEdit, $jobWizardHelper})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod, $openForEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.BOPBuildingsCV, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod, $openForEdit, $jobWizardHelper})
  }
  
  
}