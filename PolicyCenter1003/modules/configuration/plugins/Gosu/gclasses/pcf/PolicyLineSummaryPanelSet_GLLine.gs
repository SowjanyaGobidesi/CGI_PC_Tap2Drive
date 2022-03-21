package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/gl/policy/PolicyLineSummaryPanelSet.GLLine.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PolicyLineSummaryPanelSet_GLLine extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($line :  PolicyLine, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.PolicyLineSummaryPanelSet_GLLine, SECTION_WIDGET_CLASS).setVariables(false, {$line, $jobWizardHelper})
  }
  
  function refreshVariables ($line :  PolicyLine, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.PolicyLineSummaryPanelSet_GLLine, SECTION_WIDGET_CLASS).setVariables(true, {$line, $jobWizardHelper})
  }
  
  
}