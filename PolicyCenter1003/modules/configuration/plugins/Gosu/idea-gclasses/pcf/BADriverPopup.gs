package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/line/ba/policy/BADriverPopup.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class BADriverPopup extends com.guidewire.pl.web.codegen.LocationBase {
  static function createDestination (thisDriver :  CommercialDriver, policyPeriod :  PolicyPeriod, openForEdit :  boolean, startInEdit :  boolean) : pcf.api.Destination {
    return __newDestinationForLocation(pcf.BADriverPopup, {thisDriver, policyPeriod, openForEdit, startInEdit}, 0)
  }
  
  function pickValueAndCommit (value :  CommercialDriver) : void {
    __widgetOf(this, pcf.BADriverPopup, LOCATION_WIDGET_CLASS).setPickedValueAndCommitChanges(value)
  }
  
  static function push (thisDriver :  CommercialDriver, policyPeriod :  PolicyPeriod, openForEdit :  boolean, startInEdit :  boolean) : pcf.api.Location {
    return __newDestinationForLocation(pcf.BADriverPopup, {thisDriver, policyPeriod, openForEdit, startInEdit}, 0).push()
  }
  
  
}