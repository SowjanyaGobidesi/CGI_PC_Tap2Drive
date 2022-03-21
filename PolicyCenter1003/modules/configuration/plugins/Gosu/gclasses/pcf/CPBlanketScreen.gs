package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/cp/policy/CPBlanketScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CPBlanketScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($cpLine :  CommercialPropertyLine, $openForEdit :  Boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.CPBlanketScreen, SECTION_WIDGET_CLASS).setVariables(false, {$cpLine, $openForEdit, $jobWizardHelper})
  }
  
  function refreshVariables ($cpLine :  CommercialPropertyLine, $openForEdit :  Boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.CPBlanketScreen, SECTION_WIDGET_CLASS).setVariables(true, {$cpLine, $openForEdit, $jobWizardHelper})
  }
  
  
}