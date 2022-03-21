package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/rating/RateTableDefinitionDetail.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class RateTableDefinitionDetail extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (tableDefinition :  RateTableDefinition) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.RateTableDefinitionDetail, {tableDefinition}, 0)
  }
  
  static function drilldown (tableDefinition :  RateTableDefinition) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateTableDefinitionDetail, {tableDefinition}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (tableDefinition :  RateTableDefinition) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateTableDefinitionDetail, {tableDefinition}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (tableDefinition :  RateTableDefinition) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateTableDefinitionDetail, {tableDefinition}, 0).goInMain()
  }
  
  static function printPage (tableDefinition :  RateTableDefinition) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateTableDefinitionDetail, {tableDefinition}, 0).printPage()
  }
  
  static function push (tableDefinition :  RateTableDefinition) : pcf.api.Location {
    return __newDestinationForLocation(pcf.RateTableDefinitionDetail, {tableDefinition}, 0).push()
  }
  
  
}