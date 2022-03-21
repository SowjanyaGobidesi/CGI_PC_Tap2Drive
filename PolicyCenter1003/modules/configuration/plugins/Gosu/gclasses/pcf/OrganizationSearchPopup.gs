package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/OrganizationSearchPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class OrganizationSearchPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination () : pcf.api.Destination {
    return __newDestinationForLocation(pcf.OrganizationSearchPopup, {}, 0)
  }
  
  static function createDestination (includesCarrier :  Boolean) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.OrganizationSearchPopup, {includesCarrier}, 1)
  }
  
  static function createDestination (includesCarrier :  Boolean, activeProducersOnly :  Boolean) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.OrganizationSearchPopup, {includesCarrier, activeProducersOnly}, 2)
  }
  
  function pickValueAndCommit (value :  Organization) : void {
    __widgetOf(this, pcf.OrganizationSearchPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push () : pcf.api.Location {
    return __newDestinationForLocation(pcf.OrganizationSearchPopup, {}, 0).push()
  }
  
  static function push (includesCarrier :  Boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.OrganizationSearchPopup, {includesCarrier}, 1).push()
  }
  
  static function push (includesCarrier :  Boolean, activeProducersOnly :  Boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.OrganizationSearchPopup, {includesCarrier, activeProducersOnly}, 2).push()
  }
  
  
}