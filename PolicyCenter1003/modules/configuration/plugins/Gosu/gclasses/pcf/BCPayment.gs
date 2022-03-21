package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/exitpoints/BCPayment.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class BCPayment extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (billingSystemURL :  String, moneyReceivedID :  String) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.BCPayment, {billingSystemURL, moneyReceivedID}, 0)
  }
  
  static function drilldown (billingSystemURL :  String, moneyReceivedID :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.BCPayment, {billingSystemURL, moneyReceivedID}, 0).drilldown()
  }
  
  static function printPage (billingSystemURL :  String, moneyReceivedID :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.BCPayment, {billingSystemURL, moneyReceivedID}, 0).printPage()
  }
  
  static function push (billingSystemURL :  String, moneyReceivedID :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.BCPayment, {billingSystemURL, moneyReceivedID}, 0).push()
  }
  
  
}