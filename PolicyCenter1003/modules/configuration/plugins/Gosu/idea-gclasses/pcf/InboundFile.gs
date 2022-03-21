package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/inbound/InboundFile.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class InboundFile extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (file :  InboundFileView) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.InboundFile, {file}, 0)
  }
  
  static function drilldown (file :  InboundFileView) : pcf.api.Location {
    return __newDestinationForLocation(pcf.InboundFile, {file}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (file :  InboundFileView) : pcf.api.Location {
    return __newDestinationForLocation(pcf.InboundFile, {file}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (file :  InboundFileView) : pcf.api.Location {
    return __newDestinationForLocation(pcf.InboundFile, {file}, 0).goInMain()
  }
  
  static function printPage (file :  InboundFileView) : pcf.api.Location {
    return __newDestinationForLocation(pcf.InboundFile, {file}, 0).printPage()
  }
  
  static function push (file :  InboundFileView) : pcf.api.Location {
    return __newDestinationForLocation(pcf.InboundFile, {file}, 0).push()
  }
  
  
}