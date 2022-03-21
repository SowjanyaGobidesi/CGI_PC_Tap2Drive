package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/pa/policy/QuickSubmission_QuoteDetailsPanelSet.PersonalAutoLine.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class QuickSubmission_QuoteDetailsPanelSet_PersonalAutoLine extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($period :  PolicyPeriod, $jobWizardHelper :  gw.api.web.job.JobWizardHelper, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.QuickSubmission_QuoteDetailsPanelSet_PersonalAutoLine, SECTION_WIDGET_CLASS).setVariables(false, {$period, $jobWizardHelper, $openForEdit})
  }
  
  function refreshVariables ($period :  PolicyPeriod, $jobWizardHelper :  gw.api.web.job.JobWizardHelper, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.QuickSubmission_QuoteDetailsPanelSet_PersonalAutoLine, SECTION_WIDGET_CLASS).setVariables(true, {$period, $jobWizardHelper, $openForEdit})
  }
  
  
}