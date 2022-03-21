package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/tools/infopages/LoadHistoryOps.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class LoadHistoryOps extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (History :  LoadCommand, DispStep :  gw.api.tools.LoadStepDisplayable, PageHelper :  gw.api.tools.LoadHistoryHelper) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.LoadHistoryOps, {History, DispStep, PageHelper}, 0)
  }
  
  static function drilldown (History :  LoadCommand, DispStep :  gw.api.tools.LoadStepDisplayable, PageHelper :  gw.api.tools.LoadHistoryHelper) : pcf.api.Location {
    return __newDestinationForLocation(pcf.LoadHistoryOps, {History, DispStep, PageHelper}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (History :  LoadCommand, DispStep :  gw.api.tools.LoadStepDisplayable, PageHelper :  gw.api.tools.LoadHistoryHelper) : pcf.api.Location {
    return __newDestinationForLocation(pcf.LoadHistoryOps, {History, DispStep, PageHelper}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (History :  LoadCommand, DispStep :  gw.api.tools.LoadStepDisplayable, PageHelper :  gw.api.tools.LoadHistoryHelper) : pcf.api.Location {
    return __newDestinationForLocation(pcf.LoadHistoryOps, {History, DispStep, PageHelper}, 0).goInMain()
  }
  
  static function printPage (History :  LoadCommand, DispStep :  gw.api.tools.LoadStepDisplayable, PageHelper :  gw.api.tools.LoadHistoryHelper) : pcf.api.Location {
    return __newDestinationForLocation(pcf.LoadHistoryOps, {History, DispStep, PageHelper}, 0).printPage()
  }
  
  static function push (History :  LoadCommand, DispStep :  gw.api.tools.LoadStepDisplayable, PageHelper :  gw.api.tools.LoadHistoryHelper) : pcf.api.Location {
    return __newDestinationForLocation(pcf.LoadHistoryOps, {History, DispStep, PageHelper}, 0).push()
  }
  
  
}