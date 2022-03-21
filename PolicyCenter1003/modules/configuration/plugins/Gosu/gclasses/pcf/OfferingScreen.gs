package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/common/OfferingScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class OfferingScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($period :  PolicyPeriod, $openForEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.OfferingScreen, SECTION_WIDGET_CLASS).setVariables(false, {$period, $openForEdit, $jobWizardHelper})
  }
  
  function refreshVariables ($period :  PolicyPeriod, $openForEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.OfferingScreen, SECTION_WIDGET_CLASS).setVariables(true, {$period, $openForEdit, $jobWizardHelper})
  }
  
  
}