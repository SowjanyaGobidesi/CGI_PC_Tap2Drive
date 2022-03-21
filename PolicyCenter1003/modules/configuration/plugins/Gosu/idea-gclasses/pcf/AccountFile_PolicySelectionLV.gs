package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/AccountFile_PolicySelectionLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AccountFile_PolicySelectionLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($visiblePolicies :  List<PolicyPeriod>) : void {
    __widgetOf(this, pcf.AccountFile_PolicySelectionLV, SECTION_WIDGET_CLASS).setVariables(false, {$visiblePolicies})
  }
  
  function refreshVariables ($visiblePolicies :  List<PolicyPeriod>) : void {
    __widgetOf(this, pcf.AccountFile_PolicySelectionLV, SECTION_WIDGET_CLASS).setVariables(true, {$visiblePolicies})
  }
  
  
}