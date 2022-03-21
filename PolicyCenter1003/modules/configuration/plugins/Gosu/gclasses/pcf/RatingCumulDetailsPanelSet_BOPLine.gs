package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/bop/policy/RatingCumulDetailsPanelSet.BOPLine.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RatingCumulDetailsPanelSet_BOPLine extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($period :  PolicyPeriod, $jobWizardHelper :  gw.api.web.job.JobWizardHelper, $isEditable :  boolean) : void {
    __widgetOf(this, pcf.RatingCumulDetailsPanelSet_BOPLine, SECTION_WIDGET_CLASS).setVariables(false, {$period, $jobWizardHelper, $isEditable})
  }
  
  function refreshVariables ($period :  PolicyPeriod, $jobWizardHelper :  gw.api.web.job.JobWizardHelper, $isEditable :  boolean) : void {
    __widgetOf(this, pcf.RatingCumulDetailsPanelSet_BOPLine, SECTION_WIDGET_CLASS).setVariables(true, {$period, $jobWizardHelper, $isEditable})
  }
  
  
}