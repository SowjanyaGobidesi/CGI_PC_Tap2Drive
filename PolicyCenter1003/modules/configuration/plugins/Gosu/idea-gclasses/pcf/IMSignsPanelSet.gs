package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/im/parts/signs/IMSignsPanelSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class IMSignsPanelSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod, $imSignPart :  IMSignPart, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.IMSignsPanelSet, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod, $imSignPart, $jobWizardHelper})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod, $imSignPart :  IMSignPart, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.IMSignsPanelSet, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod, $imSignPart, $jobWizardHelper})
  }
  
  
}