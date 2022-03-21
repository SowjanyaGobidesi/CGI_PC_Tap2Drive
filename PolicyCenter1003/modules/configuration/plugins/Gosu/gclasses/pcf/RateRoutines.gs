package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/rating/RateRoutines.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RateRoutines extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination () : pcf.api.Destination {
    return __newDestinationForLocation(pcf.RateRoutines, {}, 0)
  }
  
  static function createDestination (initialRateRoutine :  CalcRoutineDefinition) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.RateRoutines, {initialRateRoutine}, 1)
  }
  
  static function createDestination (initialRateRoutine :  CalcRoutineDefinition, displayImportResults :  boolean) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.RateRoutines, {initialRateRoutine, displayImportResults}, 2)
  }
  
  static function drilldown () : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateRoutines, {}, 0).drilldown()
  }
  
  static function drilldown (initialRateRoutine :  CalcRoutineDefinition) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateRoutines, {initialRateRoutine}, 1).drilldown()
  }
  
  static function drilldown (initialRateRoutine :  CalcRoutineDefinition, displayImportResults :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateRoutines, {initialRateRoutine, displayImportResults}, 2).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go () : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateRoutines, {}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (initialRateRoutine :  CalcRoutineDefinition) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateRoutines, {initialRateRoutine}, 1).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (initialRateRoutine :  CalcRoutineDefinition, displayImportResults :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateRoutines, {initialRateRoutine, displayImportResults}, 2).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain () : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateRoutines, {}, 0).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (initialRateRoutine :  CalcRoutineDefinition) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateRoutines, {initialRateRoutine}, 1).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (initialRateRoutine :  CalcRoutineDefinition, displayImportResults :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateRoutines, {initialRateRoutine, displayImportResults}, 2).goInMain()
  }
  
  static function printPage () : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateRoutines, {}, 0).printPage()
  }
  
  static function printPage (initialRateRoutine :  CalcRoutineDefinition) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateRoutines, {initialRateRoutine}, 1).printPage()
  }
  
  static function printPage (initialRateRoutine :  CalcRoutineDefinition, displayImportResults :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateRoutines, {initialRateRoutine, displayImportResults}, 2).printPage()
  }
  
  static function push () : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateRoutines, {}, 0).push()
  }
  
  static function push (initialRateRoutine :  CalcRoutineDefinition) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateRoutines, {initialRateRoutine}, 1).push()
  }
  
  static function push (initialRateRoutine :  CalcRoutineDefinition, displayImportResults :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateRoutines, {initialRateRoutine, displayImportResults}, 2).push()
  }
  
  
}