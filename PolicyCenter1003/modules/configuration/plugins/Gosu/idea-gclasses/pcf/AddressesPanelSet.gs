package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/shared/contacts/AddressesPanelSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AddressesPanelSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($contact :  Contact, $showAddressTools :  boolean, $account :  entity.Account, $period :  entity.PolicyPeriod) : void {
    __widgetOf(this, pcf.AddressesPanelSet, SECTION_WIDGET_CLASS).setVariables(false, {$contact, $showAddressTools, $account, $period})
  }
  
  function refreshVariables ($contact :  Contact, $showAddressTools :  boolean, $account :  entity.Account, $period :  entity.PolicyPeriod) : void {
    __widgetOf(this, pcf.AddressesPanelSet, SECTION_WIDGET_CLASS).setVariables(true, {$contact, $showAddressTools, $account, $period})
  }
  
  
}