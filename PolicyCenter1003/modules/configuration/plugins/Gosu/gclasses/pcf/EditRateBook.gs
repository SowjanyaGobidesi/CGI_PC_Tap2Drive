package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/rating/EditRateBook.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class EditRateBook extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (ratebook :  RateBook) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.EditRateBook, {ratebook}, 0)
  }
  
  static function createDestination (ratebook :  RateBook, currentCard :  gw.rating.rtm.util.RatingUIUtil.RateBookCardTabType) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.EditRateBook, {ratebook, currentCard}, 1)
  }
  
  static function drilldown (ratebook :  RateBook) : pcf.api.Location {
    return __newDestinationForLocation(pcf.EditRateBook, {ratebook}, 0).drilldown()
  }
  
  static function drilldown (ratebook :  RateBook, currentCard :  gw.rating.rtm.util.RatingUIUtil.RateBookCardTabType) : pcf.api.Location {
    return __newDestinationForLocation(pcf.EditRateBook, {ratebook, currentCard}, 1).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (ratebook :  RateBook) : pcf.api.Location {
    return __newDestinationForLocation(pcf.EditRateBook, {ratebook}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (ratebook :  RateBook, currentCard :  gw.rating.rtm.util.RatingUIUtil.RateBookCardTabType) : pcf.api.Location {
    return __newDestinationForLocation(pcf.EditRateBook, {ratebook, currentCard}, 1).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (ratebook :  RateBook) : pcf.api.Location {
    return __newDestinationForLocation(pcf.EditRateBook, {ratebook}, 0).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (ratebook :  RateBook, currentCard :  gw.rating.rtm.util.RatingUIUtil.RateBookCardTabType) : pcf.api.Location {
    return __newDestinationForLocation(pcf.EditRateBook, {ratebook, currentCard}, 1).goInMain()
  }
  
  static function printPage (ratebook :  RateBook) : pcf.api.Location {
    return __newDestinationForLocation(pcf.EditRateBook, {ratebook}, 0).printPage()
  }
  
  static function printPage (ratebook :  RateBook, currentCard :  gw.rating.rtm.util.RatingUIUtil.RateBookCardTabType) : pcf.api.Location {
    return __newDestinationForLocation(pcf.EditRateBook, {ratebook, currentCard}, 1).printPage()
  }
  
  static function push (ratebook :  RateBook) : pcf.api.Location {
    return __newDestinationForLocation(pcf.EditRateBook, {ratebook}, 0).push()
  }
  
  static function push (ratebook :  RateBook, currentCard :  gw.rating.rtm.util.RatingUIUtil.RateBookCardTabType) : pcf.api.Location {
    return __newDestinationForLocation(pcf.EditRateBook, {ratebook, currentCard}, 1).push()
  }
  
  
}