package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/demopaymentsystem/SamplePaymentInstrument.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class SamplePaymentInstrument extends com.guidewire.pl.web.codegen.LocationGroupBase {
  static function createDestination () : pcf.api.Destination {
    return __newDestinationForLocationGroup(pcf.SamplePaymentInstrument, {}, 0)
  }
  
  static function drilldown () : pcf.api.Location {
    return __newDestinationForLocationGroup(pcf.SamplePaymentInstrument, {}, 0).drilldown()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function go () : pcf.api.Location {
    return __newDestinationForLocationGroup(pcf.SamplePaymentInstrument, {}, 0).go()
  }
  
  @com.guidewire.pl.system.expression.WebImmediate
  static function goInMain () : pcf.api.Location {
    return __newDestinationForLocationGroup(pcf.SamplePaymentInstrument, {}, 0).goInMain()
  }
  
  static function printPage () : pcf.api.Location {
    return __newDestinationForLocationGroup(pcf.SamplePaymentInstrument, {}, 0).printPage()
  }
  
  static function push () : pcf.api.Location {
    return __newDestinationForLocationGroup(pcf.SamplePaymentInstrument, {}, 0).push()
  }
  
  
}