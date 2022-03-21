package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/rating/RateTableFactorList.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RateTableFactorList extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (controller :  gw.rating.rtm.domain.RateTableFactorListController, rateTable :  RateTable, rateBook :  RateBook) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.RateTableFactorList, {controller, rateTable, rateBook}, 0)
  }
  
  static function drilldown (controller :  gw.rating.rtm.domain.RateTableFactorListController, rateTable :  RateTable, rateBook :  RateBook) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateTableFactorList, {controller, rateTable, rateBook}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (controller :  gw.rating.rtm.domain.RateTableFactorListController, rateTable :  RateTable, rateBook :  RateBook) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateTableFactorList, {controller, rateTable, rateBook}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (controller :  gw.rating.rtm.domain.RateTableFactorListController, rateTable :  RateTable, rateBook :  RateBook) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateTableFactorList, {controller, rateTable, rateBook}, 0).goInMain()
  }
  
  static function printPage (controller :  gw.rating.rtm.domain.RateTableFactorListController, rateTable :  RateTable, rateBook :  RateBook) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateTableFactorList, {controller, rateTable, rateBook}, 0).printPage()
  }
  
  static function push (controller :  gw.rating.rtm.domain.RateTableFactorListController, rateTable :  RateTable, rateBook :  RateBook) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateTableFactorList, {controller, rateTable, rateBook}, 0).push()
  }
  
  
}