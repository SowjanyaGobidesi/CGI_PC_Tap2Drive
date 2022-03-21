package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/flowmeta/NewDataFlowMask.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class NewDataFlowMask extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (initialEntityType :  Type) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.NewDataFlowMask, {initialEntityType}, 0)
  }
  
  static function drilldown (initialEntityType :  Type) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewDataFlowMask, {initialEntityType}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (initialEntityType :  Type) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewDataFlowMask, {initialEntityType}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (initialEntityType :  Type) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewDataFlowMask, {initialEntityType}, 0).goInMain()
  }
  
  static function printPage (initialEntityType :  Type) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewDataFlowMask, {initialEntityType}, 0).printPage()
  }
  
  static function push (initialEntityType :  Type) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewDataFlowMask, {initialEntityType}, 0).push()
  }
  
  
}