package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/account/SearchRelatedAccountPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class SearchRelatedAccountPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination () : pcf.api.Destination {
    return __newDestinationForLocation(pcf.SearchRelatedAccountPopup, {}, 0)
  }
  
  function pickValueAndCommit (value :  Account) : void {
    __widgetOf(this, pcf.SearchRelatedAccountPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push () : pcf.api.Location {
    return __newDestinationForLocation(pcf.SearchRelatedAccountPopup, {}, 0).push()
  }
  
  
}