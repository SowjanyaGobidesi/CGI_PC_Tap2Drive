package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/exitpoints/ViewClaim.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ViewClaim extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (claimSystemURL :  String, claimNumber :  String) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ViewClaim, {claimSystemURL, claimNumber}, 0)
  }
  
  static function drilldown (claimSystemURL :  String, claimNumber :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ViewClaim, {claimSystemURL, claimNumber}, 0).drilldown()
  }
  
  static function printPage (claimSystemURL :  String, claimNumber :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ViewClaim, {claimSystemURL, claimNumber}, 0).printPage()
  }
  
  static function push (claimSystemURL :  String, claimNumber :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ViewClaim, {claimSystemURL, claimNumber}, 0).push()
  }
  
  
}