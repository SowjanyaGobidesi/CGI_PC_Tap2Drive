package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/shared/contacts/LinkedAddressInputSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class LinkedAddressInputSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($currentAddress :  entity.Address, $currentContact :  entity.Contact, $aPeriod :  PolicyPeriod, $anAccount :  entity.Account, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.LinkedAddressInputSet, SECTION_WIDGET_CLASS).setVariables(false, {$currentAddress, $currentContact, $aPeriod, $anAccount, $openForEdit})
  }
  
  function refreshVariables ($currentAddress :  entity.Address, $currentContact :  entity.Contact, $aPeriod :  PolicyPeriod, $anAccount :  entity.Account, $openForEdit :  boolean) : void {
    __widgetOf(this, pcf.LinkedAddressInputSet, SECTION_WIDGET_CLASS).setVariables(true, {$currentAddress, $currentContact, $aPeriod, $anAccount, $openForEdit})
  }
  
  
}