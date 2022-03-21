package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/flowmeta/DataFlowMaskDetailPage.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class DataFlowMaskDetailPage extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (mask :  EntityFlowMaskData) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.DataFlowMaskDetailPage, {mask}, 0)
  }
  
  static function drilldown (mask :  EntityFlowMaskData) : pcf.api.Location {
    return __newDestinationForLocation(pcf.DataFlowMaskDetailPage, {mask}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (mask :  EntityFlowMaskData) : pcf.api.Location {
    return __newDestinationForLocation(pcf.DataFlowMaskDetailPage, {mask}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (mask :  EntityFlowMaskData) : pcf.api.Location {
    return __newDestinationForLocation(pcf.DataFlowMaskDetailPage, {mask}, 0).goInMain()
  }
  
  static function printPage (mask :  EntityFlowMaskData) : pcf.api.Location {
    return __newDestinationForLocation(pcf.DataFlowMaskDetailPage, {mask}, 0).printPage()
  }
  
  static function push (mask :  EntityFlowMaskData) : pcf.api.Location {
    return __newDestinationForLocation(pcf.DataFlowMaskDetailPage, {mask}, 0).push()
  }
  
  
}