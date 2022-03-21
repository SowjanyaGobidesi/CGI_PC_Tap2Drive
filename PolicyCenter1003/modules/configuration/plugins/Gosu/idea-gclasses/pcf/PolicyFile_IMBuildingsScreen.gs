package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/im/policyfile/PolicyFile_IMBuildingsScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PolicyFile_IMBuildingsScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($imLine :  InlandMarineLine, $openForEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.PolicyFile_IMBuildingsScreen, SECTION_WIDGET_CLASS).setVariables(false, {$imLine, $openForEdit, $jobWizardHelper})
  }
  
  function refreshVariables ($imLine :  InlandMarineLine, $openForEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.PolicyFile_IMBuildingsScreen, SECTION_WIDGET_CLASS).setVariables(true, {$imLine, $openForEdit, $jobWizardHelper})
  }
  
  
}