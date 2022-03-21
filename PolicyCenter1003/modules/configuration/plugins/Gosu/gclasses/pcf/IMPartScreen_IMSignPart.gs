package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/im/parts/signs/IMPartScreen.IMSignPart.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class IMPartScreen_IMSignPart extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($job :  Job, $policyPeriod :  PolicyPeriod, $openForEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.IMPartScreen_IMSignPart, SECTION_WIDGET_CLASS).setVariables(false, {$job, $policyPeriod, $openForEdit, $jobWizardHelper})
  }
  
  function refreshVariables ($job :  Job, $policyPeriod :  PolicyPeriod, $openForEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.IMPartScreen_IMSignPart, SECTION_WIDGET_CLASS).setVariables(true, {$job, $policyPeriod, $openForEdit, $jobWizardHelper})
  }
  
  
}