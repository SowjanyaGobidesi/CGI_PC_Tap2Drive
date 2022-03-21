package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/common/sidebyside/SideBySideScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class SideBySideScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($jobWizHelper :  gw.api.web.job.JobWizardHelper, $basePeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.SideBySideScreen, SECTION_WIDGET_CLASS).setVariables(false, {$jobWizHelper, $basePeriod})
  }
  
  function refreshVariables ($jobWizHelper :  gw.api.web.job.JobWizardHelper, $basePeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.SideBySideScreen, SECTION_WIDGET_CLASS).setVariables(true, {$jobWizHelper, $basePeriod})
  }
  
  
}