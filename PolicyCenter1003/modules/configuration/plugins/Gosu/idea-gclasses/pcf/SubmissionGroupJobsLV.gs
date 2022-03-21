package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/renmgr/SubmissionGroupJobsLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class SubmissionGroupJobsLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($submissionGroup :  SubmissionGroup) : void {
    __widgetOf(this, pcf.SubmissionGroupJobsLV, SECTION_WIDGET_CLASS).setVariables(false, {$submissionGroup})
  }
  
  function refreshVariables ($submissionGroup :  SubmissionGroup) : void {
    __widgetOf(this, pcf.SubmissionGroupJobsLV, SECTION_WIDGET_CLASS).setVariables(true, {$submissionGroup})
  }
  
  
}