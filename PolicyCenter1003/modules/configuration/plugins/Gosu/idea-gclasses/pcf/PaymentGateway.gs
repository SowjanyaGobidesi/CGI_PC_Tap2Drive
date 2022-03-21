package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/exitpoints/PaymentGateway.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PaymentGateway extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (paymentGatewayURL :  String, secureToken :  String, secureTokenId :  String) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.PaymentGateway, {paymentGatewayURL, secureToken, secureTokenId}, 0)
  }
  
  static function drilldown (paymentGatewayURL :  String, secureToken :  String, secureTokenId :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PaymentGateway, {paymentGatewayURL, secureToken, secureTokenId}, 0).drilldown()
  }
  
  static function printPage (paymentGatewayURL :  String, secureToken :  String, secureTokenId :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PaymentGateway, {paymentGatewayURL, secureToken, secureTokenId}, 0).printPage()
  }
  
  static function push (paymentGatewayURL :  String, secureToken :  String, secureTokenId :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PaymentGateway, {paymentGatewayURL, secureToken, secureTokenId}, 0).push()
  }
  
  
}