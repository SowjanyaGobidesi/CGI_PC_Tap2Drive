package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/submission/ReviewSummaryCV.true.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ReviewSummaryCV_true extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.ReviewSummaryCV_true, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod, $jobWizardHelper})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.ReviewSummaryCV_true, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod, $jobWizardHelper})
  }
  
  
}