package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/exitpoints/BCInvoice.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class BCInvoice extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (billingSystemURL :  String, invoiceID :  String) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.BCInvoice, {billingSystemURL, invoiceID}, 0)
  }
  
  static function drilldown (billingSystemURL :  String, invoiceID :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.BCInvoice, {billingSystemURL, invoiceID}, 0).drilldown()
  }
  
  static function printPage (billingSystemURL :  String, invoiceID :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.BCInvoice, {billingSystemURL, invoiceID}, 0).printPage()
  }
  
  static function push (billingSystemURL :  String, invoiceID :  String) : pcf.api.Location {
    return __newDestinationForLocation(pcf.BCInvoice, {billingSystemURL, invoiceID}, 0).push()
  }
  
  
}