package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/submission/SubmissionWizard_PolicyInfoDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class SubmissionWizard_PolicyInfoDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod, $submission :  Submission, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.SubmissionWizard_PolicyInfoDV, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod, $submission, $openForEdit})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod, $submission :  Submission, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.SubmissionWizard_PolicyInfoDV, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod, $submission, $openForEdit})
  }
  
  
}