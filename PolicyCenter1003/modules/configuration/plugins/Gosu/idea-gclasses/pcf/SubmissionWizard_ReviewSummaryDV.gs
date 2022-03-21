package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/submission/SubmissionWizard_ReviewSummaryDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class SubmissionWizard_ReviewSummaryDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod, $submission :  Submission) : void {
    __widgetOf(this, pcf.SubmissionWizard_ReviewSummaryDV, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod, $submission})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod, $submission :  Submission) : void {
    __widgetOf(this, pcf.SubmissionWizard_ReviewSummaryDV, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod, $submission})
  }
  
  
}