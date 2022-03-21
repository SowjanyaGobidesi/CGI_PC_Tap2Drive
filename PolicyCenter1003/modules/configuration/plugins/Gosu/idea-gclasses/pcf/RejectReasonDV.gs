package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/submgr/RejectReasonDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RejectReasonDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($submission :  Submission, $type :  LetterType) : void {
    __widgetOf(this, pcf.RejectReasonDV, SECTION_WIDGET_CLASS).setVariables(false, {$submission, $type})
  }
  
  function refreshVariables ($submission :  Submission, $type :  LetterType) : void {
    __widgetOf(this, pcf.RejectReasonDV, SECTION_WIDGET_CLASS).setVariables(true, {$submission, $type})
  }
  
  
}