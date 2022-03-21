package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/rating/ConfigureRateRoutine.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ConfigureRateRoutine extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (isNewRoutine :  boolean, srcRateRoutine :  CalcRoutineDefinition, copyVersionType :  gw.rating.flow.util.CopyVersionType) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ConfigureRateRoutine, {isNewRoutine, srcRateRoutine, copyVersionType}, 0)
  }
  
  static function drilldown (isNewRoutine :  boolean, srcRateRoutine :  CalcRoutineDefinition, copyVersionType :  gw.rating.flow.util.CopyVersionType) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ConfigureRateRoutine, {isNewRoutine, srcRateRoutine, copyVersionType}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (isNewRoutine :  boolean, srcRateRoutine :  CalcRoutineDefinition, copyVersionType :  gw.rating.flow.util.CopyVersionType) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ConfigureRateRoutine, {isNewRoutine, srcRateRoutine, copyVersionType}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (isNewRoutine :  boolean, srcRateRoutine :  CalcRoutineDefinition, copyVersionType :  gw.rating.flow.util.CopyVersionType) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ConfigureRateRoutine, {isNewRoutine, srcRateRoutine, copyVersionType}, 0).goInMain()
  }
  
  static function printPage (isNewRoutine :  boolean, srcRateRoutine :  CalcRoutineDefinition, copyVersionType :  gw.rating.flow.util.CopyVersionType) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ConfigureRateRoutine, {isNewRoutine, srcRateRoutine, copyVersionType}, 0).printPage()
  }
  
  static function push (isNewRoutine :  boolean, srcRateRoutine :  CalcRoutineDefinition, copyVersionType :  gw.rating.flow.util.CopyVersionType) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ConfigureRateRoutine, {isNewRoutine, srcRateRoutine, copyVersionType}, 0).push()
  }
  
  
}