package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policy/Policy_JobDetailsInputSet.Submission.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class Policy_JobDetailsInputSet_Submission extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($job :  Job) : void {
    __widgetOf(this, pcf.Policy_JobDetailsInputSet_Submission, SECTION_WIDGET_CLASS).setVariables(false, {$job})
  }
  
  function refreshVariables ($job :  Job) : void {
    __widgetOf(this, pcf.Policy_JobDetailsInputSet_Submission, SECTION_WIDGET_CLASS).setVariables(true, {$job})
  }
  
  
}