package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/cp/policy/RatingTxDetailsPanelSet.CPLine.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RatingTxDetailsPanelSet_CPLine extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($period :  PolicyPeriod, $totalPremLabel :  String, $totalCostLabel :  String, $revOpenForEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.RatingTxDetailsPanelSet_CPLine, SECTION_WIDGET_CLASS).setVariables(false, {$period, $totalPremLabel, $totalCostLabel, $revOpenForEdit, $jobWizardHelper})
  }
  
  function refreshVariables ($period :  PolicyPeriod, $totalPremLabel :  String, $totalCostLabel :  String, $revOpenForEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.RatingTxDetailsPanelSet_CPLine, SECTION_WIDGET_CLASS).setVariables(true, {$period, $totalPremLabel, $totalCostLabel, $revOpenForEdit, $jobWizardHelper})
  }
  
  
}