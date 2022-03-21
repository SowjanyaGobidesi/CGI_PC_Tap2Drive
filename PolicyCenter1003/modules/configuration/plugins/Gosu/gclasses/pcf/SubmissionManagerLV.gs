package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/submgr/SubmissionManagerLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class SubmissionManagerLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($account :  Account, $submissions :  Submission[]) : void {
    __widgetOf(this, pcf.SubmissionManagerLV, SECTION_WIDGET_CLASS).setVariables(false, {$account, $submissions})
  }
  
  function refreshVariables ($account :  Account, $submissions :  Submission[]) : void {
    __widgetOf(this, pcf.SubmissionManagerLV, SECTION_WIDGET_CLASS).setVariables(true, {$account, $submissions})
  }
  
  
}