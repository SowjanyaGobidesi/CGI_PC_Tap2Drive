package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/exitpoints/Mailto.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class Mailto extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (email :  String) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.Mailto, {email}, 0)
  }
  
  static function drilldown (email :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.Mailto, {email}, 0).drilldown()
  }
  
  static function printPage (email :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.Mailto, {email}, 0).printPage()
  }
  
  static function push (email :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.Mailto, {email}, 0).push()
  }
  
  
}