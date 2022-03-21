package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/common/PreferredCoverageCurrencyPanelSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PreferredCoverageCurrencyPanelSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($coverable :  Coverable, $openForEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.PreferredCoverageCurrencyPanelSet, SECTION_WIDGET_CLASS).setVariables(false, {$coverable, $openForEdit, $jobWizardHelper})
  }
  
  function refreshVariables ($coverable :  Coverable, $openForEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.PreferredCoverageCurrencyPanelSet, SECTION_WIDGET_CLASS).setVariables(true, {$coverable, $openForEdit, $jobWizardHelper})
  }
  
  
}