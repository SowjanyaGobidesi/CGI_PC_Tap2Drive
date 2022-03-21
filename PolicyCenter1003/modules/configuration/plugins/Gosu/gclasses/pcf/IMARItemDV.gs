package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/im/parts/accountsrec/IMARItemDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class IMARItemDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($accountsRecPart :  IMAccountsRecPart, $openForEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.IMARItemDV, SECTION_WIDGET_CLASS).setVariables(false, {$accountsRecPart, $openForEdit, $jobWizardHelper})
  }
  
  function refreshVariables ($accountsRecPart :  IMAccountsRecPart, $openForEdit :  boolean, $jobWizardHelper :  gw.api.web.job.JobWizardHelper) : void {
    __widgetOf(this, pcf.IMARItemDV, SECTION_WIDGET_CLASS).setVariables(true, {$accountsRecPart, $openForEdit, $jobWizardHelper})
  }
  
  
}