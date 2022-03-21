package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/AccountContactCV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AccountContactCV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($acctContact :  AccountContact, $showAddressTools :  boolean, $showRolesTab :  boolean) : void {
    __widgetOf(this, pcf.AccountContactCV, SECTION_WIDGET_CLASS).setVariables(false, {$acctContact, $showAddressTools, $showRolesTab})
  }
  
  function refreshVariables ($acctContact :  AccountContact, $showAddressTools :  boolean, $showRolesTab :  boolean) : void {
    __widgetOf(this, pcf.AccountContactCV, SECTION_WIDGET_CLASS).setVariables(true, {$acctContact, $showAddressTools, $showRolesTab})
  }
  
  
}