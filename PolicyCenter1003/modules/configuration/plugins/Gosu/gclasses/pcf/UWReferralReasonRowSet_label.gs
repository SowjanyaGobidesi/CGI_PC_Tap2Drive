package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policy/UWReferralReasonRowSet.label.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class UWReferralReasonRowSet_label extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($modalRow :  gw.web.policy.UWReferralReasonModalRow) : void {
    __widgetOf(this, pcf.UWReferralReasonRowSet_label, SECTION_WIDGET_CLASS).setVariables(false, {$modalRow})
  }
  
  function refreshVariables ($modalRow :  gw.web.policy.UWReferralReasonModalRow) : void {
    __widgetOf(this, pcf.UWReferralReasonRowSet_label, SECTION_WIDGET_CLASS).setVariables(true, {$modalRow})
  }
  
  
}