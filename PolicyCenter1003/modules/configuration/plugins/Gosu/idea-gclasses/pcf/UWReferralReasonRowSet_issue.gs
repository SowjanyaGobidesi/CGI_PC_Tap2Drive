package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policy/UWReferralReasonRowSet.issue.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class UWReferralReasonRowSet_issue extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($modalRow :  gw.web.policy.UWReferralReasonModalRow) : void {
    __widgetOf(this, pcf.UWReferralReasonRowSet_issue, SECTION_WIDGET_CLASS).setVariables(false, {$modalRow})
  }
  
  function refreshVariables ($modalRow :  gw.web.policy.UWReferralReasonModalRow) : void {
    __widgetOf(this, pcf.UWReferralReasonRowSet_issue, SECTION_WIDGET_CLASS).setVariables(true, {$modalRow})
  }
  
  
}