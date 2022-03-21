package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/exitpoints/ViewInSpotlight.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class ViewInSpotlight extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (spotlightSystemBaseURL :  String, policySystemServerURLPrefix :  String, encodedParamUrl :  String, encodedReturnUrl :  String) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.ViewInSpotlight, {spotlightSystemBaseURL, policySystemServerURLPrefix, encodedParamUrl, encodedReturnUrl}, 0)
  }
  
  static function drilldown (spotlightSystemBaseURL :  String, policySystemServerURLPrefix :  String, encodedParamUrl :  String, encodedReturnUrl :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ViewInSpotlight, {spotlightSystemBaseURL, policySystemServerURLPrefix, encodedParamUrl, encodedReturnUrl}, 0).drilldown()
  }
  
  static function printPage (spotlightSystemBaseURL :  String, policySystemServerURLPrefix :  String, encodedParamUrl :  String, encodedReturnUrl :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ViewInSpotlight, {spotlightSystemBaseURL, policySystemServerURLPrefix, encodedParamUrl, encodedReturnUrl}, 0).printPage()
  }
  
  static function push (spotlightSystemBaseURL :  String, policySystemServerURLPrefix :  String, encodedParamUrl :  String, encodedReturnUrl :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.ViewInSpotlight, {spotlightSystemBaseURL, policySystemServerURLPrefix, encodedParamUrl, encodedReturnUrl}, 0).push()
  }
  
  
}