package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/search/ProducerCodeSearch.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ProducerCodeSearch extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination () : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ProducerCodeSearch, {}, 0)
  }
  
  static function createDestination (producer :  Organization) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ProducerCodeSearch, {producer}, 1)
  }
  
  static function createDestination (producer :  Organization, forUse :  ProducerStatusUse) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ProducerCodeSearch, {producer, forUse}, 2)
  }
  
  static function drilldown () : pcf.api.Location {
    return __newDestinationForLocation(pcf.ProducerCodeSearch, {}, 0).drilldown()
  }
  
  static function drilldown (producer :  Organization) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ProducerCodeSearch, {producer}, 1).drilldown()
  }
  
  static function drilldown (producer :  Organization, forUse :  ProducerStatusUse) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ProducerCodeSearch, {producer, forUse}, 2).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go () : pcf.api.Location {
    return __newDestinationForLocation(pcf.ProducerCodeSearch, {}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (producer :  Organization) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ProducerCodeSearch, {producer}, 1).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (producer :  Organization, forUse :  ProducerStatusUse) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ProducerCodeSearch, {producer, forUse}, 2).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain () : pcf.api.Location {
    return __newDestinationForLocation(pcf.ProducerCodeSearch, {}, 0).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (producer :  Organization) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ProducerCodeSearch, {producer}, 1).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (producer :  Organization, forUse :  ProducerStatusUse) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ProducerCodeSearch, {producer, forUse}, 2).goInMain()
  }
  
  static function printPage () : pcf.api.Location {
    return __newDestinationForLocation(pcf.ProducerCodeSearch, {}, 0).printPage()
  }
  
  static function printPage (producer :  Organization) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ProducerCodeSearch, {producer}, 1).printPage()
  }
  
  static function printPage (producer :  Organization, forUse :  ProducerStatusUse) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ProducerCodeSearch, {producer, forUse}, 2).printPage()
  }
  
  static function push () : pcf.api.Location {
    return __newDestinationForLocation(pcf.ProducerCodeSearch, {}, 0).push()
  }
  
  static function push (producer :  Organization) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ProducerCodeSearch, {producer}, 1).push()
  }
  
  static function push (producer :  Organization, forUse :  ProducerStatusUse) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ProducerCodeSearch, {producer, forUse}, 2).push()
  }
  
  
}