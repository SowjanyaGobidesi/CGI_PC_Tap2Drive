package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/desktop/exitpoints/MulticlusterNewSubmission.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class MulticlusterNewSubmission extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (clusterUrl :  String) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.MulticlusterNewSubmission, {clusterUrl}, 0)
  }
  
  static function drilldown (clusterUrl :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.MulticlusterNewSubmission, {clusterUrl}, 0).drilldown()
  }
  
  static function printPage (clusterUrl :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.MulticlusterNewSubmission, {clusterUrl}, 0).printPage()
  }
  
  static function push (clusterUrl :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.MulticlusterNewSubmission, {clusterUrl}, 0).push()
  }
  
  
}