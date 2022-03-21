package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/JobWizardInfoBar.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class JobWizardInfoBar extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($job :  Job, $policyPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.JobWizardInfoBar, SECTION_WIDGET_CLASS).setVariables(false, {$job, $policyPeriod})
  }
  
  function refreshVariables ($job :  Job, $policyPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.JobWizardInfoBar, SECTION_WIDGET_CLASS).setVariables(true, {$job, $policyPeriod})
  }
  
  
}