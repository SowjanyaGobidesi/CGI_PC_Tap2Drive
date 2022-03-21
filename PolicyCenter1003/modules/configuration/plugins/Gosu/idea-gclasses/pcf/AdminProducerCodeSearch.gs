package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/search/AdminProducerCodeSearch.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AdminProducerCodeSearch extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination () : pcf.api.Destination {
    return __newDestinationForLocation(pcf.AdminProducerCodeSearch, {}, 0)
  }
  
  static function createDestination (producer :  Organization) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.AdminProducerCodeSearch, {producer}, 1)
  }
  
  static function drilldown () : pcf.api.Location {
    return __newDestinationForLocation(pcf.AdminProducerCodeSearch, {}, 0).drilldown()
  }
  
  static function drilldown (producer :  Organization) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AdminProducerCodeSearch, {producer}, 1).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go () : pcf.api.Location {
    return __newDestinationForLocation(pcf.AdminProducerCodeSearch, {}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (producer :  Organization) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AdminProducerCodeSearch, {producer}, 1).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain () : pcf.api.Location {
    return __newDestinationForLocation(pcf.AdminProducerCodeSearch, {}, 0).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (producer :  Organization) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AdminProducerCodeSearch, {producer}, 1).goInMain()
  }
  
  static function printPage () : pcf.api.Location {
    return __newDestinationForLocation(pcf.AdminProducerCodeSearch, {}, 0).printPage()
  }
  
  static function printPage (producer :  Organization) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AdminProducerCodeSearch, {producer}, 1).printPage()
  }
  
  static function push () : pcf.api.Location {
    return __newDestinationForLocation(pcf.AdminProducerCodeSearch, {}, 0).push()
  }
  
  static function push (producer :  Organization) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AdminProducerCodeSearch, {producer}, 1).push()
  }
  
  
}