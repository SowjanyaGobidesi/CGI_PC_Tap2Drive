package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/shared/contacts/ContactSearchPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ContactSearchPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (accountContactRoleTypeToGetContactFor :  typekey.AccountContactRole) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ContactSearchPopup, {accountContactRoleTypeToGetContactFor}, 1)
  }
  
  static function createDestination (accountContactRoleTypeToGetContactFor :  typekey.AccountContactRole, product :  gw.api.productmodel.Product) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ContactSearchPopup, {accountContactRoleTypeToGetContactFor, product}, 0)
  }
  
  static function createDestination (availableSubtypes :  typekey.Contact[]) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ContactSearchPopup, {availableSubtypes}, 2)
  }
  
  function pickValueAndCommit (value :  Contact) : void {
    __widgetOf(this, pcf.ContactSearchPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (accountContactRoleTypeToGetContactFor :  typekey.AccountContactRole) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ContactSearchPopup, {accountContactRoleTypeToGetContactFor}, 1).push()
  }
  
  static function push (accountContactRoleTypeToGetContactFor :  typekey.AccountContactRole, product :  gw.api.productmodel.Product) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ContactSearchPopup, {accountContactRoleTypeToGetContactFor, product}, 0).push()
  }
  
  static function push (availableSubtypes :  typekey.Contact[]) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ContactSearchPopup, {availableSubtypes}, 2).push()
  }
  
  
}