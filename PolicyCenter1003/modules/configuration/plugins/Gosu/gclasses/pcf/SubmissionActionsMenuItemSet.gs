package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/submgr/SubmissionActionsMenuItemSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class SubmissionActionsMenuItemSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($submission :  Submission, $policyPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.SubmissionActionsMenuItemSet, SECTION_WIDGET_CLASS).setVariables(false, {$submission, $policyPeriod})
  }
  
  function refreshVariables ($submission :  Submission, $policyPeriod :  PolicyPeriod) : void {
    __widgetOf(this, pcf.SubmissionActionsMenuItemSet, SECTION_WIDGET_CLASS).setVariables(true, {$submission, $policyPeriod})
  }
  
  
}