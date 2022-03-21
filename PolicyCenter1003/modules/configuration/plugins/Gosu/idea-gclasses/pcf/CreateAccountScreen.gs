package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/new/CreateAccountScreen.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CreateAccountScreen extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($account :  Account, $producerSelection :  ProducerSelection, $duplicateContactsPopupHelper :  gw.pcf.duplicatecontacts.DuplicateContactsPopupHelper) : void {
    __widgetOf(this, pcf.CreateAccountScreen, SECTION_WIDGET_CLASS).setVariables(false, {$account, $producerSelection, $duplicateContactsPopupHelper})
  }
  
  function refreshVariables ($account :  Account, $producerSelection :  ProducerSelection, $duplicateContactsPopupHelper :  gw.pcf.duplicatecontacts.DuplicateContactsPopupHelper) : void {
    __widgetOf(this, pcf.CreateAccountScreen, SECTION_WIDGET_CLASS).setVariables(true, {$account, $producerSelection, $duplicateContactsPopupHelper})
  }
  
  
}