package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/cpp/policy/CPPRatingCumulPanelSet.scroll.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CPPRatingCumulPanelSet_scroll extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($period :  PolicyPeriod, $jobWizardHelper :  gw.api.web.job.JobWizardHelper, $isEditable :  boolean) : void {
    __widgetOf(this, pcf.CPPRatingCumulPanelSet_scroll, SECTION_WIDGET_CLASS).setVariables(false, {$period, $jobWizardHelper, $isEditable})
  }
  
  function refreshVariables ($period :  PolicyPeriod, $jobWizardHelper :  gw.api.web.job.JobWizardHelper, $isEditable :  boolean) : void {
    __widgetOf(this, pcf.CPPRatingCumulPanelSet_scroll, SECTION_WIDGET_CLASS).setVariables(true, {$period, $jobWizardHelper, $isEditable})
  }
  
  
}