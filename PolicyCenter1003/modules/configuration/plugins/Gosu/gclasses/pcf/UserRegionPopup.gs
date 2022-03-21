package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/users/UserRegionPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class UserRegionPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination () : pcf.api.Destination {
    return __newDestinationForLocation(pcf.UserRegionPopup, {}, 0)
  }
  
  function pickValueAndCommit (value :  Region[]) : void {
    __widgetOf(this, pcf.UserRegionPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push () : pcf.api.Location {
    return __newDestinationForLocation(pcf.UserRegionPopup, {}, 0).push()
  }
  
  
}