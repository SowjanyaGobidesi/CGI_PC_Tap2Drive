package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/ProducerTreePopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ProducerTreePopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (organizationView :  Organization) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ProducerTreePopup, {organizationView}, 0)
  }
  
  function pickValueAndCommit (value :  User) : void {
    __widgetOf(this, pcf.ProducerTreePopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (organizationView :  Organization) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ProducerTreePopup, {organizationView}, 0).push()
  }
  
  
}