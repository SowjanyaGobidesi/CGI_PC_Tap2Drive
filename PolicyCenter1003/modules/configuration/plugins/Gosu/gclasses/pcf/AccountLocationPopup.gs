package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/AccountLocationPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AccountLocationPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (theLocation :  AccountLocation, account :  Account, shouldEdit :  boolean) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.AccountLocationPopup, {theLocation, account, shouldEdit}, 0)
  }
  
  function pickValueAndCommit (value :  AccountLocation) : void {
    __widgetOf(this, pcf.AccountLocationPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (theLocation :  AccountLocation, account :  Account, shouldEdit :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AccountLocationPopup, {theLocation, account, shouldEdit}, 0).push()
  }
  
  
}