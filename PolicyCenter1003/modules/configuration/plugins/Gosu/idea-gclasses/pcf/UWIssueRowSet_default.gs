package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policy/UWIssueRowSet.default.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class UWIssueRowSet_default extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($wrapper :  gw.web.policy.RiskEvaluationPanelSetModalRow, $canApproveRejectReopenIssue :  boolean) : void {
    __widgetOf(this, pcf.UWIssueRowSet_default, SECTION_WIDGET_CLASS).setVariables(false, {$wrapper, $canApproveRejectReopenIssue})
  }
  
  function refreshVariables ($wrapper :  gw.web.policy.RiskEvaluationPanelSetModalRow, $canApproveRejectReopenIssue :  boolean) : void {
    __widgetOf(this, pcf.UWIssueRowSet_default, SECTION_WIDGET_CLASS).setVariables(true, {$wrapper, $canApproveRejectReopenIssue})
  }
  
  
}