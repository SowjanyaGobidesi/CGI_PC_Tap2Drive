package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/exitpoints/CreateClaim.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CreateClaim extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (claimSystemUrl :  String, policyNumber :  String) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.CreateClaim, {claimSystemUrl, policyNumber}, 0)
  }
  
  static function drilldown (claimSystemUrl :  String, policyNumber :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CreateClaim, {claimSystemUrl, policyNumber}, 0).drilldown()
  }
  
  static function printPage (claimSystemUrl :  String, policyNumber :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CreateClaim, {claimSystemUrl, policyNumber}, 0).printPage()
  }
  
  static function push (claimSystemUrl :  String, policyNumber :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CreateClaim, {claimSystemUrl, policyNumber}, 0).push()
  }
  
  
}