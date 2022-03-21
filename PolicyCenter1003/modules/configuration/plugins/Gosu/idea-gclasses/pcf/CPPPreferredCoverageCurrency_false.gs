package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/cpp/policy/CPPPreferredCoverageCurrency.false.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CPPPreferredCoverageCurrency_false extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyLine :  PolicyLine, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.CPPPreferredCoverageCurrency_false, SECTION_WIDGET_CLASS).setVariables(false, {$policyLine, $jobWizardHelper})
  }
  
  function refreshVariables ($policyLine :  PolicyLine, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.CPPPreferredCoverageCurrency_false, SECTION_WIDGET_CLASS).setVariables(true, {$policyLine, $jobWizardHelper})
  }
  
  
}