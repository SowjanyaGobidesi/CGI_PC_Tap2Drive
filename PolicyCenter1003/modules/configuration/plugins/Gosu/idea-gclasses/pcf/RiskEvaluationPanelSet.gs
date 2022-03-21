package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policy/RiskEvaluationPanelSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RiskEvaluationPanelSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($policyPeriod :  PolicyPeriod, $canApproveRejectReopenIssue :  boolean) : void {
    __widgetOf(this, pcf.RiskEvaluationPanelSet, SECTION_WIDGET_CLASS).setVariables(false, {$policyPeriod, $canApproveRejectReopenIssue})
  }
  
  function refreshVariables ($policyPeriod :  PolicyPeriod, $canApproveRejectReopenIssue :  boolean) : void {
    __widgetOf(this, pcf.RiskEvaluationPanelSet, SECTION_WIDGET_CLASS).setVariables(true, {$policyPeriod, $canApproveRejectReopenIssue})
  }
  
  
}