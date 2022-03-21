package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/forms/RateRoutineNewVariablePopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RateRoutineNewVariablePopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (step :  CalcStepDefinition, costDataUsages :  java.util.List<gw.rating.flow.util.InScopeUsage>) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.RateRoutineNewVariablePopup, {step, costDataUsages}, 0)
  }
  
  static function push (step :  CalcStepDefinition, costDataUsages :  java.util.List<gw.rating.flow.util.InScopeUsage>) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateRoutineNewVariablePopup, {step, costDataUsages}, 0).push()
  }
  
  
}