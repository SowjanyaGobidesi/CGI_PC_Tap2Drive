package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/AccountFile_LocationsLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AccountFile_LocationsLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($account :  Account, $selectedLocation :  AccountLocation) : void {
    __widgetOf(this, pcf.AccountFile_LocationsLV, SECTION_WIDGET_CLASS).setVariables(false, {$account, $selectedLocation})
  }
  
  function refreshVariables ($account :  Account, $selectedLocation :  AccountLocation) : void {
    __widgetOf(this, pcf.AccountFile_LocationsLV, SECTION_WIDGET_CLASS).setVariables(true, {$account, $selectedLocation})
  }
  
  
}