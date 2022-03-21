package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/demopaymentsystem/CreateSamplePaymentInstrument.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class CreateSamplePaymentInstrument extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (returnURL :  String, jobNumber :  String, accountNumber :  String, accountHolderName :  String, add1 :  String, add2 :  String, city :  String, state :  String, zip :  String) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.CreateSamplePaymentInstrument, {returnURL, jobNumber, accountNumber, accountHolderName, add1, add2, city, state, zip}, 0)
  }
  
  static function drilldown (returnURL :  String, jobNumber :  String, accountNumber :  String, accountHolderName :  String, add1 :  String, add2 :  String, city :  String, state :  String, zip :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CreateSamplePaymentInstrument, {returnURL, jobNumber, accountNumber, accountHolderName, add1, add2, city, state, zip}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (returnURL :  String, jobNumber :  String, accountNumber :  String, accountHolderName :  String, add1 :  String, add2 :  String, city :  String, state :  String, zip :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CreateSamplePaymentInstrument, {returnURL, jobNumber, accountNumber, accountHolderName, add1, add2, city, state, zip}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (returnURL :  String, jobNumber :  String, accountNumber :  String, accountHolderName :  String, add1 :  String, add2 :  String, city :  String, state :  String, zip :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CreateSamplePaymentInstrument, {returnURL, jobNumber, accountNumber, accountHolderName, add1, add2, city, state, zip}, 0).goInMain()
  }
  
  static function printPage (returnURL :  String, jobNumber :  String, accountNumber :  String, accountHolderName :  String, add1 :  String, add2 :  String, city :  String, state :  String, zip :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CreateSamplePaymentInstrument, {returnURL, jobNumber, accountNumber, accountHolderName, add1, add2, city, state, zip}, 0).printPage()
  }
  
  static function push (returnURL :  String, jobNumber :  String, accountNumber :  String, accountHolderName :  String, add1 :  String, add2 :  String, city :  String, state :  String, zip :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.CreateSamplePaymentInstrument, {returnURL, jobNumber, accountNumber, accountHolderName, add1, add2, city, state, zip}, 0).push()
  }
  
  
}