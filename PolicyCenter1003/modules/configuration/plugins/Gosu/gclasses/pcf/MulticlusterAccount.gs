package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/desktop/exitpoints/MulticlusterAccount.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class MulticlusterAccount extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (clusterUrl :  String, accountNumber :  String) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.MulticlusterAccount, {clusterUrl, accountNumber}, 0)
  }
  
  static function drilldown (clusterUrl :  String, accountNumber :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.MulticlusterAccount, {clusterUrl, accountNumber}, 0).drilldown()
  }
  
  static function printPage (clusterUrl :  String, accountNumber :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.MulticlusterAccount, {clusterUrl, accountNumber}, 0).printPage()
  }
  
  static function push (clusterUrl :  String, accountNumber :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.MulticlusterAccount, {clusterUrl, accountNumber}, 0).push()
  }
  
  
}