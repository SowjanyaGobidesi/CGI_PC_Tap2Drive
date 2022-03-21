package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/payment/PaymentGatewayForward.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class PaymentGatewayForward extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (result :  String, transactionReference :  String, responseMessage :  String, transactionAmount :  String, originalTransactionID :  String) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.PaymentGatewayForward, {result, transactionReference, responseMessage, transactionAmount, originalTransactionID}, 0)
  }
  
  static function drilldown (result :  String, transactionReference :  String, responseMessage :  String, transactionAmount :  String, originalTransactionID :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PaymentGatewayForward, {result, transactionReference, responseMessage, transactionAmount, originalTransactionID}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (result :  String, transactionReference :  String, responseMessage :  String, transactionAmount :  String, originalTransactionID :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PaymentGatewayForward, {result, transactionReference, responseMessage, transactionAmount, originalTransactionID}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (result :  String, transactionReference :  String, responseMessage :  String, transactionAmount :  String, originalTransactionID :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PaymentGatewayForward, {result, transactionReference, responseMessage, transactionAmount, originalTransactionID}, 0).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInWorkspace (result :  String, transactionReference :  String, responseMessage :  String, transactionAmount :  String, originalTransactionID :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PaymentGatewayForward, {result, transactionReference, responseMessage, transactionAmount, originalTransactionID}, 0).goInWorkspace()
  }
  
  static function printPage (result :  String, transactionReference :  String, responseMessage :  String, transactionAmount :  String, originalTransactionID :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PaymentGatewayForward, {result, transactionReference, responseMessage, transactionAmount, originalTransactionID}, 0).printPage()
  }
  
  static function push (result :  String, transactionReference :  String, responseMessage :  String, transactionAmount :  String, originalTransactionID :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.PaymentGatewayForward, {result, transactionReference, responseMessage, transactionAmount, originalTransactionID}, 0).push()
  }
  
  
}