package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/overview/ContactDetailsTileInputSet.person.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ContactDetailsTileInputSet_person extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($accountDetailsTileHelper :  gw.api.web.dashboard.ui.account.AccountDetailHelper) : void {
    __widgetOf(this, pcf.ContactDetailsTileInputSet_person, SECTION_WIDGET_CLASS).setVariables(false, {$accountDetailsTileHelper})
  }
  
  function refreshVariables ($accountDetailsTileHelper :  gw.api.web.dashboard.ui.account.AccountDetailHelper) : void {
    __widgetOf(this, pcf.ContactDetailsTileInputSet_person, SECTION_WIDGET_CLASS).setVariables(true, {$accountDetailsTileHelper})
  }
  
  
}