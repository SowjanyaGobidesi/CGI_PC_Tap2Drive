package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/im/policy/MoreIMLocationsPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class MoreIMLocationsPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (policyPeriod :  PolicyPeriod, locations :  AccountLocation[], openForEdit :  boolean) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.MoreIMLocationsPopup, {policyPeriod, locations, openForEdit}, 0)
  }
  
  function pickValueAndCommit (value :  IMLocation[]) : void {
    __widgetOf(this, pcf.MoreIMLocationsPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (policyPeriod :  PolicyPeriod, locations :  AccountLocation[], openForEdit :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.MoreIMLocationsPopup, {policyPeriod, locations, openForEdit}, 0).push()
  }
  
  
}