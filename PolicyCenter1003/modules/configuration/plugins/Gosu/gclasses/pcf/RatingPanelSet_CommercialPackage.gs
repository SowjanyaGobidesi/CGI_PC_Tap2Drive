package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/cpp/policy/RatingPanelSet.CommercialPackage.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RatingPanelSet_CommercialPackage extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($period :  PolicyPeriod, $jobWizardHelper :  gw.api.web.job.JobWizardHelper, $isEditable :  boolean) : void {
    __widgetOf(this, pcf.RatingPanelSet_CommercialPackage, SECTION_WIDGET_CLASS).setVariables(false, {$period, $jobWizardHelper, $isEditable})
  }
  
  function refreshVariables ($period :  PolicyPeriod, $jobWizardHelper :  gw.api.web.job.JobWizardHelper, $isEditable :  boolean) : void {
    __widgetOf(this, pcf.RatingPanelSet_CommercialPackage, SECTION_WIDGET_CLASS).setVariables(true, {$period, $jobWizardHelper, $isEditable})
  }
  
  
}