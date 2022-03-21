package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/AccountFile_Locations_PolicyTermsLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AccountFile_Locations_PolicyTermsLV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($accountLocation :  AccountLocation) : void {
    __widgetOf(this, pcf.AccountFile_Locations_PolicyTermsLV, SECTION_WIDGET_CLASS).setVariables(false, {$accountLocation})
  }
  
  function refreshVariables ($accountLocation :  AccountLocation) : void {
    __widgetOf(this, pcf.AccountFile_Locations_PolicyTermsLV, SECTION_WIDGET_CLASS).setVariables(true, {$accountLocation})
  }
  
  
}