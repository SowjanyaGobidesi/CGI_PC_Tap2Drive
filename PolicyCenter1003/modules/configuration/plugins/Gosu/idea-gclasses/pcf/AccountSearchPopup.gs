package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/search/AccountSearchPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AccountSearchPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination () : pcf.api.Destination {
    return __newDestinationForLocation(pcf.AccountSearchPopup, {}, 0)
  }
  
  static function createDestination (relatedToAccount :  Account) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.AccountSearchPopup, {relatedToAccount}, 1)
  }
  
  function pickValueAndCommit (value :  Account) : void {
    __widgetOf(this, pcf.AccountSearchPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push () : pcf.api.Location {
    return __newDestinationForLocation(pcf.AccountSearchPopup, {}, 0).push()
  }
  
  static function push (relatedToAccount :  Account) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AccountSearchPopup, {relatedToAccount}, 1).push()
  }
  
  
}