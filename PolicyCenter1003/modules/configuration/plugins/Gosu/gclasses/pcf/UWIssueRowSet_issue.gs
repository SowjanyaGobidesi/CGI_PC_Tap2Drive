package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policy/UWIssueRowSet.issue.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class UWIssueRowSet_issue extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($wrapper :  gw.web.policy.RiskEvaluationPanelSetModalRow, $canApproveRejectReopenIssue :  boolean) : void {
    __widgetOf(this, pcf.UWIssueRowSet_issue, SECTION_WIDGET_CLASS).setVariables(false, {$wrapper, $canApproveRejectReopenIssue})
  }
  
  function refreshVariables ($wrapper :  gw.web.policy.RiskEvaluationPanelSetModalRow, $canApproveRejectReopenIssue :  boolean) : void {
    __widgetOf(this, pcf.UWIssueRowSet_issue, SECTION_WIDGET_CLASS).setVariables(true, {$wrapper, $canApproveRejectReopenIssue})
  }
  
  
}