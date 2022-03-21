package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/contacts/ChangeAccountHolderToNewContactPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ChangeAccountHolderToNewContactPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (acct :  Account, contactType :  typekey.ContactType) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ChangeAccountHolderToNewContactPopup, {acct, contactType}, 0)
  }
  
  function pickValueAndCommit (value :  AccountContact) : void {
    __widgetOf(this, pcf.ChangeAccountHolderToNewContactPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (acct :  Account, contactType :  typekey.ContactType) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ChangeAccountHolderToNewContactPopup, {acct, contactType}, 0).push()
  }
  
  
}