package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/wc/policy/TaxLocationSearchPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class TaxLocationSearchPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (policyPeriod :  PolicyPeriod, state :  Jurisdiction) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.TaxLocationSearchPopup, {policyPeriod, state}, 0)
  }
  
  function pickValueAndCommit (value :  TaxLocation) : void {
    __widgetOf(this, pcf.TaxLocationSearchPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (policyPeriod :  PolicyPeriod, state :  Jurisdiction) : pcf.api.Location {
    return __newDestinationForLocation(pcf.TaxLocationSearchPopup, {policyPeriod, state}, 0).push()
  }
  
  
}