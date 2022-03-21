package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/shared/contacts/ContactSearchScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ContactSearchScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($availableSubtypes :  typekey.Contact[], $initialSearchCriteria :  ContactSearchCriteria, $isFromContactSearchTab :  boolean, $searchOnEnter :  Boolean) : void {
    __widgetOf(this, pcf.ContactSearchScreen, SECTION_WIDGET_CLASS).setVariables(false, {$availableSubtypes, $initialSearchCriteria, $isFromContactSearchTab, $searchOnEnter})
  }
  
  function refreshVariables ($availableSubtypes :  typekey.Contact[], $initialSearchCriteria :  ContactSearchCriteria, $isFromContactSearchTab :  boolean, $searchOnEnter :  Boolean) : void {
    __widgetOf(this, pcf.ContactSearchScreen, SECTION_WIDGET_CLASS).setVariables(true, {$availableSubtypes, $initialSearchCriteria, $isFromContactSearchTab, $searchOnEnter})
  }
  
  
}