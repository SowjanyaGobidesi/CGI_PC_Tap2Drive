package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/AccountFile_MovePoliciesSelectionLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AccountFile_MovePoliciesSelectionLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($visiblePolicies :  List<PolicyPeriod>) : void {
    __widgetOf(this, pcf.AccountFile_MovePoliciesSelectionLV, SECTION_WIDGET_CLASS).setVariables(false, {$visiblePolicies})
  }
  
  function refreshVariables ($visiblePolicies :  List<PolicyPeriod>) : void {
    __widgetOf(this, pcf.AccountFile_MovePoliciesSelectionLV, SECTION_WIDGET_CLASS).setVariables(true, {$visiblePolicies})
  }
  
  
}