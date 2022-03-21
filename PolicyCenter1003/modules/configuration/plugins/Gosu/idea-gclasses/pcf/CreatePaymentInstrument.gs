package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/exitpoints/CreatePaymentInstrument.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CreatePaymentInstrument extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (paymentSystemURL :  String, returnURL :  String, jobNumber :  String, accountNumber :  String, accountHolderName :  String, add1 :  String, add2 :  String, city :  String, state :  String, zip :  String) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.CreatePaymentInstrument, {paymentSystemURL, returnURL, jobNumber, accountNumber, accountHolderName, add1, add2, city, state, zip}, 0)
  }
  
  static function drilldown (paymentSystemURL :  String, returnURL :  String, jobNumber :  String, accountNumber :  String, accountHolderName :  String, add1 :  String, add2 :  String, city :  String, state :  String, zip :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CreatePaymentInstrument, {paymentSystemURL, returnURL, jobNumber, accountNumber, accountHolderName, add1, add2, city, state, zip}, 0).drilldown()
  }
  
  static function printPage (paymentSystemURL :  String, returnURL :  String, jobNumber :  String, accountNumber :  String, accountHolderName :  String, add1 :  String, add2 :  String, city :  String, state :  String, zip :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CreatePaymentInstrument, {paymentSystemURL, returnURL, jobNumber, accountNumber, accountHolderName, add1, add2, city, state, zip}, 0).printPage()
  }
  
  static function push (paymentSystemURL :  String, returnURL :  String, jobNumber :  String, accountNumber :  String, accountHolderName :  String, add1 :  String, add2 :  String, city :  String, state :  String, zip :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CreatePaymentInstrument, {paymentSystemURL, returnURL, jobNumber, accountNumber, accountHolderName, add1, add2, city, state, zip}, 0).push()
  }
  
  
}