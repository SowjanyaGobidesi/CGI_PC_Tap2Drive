package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/admin/MultiClusterForward.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class MultiClusterForward extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (locationKey :  String, goToGroup :  boolean) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.MultiClusterForward, {locationKey, goToGroup}, 0)
  }
  
  static function drilldown (locationKey :  String, goToGroup :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.MultiClusterForward, {locationKey, goToGroup}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (locationKey :  String, goToGroup :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.MultiClusterForward, {locationKey, goToGroup}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (locationKey :  String, goToGroup :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.MultiClusterForward, {locationKey, goToGroup}, 0).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInWorkspace (locationKey :  String, goToGroup :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.MultiClusterForward, {locationKey, goToGroup}, 0).goInWorkspace()
  }
  
  static function printPage (locationKey :  String, goToGroup :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.MultiClusterForward, {locationKey, goToGroup}, 0).printPage()
  }
  
  static function push (locationKey :  String, goToGroup :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.MultiClusterForward, {locationKey, goToGroup}, 0).push()
  }
  
  
}