package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policy/UWIssueRowSet.label.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class UWIssueRowSet_label extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($wrapper :  gw.web.policy.RiskEvaluationPanelSetModalRow, $canApproveRejectReopenIssue :  boolean) : void {
    __widgetOf(this, pcf.UWIssueRowSet_label, SECTION_WIDGET_CLASS).setVariables(false, {$wrapper, $canApproveRejectReopenIssue})
  }
  
  function refreshVariables ($wrapper :  gw.web.policy.RiskEvaluationPanelSetModalRow, $canApproveRejectReopenIssue :  boolean) : void {
    __widgetOf(this, pcf.UWIssueRowSet_label, SECTION_WIDGET_CLASS).setVariables(true, {$wrapper, $canApproveRejectReopenIssue})
  }
  
  
}