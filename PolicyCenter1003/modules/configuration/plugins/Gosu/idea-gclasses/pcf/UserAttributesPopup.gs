package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/UserAttributesPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class UserAttributesPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination () : pcf.api.Destination {
    return __newDestinationForLocation(pcf.UserAttributesPopup, {}, 0)
  }
  
  function pickValueAndCommit (value :  Attribute[]) : void {
    __widgetOf(this, pcf.UserAttributesPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push () : pcf.api.Location {
    return __newDestinationForLocation(pcf.UserAttributesPopup, {}, 0).push()
  }
  
  
}