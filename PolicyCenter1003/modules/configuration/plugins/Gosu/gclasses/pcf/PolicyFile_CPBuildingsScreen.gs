package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/cp/policyfile/PolicyFile_CPBuildingsScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PolicyFile_CPBuildingsScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($cpLine :  CommercialPropertyLine, $openForEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.PolicyFile_CPBuildingsScreen, SECTION_WIDGET_CLASS).setVariables(false, {$cpLine, $openForEdit, $jobWizardHelper})
  }
  
  function refreshVariables ($cpLine :  CommercialPropertyLine, $openForEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.PolicyFile_CPBuildingsScreen, SECTION_WIDGET_CLASS).setVariables(true, {$cpLine, $openForEdit, $jobWizardHelper})
  }
  
  
}