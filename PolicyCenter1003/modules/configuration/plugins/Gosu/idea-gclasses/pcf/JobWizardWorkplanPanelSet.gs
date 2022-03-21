package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/activity/JobWizardWorkplanPanelSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class JobWizardWorkplanPanelSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.JobWizardWorkplanPanelSet, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.JobWizardWorkplanPanelSet, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod})
  }
  
  
}