package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/cp/policy/PolicyLineSummaryPanelSet.CPLine.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PolicyLineSummaryPanelSet_CPLine extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($line :  PolicyLine, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.PolicyLineSummaryPanelSet_CPLine, SECTION_WIDGET_CLASS).setVariables(false, {$line, $jobWizardHelper})
  }
  
  function refreshVariables ($line :  PolicyLine, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.PolicyLineSummaryPanelSet_CPLine, SECTION_WIDGET_CLASS).setVariables(true, {$line, $jobWizardHelper})
  }
  
  
}