package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/wc/policy/CoverageOptionsScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CoverageOptionsScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod, $openForEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.CoverageOptionsScreen, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod, $openForEdit, $jobWizardHelper})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod, $openForEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.CoverageOptionsScreen, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod, $openForEdit, $jobWizardHelper})
  }
  
  
}