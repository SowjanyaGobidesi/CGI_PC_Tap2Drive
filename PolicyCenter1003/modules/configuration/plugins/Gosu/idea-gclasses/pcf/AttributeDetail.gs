package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/AttributeDetail.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class AttributeDetail extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (attribute :  Attribute) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.AttributeDetail, {attribute}, 0)
  }
  
  static function drilldown (attribute :  Attribute) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AttributeDetail, {attribute}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (attribute :  Attribute) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AttributeDetail, {attribute}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (attribute :  Attribute) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AttributeDetail, {attribute}, 0).goInMain()
  }
  
  static function printPage (attribute :  Attribute) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AttributeDetail, {attribute}, 0).printPage()
  }
  
  static function push (attribute :  Attribute) : pcf.api.Location {
    return __newDestinationForLocation(pcf.AttributeDetail, {attribute}, 0).push()
  }
  
  
}