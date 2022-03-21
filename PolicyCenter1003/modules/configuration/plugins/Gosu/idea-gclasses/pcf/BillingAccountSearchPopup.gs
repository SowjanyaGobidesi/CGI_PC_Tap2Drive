package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/billing/BillingAccountSearchPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class BillingAccountSearchPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (accountCurrency :  Currency) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.BillingAccountSearchPopup, {accountCurrency}, 0)
  }
  
  function pickValueAndCommit (value :  String) : void {
    __widgetOf(this, pcf.BillingAccountSearchPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (accountCurrency :  Currency) : pcf.api.Location {
    return __newDestinationForLocation(pcf.BillingAccountSearchPopup, {accountCurrency}, 0).push()
  }
  
  
}