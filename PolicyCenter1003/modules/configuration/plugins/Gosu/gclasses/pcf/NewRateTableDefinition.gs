package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/rating/NewRateTableDefinition.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class NewRateTableDefinition extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination () : pcf.api.Destination {
    return __newDestinationForLocation(pcf.NewRateTableDefinition, {}, 0)
  }
  
  static function createDestination (definitionToCopy :  RateTableDefinition) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.NewRateTableDefinition, {definitionToCopy}, 1)
  }
  
  static function drilldown () : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewRateTableDefinition, {}, 0).drilldown()
  }
  
  static function drilldown (definitionToCopy :  RateTableDefinition) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewRateTableDefinition, {definitionToCopy}, 1).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go () : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewRateTableDefinition, {}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (definitionToCopy :  RateTableDefinition) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewRateTableDefinition, {definitionToCopy}, 1).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain () : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewRateTableDefinition, {}, 0).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (definitionToCopy :  RateTableDefinition) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewRateTableDefinition, {definitionToCopy}, 1).goInMain()
  }
  
  static function printPage () : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewRateTableDefinition, {}, 0).printPage()
  }
  
  static function printPage (definitionToCopy :  RateTableDefinition) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewRateTableDefinition, {definitionToCopy}, 1).printPage()
  }
  
  static function push () : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewRateTableDefinition, {}, 0).push()
  }
  
  static function push (definitionToCopy :  RateTableDefinition) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewRateTableDefinition, {definitionToCopy}, 1).push()
  }
  
  
}