package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/audit/AuditWizard_SummaryScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AuditWizard_SummaryScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($audit :  Audit, $policyPeriod :  PolicyPeriod, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.AuditWizard_SummaryScreen, SECTION_WIDGET_CLASS).setVariables(false, {$audit, $policyPeriod, $jobWizardHelper})
  }
  
  function refreshVariables ($audit :  Audit, $policyPeriod :  PolicyPeriod, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.AuditWizard_SummaryScreen, SECTION_WIDGET_CLASS).setVariables(true, {$audit, $policyPeriod, $jobWizardHelper})
  }
  
  
}