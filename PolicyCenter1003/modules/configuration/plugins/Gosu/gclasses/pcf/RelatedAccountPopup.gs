package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/RelatedAccountPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RelatedAccountPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (account :  Account) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.RelatedAccountPopup, {account}, 0)
  }
  
  static function createDestination (account :  Account, accountAccount :  AccountAccount) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.RelatedAccountPopup, {account, accountAccount}, 1)
  }
  
  function pickValueAndCommit (value :  AccountAccount) : void {
    __widgetOf(this, pcf.RelatedAccountPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (account :  Account) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RelatedAccountPopup, {account}, 0).push()
  }
  
  static function push (account :  Account, accountAccount :  AccountAccount) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RelatedAccountPopup, {account, accountAccount}, 1).push()
  }
  
  
}