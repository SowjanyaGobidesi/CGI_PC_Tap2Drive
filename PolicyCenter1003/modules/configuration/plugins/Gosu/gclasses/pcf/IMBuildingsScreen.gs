package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/im/policy/IMBuildingsScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class IMBuildingsScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($imLine :  InlandMarineLine, $openForEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.IMBuildingsScreen, SECTION_WIDGET_CLASS).setVariables(false, {$imLine, $openForEdit, $jobWizardHelper})
  }
  
  function refreshVariables ($imLine :  InlandMarineLine, $openForEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.IMBuildingsScreen, SECTION_WIDGET_CLASS).setVariables(true, {$imLine, $openForEdit, $jobWizardHelper})
  }
  
  
}