package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/search/AdminProducerCodeSearchPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AdminProducerCodeSearchPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination () : pcf.api.Destination {
    return __newDestinationForLocation(pcf.AdminProducerCodeSearchPopup, {}, 0)
  }
  
  static function createDestination (producer :  Organization) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.AdminProducerCodeSearchPopup, {producer}, 1)
  }
  
  static function createDestination (producer :  Organization, filter :  java.util.Set, havingRoles :  boolean) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.AdminProducerCodeSearchPopup, {producer, filter, havingRoles}, 2)
  }
  
  function pickValueAndCommit (value :  ProducerCode) : void {
    __widgetOf(this, pcf.AdminProducerCodeSearchPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push () : pcf.api.Location {
    return __newDestinationForLocation(pcf.AdminProducerCodeSearchPopup, {}, 0).push()
  }
  
  static function push (producer :  Organization) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AdminProducerCodeSearchPopup, {producer}, 1).push()
  }
  
  static function push (producer :  Organization, filter :  java.util.Set, havingRoles :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AdminProducerCodeSearchPopup, {producer, filter, havingRoles}, 2).push()
  }
  
  
}