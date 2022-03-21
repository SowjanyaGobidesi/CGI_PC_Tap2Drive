package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/outboundfile/OutboundFile.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class OutboundFile extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (file :  OutboundFile) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.OutboundFile, {file}, 0)
  }
  
  static function drilldown (file :  OutboundFile) : pcf.api.Location {
    return __newDestinationForLocation(pcf.OutboundFile, {file}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (file :  OutboundFile) : pcf.api.Location {
    return __newDestinationForLocation(pcf.OutboundFile, {file}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (file :  OutboundFile) : pcf.api.Location {
    return __newDestinationForLocation(pcf.OutboundFile, {file}, 0).goInMain()
  }
  
  static function printPage (file :  OutboundFile) : pcf.api.Location {
    return __newDestinationForLocation(pcf.OutboundFile, {file}, 0).printPage()
  }
  
  static function push (file :  OutboundFile) : pcf.api.Location {
    return __newDestinationForLocation(pcf.OutboundFile, {file}, 0).push()
  }
  
  
}