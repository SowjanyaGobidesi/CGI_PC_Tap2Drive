package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/AccountContactInputSet.OwnerOfficer.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AccountContactInputSet_OwnerOfficer extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($acctContactRole :  AccountContactRole) : void {
    __widgetOf(this, pcf.AccountContactInputSet_OwnerOfficer, SECTION_WIDGET_CLASS).setVariables(false, {$acctContactRole})
  }
  
  function refreshVariables ($acctContactRole :  AccountContactRole) : void {
    __widgetOf(this, pcf.AccountContactInputSet_OwnerOfficer, SECTION_WIDGET_CLASS).setVariables(true, {$acctContactRole})
  }
  
  
}