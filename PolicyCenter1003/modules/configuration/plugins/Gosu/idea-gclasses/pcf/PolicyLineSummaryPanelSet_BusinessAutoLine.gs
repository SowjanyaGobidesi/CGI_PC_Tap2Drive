package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/ba/policy/PolicyLineSummaryPanelSet.BusinessAutoLine.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PolicyLineSummaryPanelSet_BusinessAutoLine extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($line :  PolicyLine, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.PolicyLineSummaryPanelSet_BusinessAutoLine, SECTION_WIDGET_CLASS).setVariables(false, {$line, $jobWizardHelper})
  }
  
  function refreshVariables ($line :  PolicyLine, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.PolicyLineSummaryPanelSet_BusinessAutoLine, SECTION_WIDGET_CLASS).setVariables(true, {$line, $jobWizardHelper})
  }
  
  
}