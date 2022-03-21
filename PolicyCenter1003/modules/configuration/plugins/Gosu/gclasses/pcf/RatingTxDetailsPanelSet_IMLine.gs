package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/im/policy/RatingTxDetailsPanelSet.IMLine.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RatingTxDetailsPanelSet_IMLine extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($thePeriod :  PolicyPeriod, $totalPremLabel :  String, $totalCostLabel :  String, $openForEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.RatingTxDetailsPanelSet_IMLine, SECTION_WIDGET_CLASS).setVariables(false, {$thePeriod, $totalPremLabel, $totalCostLabel, $openForEdit, $jobWizardHelper})
  }
  
  function refreshVariables ($thePeriod :  PolicyPeriod, $totalPremLabel :  String, $totalCostLabel :  String, $openForEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.RatingTxDetailsPanelSet_IMLine, SECTION_WIDGET_CLASS).setVariables(true, {$thePeriod, $totalPremLabel, $totalCostLabel, $openForEdit, $jobWizardHelper})
  }
  
  
}