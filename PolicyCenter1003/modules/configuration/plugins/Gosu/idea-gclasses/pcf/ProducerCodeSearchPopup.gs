package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/search/ProducerCodeSearchPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ProducerCodeSearchPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination () : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ProducerCodeSearchPopup, {}, 0)
  }
  
  static function createDestination (producer :  Organization) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ProducerCodeSearchPopup, {producer}, 1)
  }
  
  static function createDestination (producer :  Organization, forUse :  ProducerStatusUse) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ProducerCodeSearchPopup, {producer, forUse}, 2)
  }
  
  function pickValueAndCommit (value :  ProducerCode) : void {
    __widgetOf(this, pcf.ProducerCodeSearchPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push () : pcf.api.Location {
    return __newDestinationForLocation(pcf.ProducerCodeSearchPopup, {}, 0).push()
  }
  
  static function push (producer :  Organization) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ProducerCodeSearchPopup, {producer}, 1).push()
  }
  
  static function push (producer :  Organization, forUse :  ProducerStatusUse) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ProducerCodeSearchPopup, {producer, forUse}, 2).push()
  }
  
  
}