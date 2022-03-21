package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/shared/userselect/UserSelectPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class UserSelectPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination () : pcf.api.Destination {
    return __newDestinationForLocation(pcf.UserSelectPopup, {}, 0)
  }
  
  function pickValueAndCommit (value :  User) : void {
    __widgetOf(this, pcf.UserSelectPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push () : pcf.api.Location {
    return __newDestinationForLocation(pcf.UserSelectPopup, {}, 0).push()
  }
  
  
}