package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/rating/RateBooks.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RateBooks extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination () : pcf.api.Destination {
    return __newDestinationForLocation(pcf.RateBooks, {}, 0)
  }
  
  static function createDestination (initialRateBook :  RateBook) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.RateBooks, {initialRateBook}, 1)
  }
  
  static function createDestination (initialRateBook :  RateBook, displayImportResults :  boolean) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.RateBooks, {initialRateBook, displayImportResults}, 2)
  }
  
  static function drilldown () : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateBooks, {}, 0).drilldown()
  }
  
  static function drilldown (initialRateBook :  RateBook) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateBooks, {initialRateBook}, 1).drilldown()
  }
  
  static function drilldown (initialRateBook :  RateBook, displayImportResults :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateBooks, {initialRateBook, displayImportResults}, 2).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go () : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateBooks, {}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (initialRateBook :  RateBook) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateBooks, {initialRateBook}, 1).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (initialRateBook :  RateBook, displayImportResults :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateBooks, {initialRateBook, displayImportResults}, 2).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain () : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateBooks, {}, 0).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (initialRateBook :  RateBook) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateBooks, {initialRateBook}, 1).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (initialRateBook :  RateBook, displayImportResults :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateBooks, {initialRateBook, displayImportResults}, 2).goInMain()
  }
  
  static function printPage () : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateBooks, {}, 0).printPage()
  }
  
  static function printPage (initialRateBook :  RateBook) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateBooks, {initialRateBook}, 1).printPage()
  }
  
  static function printPage (initialRateBook :  RateBook, displayImportResults :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateBooks, {initialRateBook, displayImportResults}, 2).printPage()
  }
  
  static function push () : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateBooks, {}, 0).push()
  }
  
  static function push (initialRateBook :  RateBook) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateBooks, {initialRateBook}, 1).push()
  }
  
  static function push (initialRateBook :  RateBook, displayImportResults :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateBooks, {initialRateBook, displayImportResults}, 2).push()
  }
  
  
}