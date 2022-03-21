package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/cpp/policy/CPPPreferredCoverageCurrency.true.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CPPPreferredCoverageCurrency_true extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyLine :  PolicyLine, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.CPPPreferredCoverageCurrency_true, SECTION_WIDGET_CLASS).setVariables(false, {$policyLine, $jobWizardHelper})
  }
  
  function refreshVariables ($policyLine :  PolicyLine, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.CPPPreferredCoverageCurrency_true, SECTION_WIDGET_CLASS).setVariables(true, {$policyLine, $jobWizardHelper})
  }
  
  
}