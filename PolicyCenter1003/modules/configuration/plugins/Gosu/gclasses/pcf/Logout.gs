package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/util/Logout.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class Logout extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (url :  String) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.Logout, {url}, 0)
  }
  
  static function drilldown (url :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.Logout, {url}, 0).drilldown()
  }
  
  static function printPage (url :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.Logout, {url}, 0).printPage()
  }
  
  static function push (url :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.Logout, {url}, 0).push()
  }
  
  
}