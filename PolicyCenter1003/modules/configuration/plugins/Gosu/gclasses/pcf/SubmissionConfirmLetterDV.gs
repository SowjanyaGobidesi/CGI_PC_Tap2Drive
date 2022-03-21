package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/submgr/SubmissionConfirmLetterDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class SubmissionConfirmLetterDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($letter :  Letter, $account :  Account) : void {
    __widgetOf(this, pcf.SubmissionConfirmLetterDV, SECTION_WIDGET_CLASS).setVariables(false, {$letter, $account})
  }
  
  function refreshVariables ($letter :  Letter, $account :  Account) : void {
    __widgetOf(this, pcf.SubmissionConfirmLetterDV, SECTION_WIDGET_CLASS).setVariables(true, {$letter, $account})
  }
  
  
}