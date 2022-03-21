package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policy/UWApprovalLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class UWApprovalLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($asst :  gw.job.uw.UWApprovalLVAsst, $canEdit :  boolean) : void {
    __widgetOf(this, pcf.UWApprovalLV, SECTION_WIDGET_CLASS).setVariables(false, {$asst, $canEdit})
  }
  
  function refreshVariables ($asst :  gw.job.uw.UWApprovalLVAsst, $canEdit :  boolean) : void {
    __widgetOf(this, pcf.UWApprovalLV, SECTION_WIDGET_CLASS).setVariables(true, {$asst, $canEdit})
  }
  
  
}