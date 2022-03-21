package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policy/UWIssueHistoryLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class UWIssueHistoryLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($issue :  UWIssue, $approvalHistories :  UWIssueHistory[], $canEdit :  boolean) : void {
    __widgetOf(this, pcf.UWIssueHistoryLV, SECTION_WIDGET_CLASS).setVariables(false, {$issue, $approvalHistories, $canEdit})
  }
  
  function refreshVariables ($issue :  UWIssue, $approvalHistories :  UWIssueHistory[], $canEdit :  boolean) : void {
    __widgetOf(this, pcf.UWIssueHistoryLV, SECTION_WIDGET_CLASS).setVariables(true, {$issue, $approvalHistories, $canEdit})
  }
  
  
}