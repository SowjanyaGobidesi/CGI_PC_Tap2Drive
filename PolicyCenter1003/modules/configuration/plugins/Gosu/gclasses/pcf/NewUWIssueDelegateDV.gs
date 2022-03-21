package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/policy/NewUWIssueDelegateDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class NewUWIssueDelegateDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($issue :  UWIssueDelegate, $uwIssueTypes :  List<UWIssueType>) : void {
    __widgetOf(this, pcf.NewUWIssueDelegateDV, SECTION_WIDGET_CLASS).setVariables(false, {$issue, $uwIssueTypes})
  }
  
  function refreshVariables ($issue :  UWIssueDelegate, $uwIssueTypes :  List<UWIssueType>) : void {
    __widgetOf(this, pcf.NewUWIssueDelegateDV, SECTION_WIDGET_CLASS).setVariables(true, {$issue, $uwIssueTypes})
  }
  
  
}