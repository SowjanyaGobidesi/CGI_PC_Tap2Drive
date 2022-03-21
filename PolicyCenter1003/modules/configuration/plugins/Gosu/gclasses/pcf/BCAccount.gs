package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/exitpoints/BCAccount.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class BCAccount extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (billingSystemURL :  String, accountNumber :  String) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.BCAccount, {billingSystemURL, accountNumber}, 0)
  }
  
  static function drilldown (billingSystemURL :  String, accountNumber :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.BCAccount, {billingSystemURL, accountNumber}, 0).drilldown()
  }
  
  static function printPage (billingSystemURL :  String, accountNumber :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.BCAccount, {billingSystemURL, accountNumber}, 0).printPage()
  }
  
  static function push (billingSystemURL :  String, accountNumber :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.BCAccount, {billingSystemURL, accountNumber}, 0).push()
  }
  
  
}