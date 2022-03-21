package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/util/Login.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class Login extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (target :  pcf.api.Destination, entryException :  java.lang.Exception) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.Login, {target, entryException}, 0)
  }
  
  static function drilldown (target :  pcf.api.Destination, entryException :  java.lang.Exception) : pcf.api.Location {
    return __newDestinationForLocation(pcf.Login, {target, entryException}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (target :  pcf.api.Destination, entryException :  java.lang.Exception) : pcf.api.Location {
    return __newDestinationForLocation(pcf.Login, {target, entryException}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (target :  pcf.api.Destination, entryException :  java.lang.Exception) : pcf.api.Location {
    return __newDestinationForLocation(pcf.Login, {target, entryException}, 0).goInMain()
  }
  
  static function printPage (target :  pcf.api.Destination, entryException :  java.lang.Exception) : pcf.api.Location {
    return __newDestinationForLocation(pcf.Login, {target, entryException}, 0).printPage()
  }
  
  static function push (target :  pcf.api.Destination, entryException :  java.lang.Exception) : pcf.api.Location {
    return __newDestinationForLocation(pcf.Login, {target, entryException}, 0).push()
  }
  
  
}