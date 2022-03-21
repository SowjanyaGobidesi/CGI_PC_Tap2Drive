package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/cp/policy/MoreCPLocationsPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class MoreCPLocationsPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (policyPeriod :  PolicyPeriod, locations :  AccountLocation[], openForEdit :  boolean) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.MoreCPLocationsPopup, {policyPeriod, locations, openForEdit}, 0)
  }
  
  function pickValueAndCommit (value :  CPLocation[]) : void {
    __widgetOf(this, pcf.MoreCPLocationsPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (policyPeriod :  PolicyPeriod, locations :  AccountLocation[], openForEdit :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.MoreCPLocationsPopup, {policyPeriod, locations, openForEdit}, 0).push()
  }
  
  
}