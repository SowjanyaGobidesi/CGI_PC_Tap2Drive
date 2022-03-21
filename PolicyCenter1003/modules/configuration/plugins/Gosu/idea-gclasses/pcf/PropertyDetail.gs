package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/properties/PropertyDetail.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PropertyDetail extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (runtimeProperty :  RuntimeProperty) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.PropertyDetail, {runtimeProperty}, 0)
  }
  
  static function drilldown (runtimeProperty :  RuntimeProperty) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PropertyDetail, {runtimeProperty}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (runtimeProperty :  RuntimeProperty) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PropertyDetail, {runtimeProperty}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (runtimeProperty :  RuntimeProperty) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PropertyDetail, {runtimeProperty}, 0).goInMain()
  }
  
  static function printPage (runtimeProperty :  RuntimeProperty) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PropertyDetail, {runtimeProperty}, 0).printPage()
  }
  
  static function push (runtimeProperty :  RuntimeProperty) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PropertyDetail, {runtimeProperty}, 0).push()
  }
  
  
}