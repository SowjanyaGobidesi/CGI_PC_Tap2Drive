package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/job/common/sidebyside/SideBySideErrorPageDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class SideBySideErrorPageDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($jobWizHelper :  gw.api.web.job.JobWizardHelper, $sideHelper :  gw.pcf.sidebyside.SideBySideScreenHelper) : void {
    __widgetOf(this, pcf.SideBySideErrorPageDV, SECTION_WIDGET_CLASS).setVariables(false, {$jobWizHelper, $sideHelper})
  }
  
  function refreshVariables ($jobWizHelper :  gw.api.web.job.JobWizardHelper, $sideHelper :  gw.pcf.sidebyside.SideBySideScreenHelper) : void {
    __widgetOf(this, pcf.SideBySideErrorPageDV, SECTION_WIDGET_CLASS).setVariables(true, {$jobWizHelper, $sideHelper})
  }
  
  
}