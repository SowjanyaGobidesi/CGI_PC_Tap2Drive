package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/billing/NewPaymentInstrumentForward.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class NewPaymentInstrumentForward extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (jobNumber :  String, accountNumber :  String, paymentMethod :  String, token :  String) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.NewPaymentInstrumentForward, {jobNumber, accountNumber, paymentMethod, token}, 0)
  }
  
  static function drilldown (jobNumber :  String, accountNumber :  String, paymentMethod :  String, token :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewPaymentInstrumentForward, {jobNumber, accountNumber, paymentMethod, token}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go (jobNumber :  String, accountNumber :  String, paymentMethod :  String, token :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewPaymentInstrumentForward, {jobNumber, accountNumber, paymentMethod, token}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain (jobNumber :  String, accountNumber :  String, paymentMethod :  String, token :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewPaymentInstrumentForward, {jobNumber, accountNumber, paymentMethod, token}, 0).goInMain()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInWorkspace (jobNumber :  String, accountNumber :  String, paymentMethod :  String, token :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewPaymentInstrumentForward, {jobNumber, accountNumber, paymentMethod, token}, 0).goInWorkspace()
  }
  
  static function printPage (jobNumber :  String, accountNumber :  String, paymentMethod :  String, token :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewPaymentInstrumentForward, {jobNumber, accountNumber, paymentMethod, token}, 0).printPage()
  }
  
  static function push (jobNumber :  String, accountNumber :  String, paymentMethod :  String, token :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.NewPaymentInstrumentForward, {jobNumber, accountNumber, paymentMethod, token}, 0).push()
  }
  
  
}