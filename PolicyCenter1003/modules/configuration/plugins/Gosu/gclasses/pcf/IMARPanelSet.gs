package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/im/parts/accountsrec/IMARPanelSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class IMARPanelSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($accountsRecPart :  IMAccountsRecPart, $openforEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.IMARPanelSet, SECTION_WIDGET_CLASS).setVariables(false, {$accountsRecPart, $openforEdit, $jobWizardHelper})
  }
  
  function refreshVariables ($accountsRecPart :  IMAccountsRecPart, $openforEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.IMARPanelSet, SECTION_WIDGET_CLASS).setVariables(true, {$accountsRecPart, $openforEdit, $jobWizardHelper})
  }
  
  
}