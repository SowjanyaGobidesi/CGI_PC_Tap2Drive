package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/submgr/SubmissionRejectLetterDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class SubmissionRejectLetterDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($account :  Account, $letter :  Letter) : void {
    __widgetOf(this, pcf.SubmissionRejectLetterDV, SECTION_WIDGET_CLASS).setVariables(false, {$account, $letter})
  }
  
  function refreshVariables ($account :  Account, $letter :  Letter) : void {
    __widgetOf(this, pcf.SubmissionRejectLetterDV, SECTION_WIDGET_CLASS).setVariables(true, {$account, $letter})
  }
  
  
}