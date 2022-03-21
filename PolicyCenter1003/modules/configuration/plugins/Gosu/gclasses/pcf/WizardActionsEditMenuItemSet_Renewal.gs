package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/renewal/WizardActionsEditMenuItemSet.Renewal.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class WizardActionsEditMenuItemSet_Renewal extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($jobWizardHelper :  gw.api.web.job.JobWizardHelper, $job :  Job, $policyPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.WizardActionsEditMenuItemSet_Renewal, SECTION_WIDGET_CLASS).setVariables(false, {$jobWizardHelper, $job, $policyPeriod})
  }
  
  function refreshVariables ($jobWizardHelper :  gw.api.web.job.JobWizardHelper, $job :  Job, $policyPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.WizardActionsEditMenuItemSet_Renewal, SECTION_WIDGET_CLASS).setVariables(true, {$jobWizardHelper, $job, $policyPeriod})
  }
  
  
}