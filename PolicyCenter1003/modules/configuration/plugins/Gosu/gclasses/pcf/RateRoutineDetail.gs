package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/rating/RateRoutineDetail.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RateRoutineDetail extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (rateroutine :  CalcRoutineDefinition) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.RateRoutineDetail, {rateroutine}, 0)
  }
  
  static function createDestination (rateroutine :  CalcRoutineDefinition, rateBook :  RateBook) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.RateRoutineDetail, {rateroutine, rateBook}, 2)
  }
  
  static function createDestination (rateroutine :  CalcRoutineDefinition, displayImportMessage :  boolean) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.RateRoutineDetail, {rateroutine, displayImportMessage}, 1)
  }
  
  static function drilldown (rateroutine :  CalcRoutineDefinition) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateRoutineDetail, {rateroutine}, 0).drilldown()
  }
  
  static function drilldown (rateroutine :  CalcRoutineDefinition, rateBook :  RateBook) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateRoutineDetail, {rateroutine, rateBook}, 2).drilldown()
  }
  
  static function drilldown (rateroutine :  CalcRoutineDefinition, displayImportMessage :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateRoutineDetail, {rateroutine, displayImportMessage}, 1).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (rateroutine :  CalcRoutineDefinition) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateRoutineDetail, {rateroutine}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (rateroutine :  CalcRoutineDefinition, rateBook :  RateBook) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateRoutineDetail, {rateroutine, rateBook}, 2).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (rateroutine :  CalcRoutineDefinition, displayImportMessage :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateRoutineDetail, {rateroutine, displayImportMessage}, 1).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (rateroutine :  CalcRoutineDefinition) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateRoutineDetail, {rateroutine}, 0).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (rateroutine :  CalcRoutineDefinition, rateBook :  RateBook) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateRoutineDetail, {rateroutine, rateBook}, 2).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (rateroutine :  CalcRoutineDefinition, displayImportMessage :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateRoutineDetail, {rateroutine, displayImportMessage}, 1).goInMain()
  }
  
  static function printPage (rateroutine :  CalcRoutineDefinition) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateRoutineDetail, {rateroutine}, 0).printPage()
  }
  
  static function printPage (rateroutine :  CalcRoutineDefinition, rateBook :  RateBook) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateRoutineDetail, {rateroutine, rateBook}, 2).printPage()
  }
  
  static function printPage (rateroutine :  CalcRoutineDefinition, displayImportMessage :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateRoutineDetail, {rateroutine, displayImportMessage}, 1).printPage()
  }
  
  static function push (rateroutine :  CalcRoutineDefinition) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateRoutineDetail, {rateroutine}, 0).push()
  }
  
  static function push (rateroutine :  CalcRoutineDefinition, rateBook :  RateBook) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateRoutineDetail, {rateroutine, rateBook}, 2).push()
  }
  
  static function push (rateroutine :  CalcRoutineDefinition, displayImportMessage :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateRoutineDetail, {rateroutine, displayImportMessage}, 1).push()
  }
  
  
}