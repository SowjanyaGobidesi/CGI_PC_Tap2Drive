package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/common/sidebyside/SideBySideToolbarButtonSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class SideBySideToolbarButtonSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($basePeriod :  PolicyPeriod, $jobWizardHelper :  gw.api.web.job.JobWizardHelper, $periodInfos :  gw.job.sxs.SideBySidePolicyPeriodInfo[]) : void {
    __widgetOf(this, pcf.SideBySideToolbarButtonSet, SECTION_WIDGET_CLASS).setVariables(false, {$basePeriod, $jobWizardHelper, $periodInfos})
  }
  
  function refreshVariables ($basePeriod :  PolicyPeriod, $jobWizardHelper :  gw.api.web.job.JobWizardHelper, $periodInfos :  gw.job.sxs.SideBySidePolicyPeriodInfo[]) : void {
    __widgetOf(this, pcf.SideBySideToolbarButtonSet, SECTION_WIDGET_CLASS).setVariables(true, {$basePeriod, $jobWizardHelper, $periodInfos})
  }
  
  
}