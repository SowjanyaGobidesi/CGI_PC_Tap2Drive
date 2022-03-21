package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/submission/ReviewSummaryCV.default.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ReviewSummaryCV_default extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.ReviewSummaryCV_default, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod, $jobWizardHelper})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.ReviewSummaryCV_default, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod, $jobWizardHelper})
  }
  
  
}