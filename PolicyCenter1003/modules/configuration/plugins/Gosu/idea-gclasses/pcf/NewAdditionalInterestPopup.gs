package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/contacts/NewAdditionalInterestPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class NewAdditionalInterestPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (interestContainer :  gw.api.contact.AdditionalInterestContainer, acctContact :  AccountContact) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.NewAdditionalInterestPopup, {interestContainer, acctContact}, 1)
  }
  
  static function createDestination (interestContainer :  gw.api.contact.AdditionalInterestContainer, contactType :  ContactType) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.NewAdditionalInterestPopup, {interestContainer, contactType}, 0)
  }
  
  function pickValueAndCommit (value :  AddlInterestDetail) : void {
    __widgetOf(this, pcf.NewAdditionalInterestPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (interestContainer :  gw.api.contact.AdditionalInterestContainer, acctContact :  AccountContact) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewAdditionalInterestPopup, {interestContainer, acctContact}, 1).push()
  }
  
  static function push (interestContainer :  gw.api.contact.AdditionalInterestContainer, contactType :  ContactType) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewAdditionalInterestPopup, {interestContainer, contactType}, 0).push()
  }
  
  
}