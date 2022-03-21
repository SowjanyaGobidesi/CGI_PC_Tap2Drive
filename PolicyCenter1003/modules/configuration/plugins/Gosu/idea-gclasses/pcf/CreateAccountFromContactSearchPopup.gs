package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/new/CreateAccountFromContactSearchPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CreateAccountFromContactSearchPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (accountSearchCriteria :  gw.account.AccountSearchCriteria) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.CreateAccountFromContactSearchPopup, {accountSearchCriteria}, 0)
  }
  
  function pickValueAndCommit (value :  Contact) : void {
    __widgetOf(this, pcf.CreateAccountFromContactSearchPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (accountSearchCriteria :  gw.account.AccountSearchCriteria) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CreateAccountFromContactSearchPopup, {accountSearchCriteria}, 0).push()
  }
  
  
}