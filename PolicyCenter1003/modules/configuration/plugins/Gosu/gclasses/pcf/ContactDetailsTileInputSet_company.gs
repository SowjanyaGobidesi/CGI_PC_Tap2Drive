package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/overview/ContactDetailsTileInputSet.company.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ContactDetailsTileInputSet_company extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($accountDetailsTileHelper :  gw.api.web.dashboard.ui.account.AccountDetailHelper) : void {
    __widgetOf(this, pcf.ContactDetailsTileInputSet_company, SECTION_WIDGET_CLASS).setVariables(false, {$accountDetailsTileHelper})
  }
  
  function refreshVariables ($accountDetailsTileHelper :  gw.api.web.dashboard.ui.account.AccountDetailHelper) : void {
    __widgetOf(this, pcf.ContactDetailsTileInputSet_company, SECTION_WIDGET_CLASS).setVariables(true, {$accountDetailsTileHelper})
  }
  
  
}