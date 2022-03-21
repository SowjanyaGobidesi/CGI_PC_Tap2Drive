package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/contacts/NewAccountContactPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class NewAccountContactPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (acct :  Account, acRoleType :  typekey.AccountContactRole, contactType :  typekey.ContactType) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.NewAccountContactPopup, {acct, acRoleType, contactType}, 0)
  }
  
  function pickValueAndCommit (value :  AccountContact) : void {
    __widgetOf(this, pcf.NewAccountContactPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (acct :  Account, acRoleType :  typekey.AccountContactRole, contactType :  typekey.ContactType) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewAccountContactPopup, {acct, acRoleType, contactType}, 0).push()
  }
  
  
}