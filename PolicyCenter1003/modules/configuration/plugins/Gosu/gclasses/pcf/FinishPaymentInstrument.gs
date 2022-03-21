package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/exitpoints/FinishPaymentInstrument.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class FinishPaymentInstrument extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (policyCenterURL :  String, jobNumber :  String, accountNumber :  String, paymentMethod :  String, token :  String) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.FinishPaymentInstrument, {policyCenterURL, jobNumber, accountNumber, paymentMethod, token}, 0)
  }
  
  static function drilldown (policyCenterURL :  String, jobNumber :  String, accountNumber :  String, paymentMethod :  String, token :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.FinishPaymentInstrument, {policyCenterURL, jobNumber, accountNumber, paymentMethod, token}, 0).drilldown()
  }
  
  static function printPage (policyCenterURL :  String, jobNumber :  String, accountNumber :  String, paymentMethod :  String, token :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.FinishPaymentInstrument, {policyCenterURL, jobNumber, accountNumber, paymentMethod, token}, 0).printPage()
  }
  
  static function push (policyCenterURL :  String, jobNumber :  String, accountNumber :  String, paymentMethod :  String, token :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.FinishPaymentInstrument, {policyCenterURL, jobNumber, accountNumber, paymentMethod, token}, 0).push()
  }
  
  
}