package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/desktop/summary.federated/FederatedMySummary.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class FederatedMySummary extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (user :  User) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.FederatedMySummary, {user}, 0)
  }
  
  static function drilldown (user :  User) : pcf.api.Location {
    return __newDestinationForLocation(pcf.FederatedMySummary, {user}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (user :  User) : pcf.api.Location {
    return __newDestinationForLocation(pcf.FederatedMySummary, {user}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (user :  User) : pcf.api.Location {
    return __newDestinationForLocation(pcf.FederatedMySummary, {user}, 0).goInMain()
  }
  
  static function printPage (user :  User) : pcf.api.Location {
    return __newDestinationForLocation(pcf.FederatedMySummary, {user}, 0).printPage()
  }
  
  static function push (user :  User) : pcf.api.Location {
    return __newDestinationForLocation(pcf.FederatedMySummary, {user}, 0).push()
  }
  
  
}