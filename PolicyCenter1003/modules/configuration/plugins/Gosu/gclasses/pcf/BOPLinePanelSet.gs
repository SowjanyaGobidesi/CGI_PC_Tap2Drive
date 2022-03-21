package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/bop/policy/BOPLinePanelSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class BOPLinePanelSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyLine :  PolicyLine, $openForEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.BOPLinePanelSet, SECTION_WIDGET_CLASS).setVariables(false, {$policyLine, $openForEdit, $jobWizardHelper})
  }
  
  function refreshVariables ($policyLine :  PolicyLine, $openForEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.BOPLinePanelSet, SECTION_WIDGET_CLASS).setVariables(true, {$policyLine, $openForEdit, $jobWizardHelper})
  }
  
  
}