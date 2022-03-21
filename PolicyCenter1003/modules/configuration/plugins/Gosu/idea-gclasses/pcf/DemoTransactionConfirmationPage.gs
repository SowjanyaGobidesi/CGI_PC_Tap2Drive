package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/payment/demo/DemoTransactionConfirmationPage.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class DemoTransactionConfirmationPage extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (reference :  String, address :  String, amount :  java.math.BigDecimal) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.DemoTransactionConfirmationPage, {reference, address, amount}, 0)
  }
  
  static function drilldown (reference :  String, address :  String, amount :  java.math.BigDecimal) : pcf.api.Location {
    return __newDestinationForLocation(pcf.DemoTransactionConfirmationPage, {reference, address, amount}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (reference :  String, address :  String, amount :  java.math.BigDecimal) : pcf.api.Location {
    return __newDestinationForLocation(pcf.DemoTransactionConfirmationPage, {reference, address, amount}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (reference :  String, address :  String, amount :  java.math.BigDecimal) : pcf.api.Location {
    return __newDestinationForLocation(pcf.DemoTransactionConfirmationPage, {reference, address, amount}, 0).goInMain()
  }
  
  static function printPage (reference :  String, address :  String, amount :  java.math.BigDecimal) : pcf.api.Location {
    return __newDestinationForLocation(pcf.DemoTransactionConfirmationPage, {reference, address, amount}, 0).printPage()
  }
  
  static function push (reference :  String, address :  String, amount :  java.math.BigDecimal) : pcf.api.Location {
    return __newDestinationForLocation(pcf.DemoTransactionConfirmationPage, {reference, address, amount}, 0).push()
  }
  
  
}