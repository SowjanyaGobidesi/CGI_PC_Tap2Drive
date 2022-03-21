package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/rating/VersionRateBook.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class VersionRateBook extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (rateBookToCopy :  RateBook) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.VersionRateBook, {rateBookToCopy}, 0)
  }
  
  static function drilldown (rateBookToCopy :  RateBook) : pcf.api.Location {
    return __newDestinationForLocation(pcf.VersionRateBook, {rateBookToCopy}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (rateBookToCopy :  RateBook) : pcf.api.Location {
    return __newDestinationForLocation(pcf.VersionRateBook, {rateBookToCopy}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (rateBookToCopy :  RateBook) : pcf.api.Location {
    return __newDestinationForLocation(pcf.VersionRateBook, {rateBookToCopy}, 0).goInMain()
  }
  
  static function printPage (rateBookToCopy :  RateBook) : pcf.api.Location {
    return __newDestinationForLocation(pcf.VersionRateBook, {rateBookToCopy}, 0).printPage()
  }
  
  static function push (rateBookToCopy :  RateBook) : pcf.api.Location {
    return __newDestinationForLocation(pcf.VersionRateBook, {rateBookToCopy}, 0).push()
  }
  
  
}