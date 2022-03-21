package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/common/LocationPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class LocationPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (theAccountLocation :  AccountLocation, thePolicyLocation :  PolicyLocation, policyPeriod :  PolicyPeriod, openForEdit :  boolean, startInEdit :  boolean, supportsNonSpecificLocation :  boolean) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.LocationPopup, {theAccountLocation, thePolicyLocation, policyPeriod, openForEdit, startInEdit, supportsNonSpecificLocation}, 0)
  }
  
  function pickValueAndCommit (value :  PolicyLocation) : void {
    __widgetOf(this, pcf.LocationPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (theAccountLocation :  AccountLocation, thePolicyLocation :  PolicyLocation, policyPeriod :  PolicyPeriod, openForEdit :  boolean, startInEdit :  boolean, supportsNonSpecificLocation :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.LocationPopup, {theAccountLocation, thePolicyLocation, policyPeriod, openForEdit, startInEdit, supportsNonSpecificLocation}, 0).push()
  }
  
  
}