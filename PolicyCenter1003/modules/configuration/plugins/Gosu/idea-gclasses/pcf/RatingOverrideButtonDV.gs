package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/common/ratingoverride/RatingOverrideButtonDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RatingOverrideButtonDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod, $policyLine :  PolicyLine, $jobWizardHelper :  gw.api.web.job.JobWizardHelper, $isEditable :  boolean) : void {
    __widgetOf(this, pcf.RatingOverrideButtonDV, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod, $policyLine, $jobWizardHelper, $isEditable})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod, $policyLine :  PolicyLine, $jobWizardHelper :  gw.api.web.job.JobWizardHelper, $isEditable :  boolean) : void {
    __widgetOf(this, pcf.RatingOverrideButtonDV, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod, $policyLine, $jobWizardHelper, $isEditable})
  }
  
  
}